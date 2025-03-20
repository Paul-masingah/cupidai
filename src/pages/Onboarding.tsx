
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import AIAssistant from "@/components/AIAssistant";
import { Heart, ArrowRight, ArrowLeft, Upload, User, HelpCircle, Sparkles, Save, X, MessageSquare } from "lucide-react";
import { saveToStorage, getFromStorage } from "@/utils/storage";
import { getSuggestedInterests } from "@/utils/interestSuggestions";
import { getTransitionClass, applySequencedAnimation } from "@/utils/animationUtils";

// Storage key for form data
const STORAGE_KEY = "cupid_onboarding_data";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
}

// Extended with more fields
interface FormState {
  name: string;
  age: string;
  location: string;
  bio: string;
  gender: string;
  photos: string[];
  interests: string[];
  preferredAgeMin: string;
  preferredAgeMax: string;
  preferredDistance: string;
  lookingFor: string;
  // New fields
  occupation: string;
  education: string;
  relationshipStatus: string;
  languages: string[];
  heightUnit: "cm" | "ft" | "";
  height: string;
  profileVisibility: "public" | "private" | "friends" | "";
}

const steps: OnboardingStep[] = [
  {
    id: "basics",
    title: "Basic Information",
    description: "Let's start with your basic details",
  },
  {
    id: "photos",
    title: "Add Photos",
    description: "Upload your best photos to showcase your personality",
  },
  {
    id: "interests",
    title: "Interests & Hobbies",
    description: "Tell us what you love to do",
  },
  {
    id: "preferences",
    title: "Dating Preferences",
    description: "Help us understand what you're looking for",
  },
  {
    id: "additional",
    title: "Additional Information",
    description: "Share more about yourself to find better matches",
  },
];

const defaultFormState: FormState = {
  name: "",
  age: "",
  location: "",
  bio: "",
  gender: "",
  photos: [],
  interests: [] as string[],
  preferredAgeMin: "18",
  preferredAgeMax: "99",
  preferredDistance: "50",
  lookingFor: "",
  // New fields with default values
  occupation: "",
  education: "",
  relationshipStatus: "",
  languages: [],
  heightUnit: "",
  height: "",
  profileVisibility: "",
};

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isExitingStep, setIsExitingStep] = useState(false);
  const [suggestedInterests, setSuggestedInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");
  const stepContentRef = useRef<HTMLDivElement>(null);
  
  // Form state - initialize from local storage if available
  const [formState, setFormState] = useState<FormState>(() => 
    getFromStorage<FormState>(STORAGE_KEY, defaultFormState)
  );
  
  // Auto-save form data when it changes
  useEffect(() => {
    saveToStorage(STORAGE_KEY, formState);
  }, [formState]);
  
  // Update suggested interests when user input or interests change
  useEffect(() => {
    const suggestions = getSuggestedInterests(interestInput, formState.interests, 8);
    setSuggestedInterests(suggestions);
  }, [interestInput, formState.interests]);
  
  // Apply animation to step content when it changes
  useEffect(() => {
    if (stepContentRef.current) {
      applySequencedAnimation(stepContentRef.current, 100, 'opacity-0');
    }
  }, [currentStep]);
  
  const updateForm = (field: keyof FormState, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
    
    // Show toast confirmation for important fields
    const importantFields = ['name', 'gender', 'lookingFor', 'bio'];
    if (importantFields.includes(field) && value) {
      toast({
        title: "Information Updated",
        description: `Your ${field} has been saved.`,
        duration: 2000,
      });
    }
  };
  
  const handleNext = () => {
    // Validation for each step
    let canProceed = true;
    let errorMessage = "";
    
    if (currentStep === 0) {
      // Basic info validation
      if (!formState.name.trim()) {
        canProceed = false;
        errorMessage = "Please enter your name";
      } else if (!formState.age || parseInt(formState.age) < 18) {
        canProceed = false;
        errorMessage = "You must be at least 18 years old";
      } else if (!formState.gender) {
        canProceed = false;
        errorMessage = "Please select your gender";
      }
    } else if (currentStep === 1) {
      // Photos validation (optional - just a warning)
      if (formState.photos.length === 0) {
        toast({
          title: "No Photos Added",
          description: "Adding photos increases your chances of matching. You can add them later.",
          variant: "default",
        });
      }
    } else if (currentStep === 3) {
      // Preferences validation
      if (!formState.lookingFor) {
        canProceed = false;
        errorMessage = "Please select what you're looking for";
      }
    }
    
    if (!canProceed) {
      toast({
        title: "Required Information",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setIsExitingStep(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsExitingStep(false);
      }, 200);
    } else {
      // Submit form
      console.log("Form submitted:", formState);
      toast({
        title: "Profile Created!",
        description: "Your profile has been created successfully. Let's find your match!",
      });
      navigate("/dashboard");
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsExitingStep(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        setIsExitingStep(false);
      }, 200);
    }
  };
  
  const handleAddInterest = (interest: string) => {
    if (interest && !formState.interests.includes(interest)) {
      updateForm("interests", [...formState.interests, interest]);
      setInterestInput("");
    }
  };
  
  const handleRemoveInterest = (interest: string) => {
    updateForm(
      "interests",
      formState.interests.filter((i) => i !== interest)
    );
  };
  
  const handleAddLanguage = (language: string) => {
    if (language && !formState.languages.includes(language)) {
      updateForm("languages", [...formState.languages, language]);
    }
  };
  
  const handleRemoveLanguage = (language: string) => {
    updateForm(
      "languages",
      formState.languages.filter((l) => l !== language)
    );
  };
  
  // Mock photo upload function
  const handlePhotoUpload = () => {
    const mockPhoto = `https://source.unsplash.com/random/300x300?portrait&${Date.now()}`;
    updateForm("photos", [...formState.photos, mockPhoto]);
    toast({
      title: "Photo Uploaded",
      description: "Your photo has been uploaded successfully.",
    });
  };
  
  const handleDeletePhoto = (index: number) => {
    const updatedPhotos = [...formState.photos];
    updatedPhotos.splice(index, 1);
    updateForm("photos", updatedPhotos);
    toast({
      title: "Photo Removed",
      description: "Your photo has been removed.",
    });
  };
  
  const languageSuggestions = [
    "English", "Spanish", "French", "German", "Italian", 
    "Portuguese", "Russian", "Japanese", "Chinese", "Korean", 
    "Arabic", "Hindi", "Dutch", "Swedish", "Norwegian"
  ];
  
  const stepContentClass = isExitingStep 
    ? "animate-fade-out transition-all duration-200" 
    : "animate-fade-in transition-all duration-300";
  
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 flex flex-col">
      <div className="max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Heart className="h-6 w-6 text-cupid-500 mr-2" />
            <span className="text-xl font-bold">Cupid AI</span>
          </div>
          
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => {
                      toast({
                        title: "Progress Saved",
                        description: "Your profile progress has been saved automatically.",
                      });
                    }}
                    className="rounded-full"
                  >
                    <Save className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your progress is automatically saved</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setShowAIAssistant(true)}
                    className="rounded-full"
                  >
                    <HelpCircle className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Get AI assistance with your profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <Card className="p-6 glass-card animate-scale-in shadow-lg">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Your Profile</h1>
            <p className="text-muted-foreground">
              Complete your profile to find meaningful connections
            </p>
            
            <div className="mt-6">
              <div className="flex justify-between mb-2 text-sm">
                <span>Progress</span>
                <span>{currentStep + 1} of {steps.length}</span>
              </div>
              <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
            </div>
            
            <div className="mt-6 flex justify-between">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`text-center flex-1 ${
                    index === currentStep
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
                      index === currentStep
                        ? "bg-primary text-primary-foreground animate-pulse-gentle"
                        : index < currentStep
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs hidden sm:block">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="py-4" ref={stepContentRef}>
            <h2 className="text-xl font-semibold mb-2">{steps[currentStep].title}</h2>
            <p className="text-muted-foreground mb-6">{steps[currentStep].description}</p>
            
            <div className={stepContentClass}>
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formState.name}
                        onChange={(e) => updateForm("name", e.target.value)}
                        className="transition-all duration-300 hover:border-primary focus:border-primary"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="age">Age <span className="text-red-500">*</span></Label>
                        <Input
                          id="age"
                          type="number"
                          min="18"
                          max="120"
                          placeholder="Your age"
                          value={formState.age}
                          onChange={(e) => updateForm("age", e.target.value)}
                          className="transition-all duration-300 hover:border-primary focus:border-primary"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="gender">Gender <span className="text-red-500">*</span></Label>
                        <Select 
                          value={formState.gender} 
                          onValueChange={(value) => updateForm("gender", value)}
                        >
                          <SelectTrigger className="transition-all duration-300 hover:border-primary focus:border-primary">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="non-binary">Non-binary</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="City, Country"
                        value={formState.location}
                        onChange={(e) => updateForm("location", e.target.value)}
                        className="transition-all duration-300 hover:border-primary focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Write a short bio about yourself..."
                        value={formState.bio}
                        onChange={(e) => updateForm("bio", e.target.value)}
                        className="min-h-[100px] transition-all duration-300 hover:border-primary focus:border-primary"
                      />
                      <div className="mt-2 flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs hover-scale"
                          onClick={() => {
                            setShowAIAssistant(true);
                            toast({
                              title: "AI Assistant",
                              description: "Let our AI help you craft the perfect bio!",
                            });
                          }}
                        >
                          <Sparkles className="h-3 w-3 mr-1" />
                          Generate with AI
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    {formState.photos.map((photo, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                        <img
                          src={photo}
                          alt={`Profile photo ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          onClick={() => handleDeletePhoto(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    {formState.photos.length < 6 && (
                      <Button
                        variant="outline"
                        onClick={handlePhotoUpload}
                        className="aspect-square flex flex-col items-center justify-center rounded-lg border-dashed hover-scale"
                      >
                        <Upload className="h-6 w-6 mb-2" />
                        <span className="text-xs">Upload</span>
                      </Button>
                    )}
                  </div>
                  
                  <div className="bg-secondary p-4 rounded-lg text-sm">
                    <p className="flex items-start">
                      <HelpCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-muted-foreground" />
                      <span>
                        Adding at least 3 photos increases your chances of getting matches. Choose a
                        variety of photos that showcase different aspects of your life.
                      </span>
                    </p>
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="interests">Your Interests</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formState.interests.map((interest) => (
                        <Badge 
                          key={interest} 
                          variant="secondary"
                          className="px-3 py-1.5 text-sm cursor-pointer hover-scale group"
                          onClick={() => handleRemoveInterest(interest)}
                        >
                          {interest} <X className="h-3 w-3 ml-1 inline-block opacity-50 group-hover:opacity-100" />
                        </Badge>
                      ))}
                      
                      {formState.interests.length === 0 && (
                        <span className="text-sm text-muted-foreground">
                          No interests added yet. Select from suggestions below or add your own.
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="search-interests">Search or Add Interests</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="search-interests"
                        placeholder="Search interests..."
                        value={interestInput}
                        onChange={(e) => setInterestInput(e.target.value)}
                        className="transition-all duration-300 hover:border-primary focus:border-primary"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && interestInput) {
                            handleAddInterest(interestInput);
                          }
                        }}
                      />
                      <Button
                        onClick={() => {
                          handleAddInterest(interestInput);
                        }}
                        disabled={!interestInput}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Suggested Interests</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {suggestedInterests.map((interest) => (
                        <Badge 
                          key={interest} 
                          variant="outline"
                          className="px-3 py-1.5 text-sm cursor-pointer hover:bg-secondary transition-colors hover-scale"
                          onClick={() => handleAddInterest(interest)}
                        >
                          + {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-secondary p-4 rounded-lg text-sm">
                    <p className="flex items-start">
                      <MessageSquare className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-muted-foreground" />
                      <span>
                        Adding interests helps us find people with similar hobbies and passions. 
                        We recommend adding at least 5 interests to improve your matches.
                      </span>
                    </p>
                  </div>
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="lookingFor">I'm looking for <span className="text-red-500">*</span></Label>
                    <Select 
                      value={formState.lookingFor} 
                      onValueChange={(value) => updateForm("lookingFor", value)}
                    >
                      <SelectTrigger className="transition-all duration-300 hover:border-primary focus:border-primary">
                        <SelectValue placeholder="Select what you're looking for" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relationship">Serious Relationship</SelectItem>
                        <SelectItem value="casual">Casual Dating</SelectItem>
                        <SelectItem value="friends">Just Friends</SelectItem>
                        <SelectItem value="unsure">Not Sure Yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Preferred Age Range</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <Label htmlFor="age-min" className="text-xs text-muted-foreground">
                          Minimum
                        </Label>
                        <Input
                          id="age-min"
                          type="number"
                          min="18"
                          max="120"
                          placeholder="Min age"
                          value={formState.preferredAgeMin}
                          onChange={(e) => updateForm("preferredAgeMin", e.target.value)}
                          className="transition-all duration-300 hover:border-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <Label htmlFor="age-max" className="text-xs text-muted-foreground">
                          Maximum
                        </Label>
                        <Input
                          id="age-max"
                          type="number"
                          min="18"
                          max="120"
                          placeholder="Max age"
                          value={formState.preferredAgeMax}
                          onChange={(e) => updateForm("preferredAgeMax", e.target.value)}
                          className="transition-all duration-300 hover:border-primary focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="distance">Maximum Distance</Label>
                    <Select 
                      value={formState.preferredDistance} 
                      onValueChange={(value) => updateForm("preferredDistance", value)}
                    >
                      <SelectTrigger className="transition-all duration-300 hover:border-primary focus:border-primary">
                        <SelectValue placeholder="Select maximum distance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 miles</SelectItem>
                        <SelectItem value="10">10 miles</SelectItem>
                        <SelectItem value="25">25 miles</SelectItem>
                        <SelectItem value="50">50 miles</SelectItem>
                        <SelectItem value="100">100 miles</SelectItem>
                        <SelectItem value="anywhere">Anywhere</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="profileVisibility">Profile Visibility</Label>
                    <Select 
                      value={formState.profileVisibility} 
                      onValueChange={(value) => updateForm("profileVisibility", value as "public" | "private" | "friends" | "")}
                    >
                      <SelectTrigger className="transition-all duration-300 hover:border-primary focus:border-primary">
                        <SelectValue placeholder="Who can see your profile?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Everyone</SelectItem>
                        <SelectItem value="friends">Only people you've matched with</SelectItem>
                        <SelectItem value="private">Only people you choose</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      placeholder="What do you do for work?"
                      value={formState.occupation}
                      onChange={(e) => updateForm("occupation", e.target.value)}
                      className="transition-all duration-300 hover:border-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="education">Education</Label>
                    <Select 
                      value={formState.education} 
                      onValueChange={(value) => updateForm("education", value)}
                    >
                      <SelectTrigger className="transition-all duration-300 hover:border-primary focus:border-primary">
                        <SelectValue placeholder="Your education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="some-college">Some College</SelectItem>
                        <SelectItem value="associate">Associate Degree</SelectItem>
                        <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                        <SelectItem value="master">Master's Degree</SelectItem>
                        <SelectItem value="doctorate">Doctorate</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="height">Height</Label>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="col-span-3">
                        <Input
                          id="height"
                          placeholder="Your height"
                          value={formState.height}
                          onChange={(e) => updateForm("height", e.target.value)}
                          className="transition-all duration-300 hover:border-primary focus:border-primary"
                        />
                      </div>
                      <div className="col-span-2">
                        <Select 
                          value={formState.heightUnit} 
                          onValueChange={(value) => updateForm("heightUnit", value as "cm" | "ft" | "")}
                        >
                          <SelectTrigger className="transition-all duration-300 hover:border-primary focus:border-primary">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cm">cm</SelectItem>
                            <SelectItem value="ft">ft</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="languages">Languages</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formState.languages.map((language) => (
                        <Badge 
                          key={language} 
                          variant="secondary"
                          className="px-3 py-1.5 text-sm cursor-pointer hover-scale group"
                          onClick={() => handleRemoveLanguage(language)}
                        >
                          {language} <X className="h-3 w-3 ml-1 inline-block opacity-50 group-hover:opacity-100" />
                        </Badge>
                      ))}
                      
                      {formState.languages.length === 0 && (
                        <span className="text-sm text-muted-foreground">
                          No languages added yet. Select from suggestions below.
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <Label>Add Languages</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {languageSuggestions
                          .filter((language) => !formState.languages.includes(language))
                          .map((language) => (
                            <Badge 
                              key={language} 
                              variant="outline"
                              className="px-3 py-1.5 text-sm cursor-pointer hover:bg-secondary transition-colors hover-scale"
                              onClick={() => handleAddLanguage(language)}
                            >
                              + {language}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="gap-2 hover-scale"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            <Button onClick={handleNext} className="gap-2 cupid-gradient hover-scale">
              {currentStep === steps.length - 1 ? (
                "Complete Profile"
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
      
      <AIAssistant 
        purpose="onboarding"
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        initialMessage="Hi there! I'm Cupid, your AI profile assistant. I'm here to help you create a standout dating profile. What would you like help with? I can help with writing your bio, selecting the right photos, or suggesting interests that align with your personality."
      />
    </div>
  );
};

export default Onboarding;
