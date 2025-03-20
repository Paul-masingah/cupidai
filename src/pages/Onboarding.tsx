
import React, { useState } from "react";
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
import AIAssistant from "@/components/AIAssistant";
import { Heart, ArrowRight, ArrowLeft, Upload, User, HelpCircle, Sparkles } from "lucide-react";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
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
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  
  // Form state
  const [formState, setFormState] = useState({
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
  });
  
  const updateForm = (field: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
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
      setCurrentStep((prev) => prev - 1);
    }
  };
  
  const handleAddInterest = (interest: string) => {
    if (interest && !formState.interests.includes(interest)) {
      updateForm("interests", [...formState.interests, interest]);
    }
  };
  
  const handleRemoveInterest = (interest: string) => {
    updateForm(
      "interests",
      formState.interests.filter((i) => i !== interest)
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
  
  const interestSuggestions = [
    "Hiking", "Photography", "Cooking", "Travel", "Reading",
    "Music", "Movies", "Art", "Sports", "Fitness",
    "Dancing", "Writing", "Gaming", "Yoga", "Meditation"
  ];
  
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 flex flex-col">
      <div className="max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Heart className="h-6 w-6 text-cupid-500 mr-2" />
            <span className="text-xl font-bold">Cupid AI</span>
          </div>
          
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
        
        <Card className="p-6 glass-card animate-scale-in">
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
                        ? "bg-primary text-primary-foreground"
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
          
          <div className="py-4">
            <h2 className="text-xl font-semibold mb-2">{steps[currentStep].title}</h2>
            <p className="text-muted-foreground mb-6">{steps[currentStep].description}</p>
            
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={(e) => updateForm("name", e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        min="18"
                        max="120"
                        placeholder="Your age"
                        value={formState.age}
                        onChange={(e) => updateForm("age", e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select 
                        value={formState.gender} 
                        onValueChange={(value) => updateForm("gender", value)}
                      >
                        <SelectTrigger>
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
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Write a short bio about yourself..."
                      value={formState.bio}
                      onChange={(e) => updateForm("bio", e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="mt-2 flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
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
                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={photo}
                        alt={`Profile photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  
                  {formState.photos.length < 6 && (
                    <Button
                      variant="outline"
                      onClick={handlePhotoUpload}
                      className="aspect-square flex flex-col items-center justify-center rounded-lg border-dashed"
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
                        className="px-3 py-1.5 text-sm cursor-pointer"
                        onClick={() => handleRemoveInterest(interest)}
                      >
                        {interest} ×
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
                  <Label>Suggested Interests</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {interestSuggestions
                      .filter((interest) => !formState.interests.includes(interest))
                      .map((interest) => (
                        <Badge 
                          key={interest} 
                          variant="outline"
                          className="px-3 py-1.5 text-sm cursor-pointer hover:bg-secondary transition-colors"
                          onClick={() => handleAddInterest(interest)}
                        >
                          + {interest}
                        </Badge>
                      ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="custom-interest">Add Custom Interest</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="custom-interest"
                      placeholder="Enter your interest..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddInterest(e.currentTarget.value);
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                    <Button
                      onClick={() => {
                        const input = document.getElementById("custom-interest") as HTMLInputElement;
                        handleAddInterest(input.value);
                        input.value = "";
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="lookingFor">I'm looking for</Label>
                  <Select 
                    value={formState.lookingFor} 
                    onValueChange={(value) => updateForm("lookingFor", value)}
                  >
                    <SelectTrigger>
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
                    <SelectTrigger>
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
              </div>
            )}
          </div>
          
          <Separator className="my-6" />
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            <Button onClick={handleNext} className="gap-2 cupid-gradient">
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
