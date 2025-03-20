
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import ProfileCard, { Profile } from "@/components/ProfileCard";
import VideoCallCard from "@/components/VideoCallCard";
import AIAssistant from "@/components/AIAssistant";
import { useToast } from "@/components/ui/use-toast";
import { 
  Heart, 
  User, 
  MessageCircle, 
  Video, 
  Calendar, 
  Search, 
  Settings, 
  Bell, 
  LogOut,
  Users,
  Sparkles
} from "lucide-react";

// Mock data for profiles
const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Emma",
    age: 28,
    location: "San Francisco, CA",
    bio: "Photographer and coffee enthusiast. I love exploring new hiking trails and trying local cafes. Looking for someone who shares my sense of adventure.",
    interests: ["Photography", "Hiking", "Coffee", "Travel", "Art"],
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    compatibilityScore: 92,
    distance: 5,
  },
  {
    id: "2",
    name: "Alex",
    age: 32,
    location: "New York, NY",
    bio: "Tech entrepreneur who enjoys live music and trying new restaurants. I'm passionate about fitness and always looking for a good book recommendation.",
    interests: ["Fitness", "Reading", "Music", "Food", "Technology"],
    profileImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    compatibilityScore: 87,
    distance: 7,
  },
  {
    id: "3",
    name: "Sophia",
    age: 26,
    location: "Los Angeles, CA",
    bio: "Yoga instructor and part-time DJ. I love beach sunsets, plant-based cooking, and spontaneous road trips. Looking for someone positive and open-minded.",
    interests: ["Yoga", "Music", "Cooking", "Beach", "Travel"],
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    compatibilityScore: 85,
    distance: 3,
  },
];

// Mock data for matches
const mockMatches = [
  {
    id: "4",
    name: "James",
    age: 30,
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    lastMessage: "Would you like to grab coffee this weekend?",
    lastMessageTime: "2h ago",
  },
  {
    id: "5",
    name: "Olivia",
    age: 27,
    profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    lastMessage: "I loved that hiking trail you recommended!",
    lastMessageTime: "1d ago",
  },
];

// Mock data for upcoming video calls
const mockVideoCalls = [
  {
    id: "6",
    name: "Emma",
    age: 28,
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    scheduledTime: "Today, 7:00 PM",
    duration: "30 min",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("discover");
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const [inVideoCall, setInVideoCall] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const handleLike = (profile: Profile) => {
    toast({
      title: "It's a match!",
      description: `You and ${profile.name} have liked each other. Start a conversation!`,
    });
  };

  const handleDislike = (profile: Profile) => {
    toast({
      description: `You've passed on ${profile.name}.`,
    });
  };

  const handleVideoCall = (profile: Profile) => {
    setActiveProfile(profile);
    setInVideoCall(true);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-20 md:w-64 border-r bg-sidebar flex flex-col">
        <div className="p-4 flex items-center justify-center md:justify-start border-b">
          <Heart className="h-8 w-8 text-cupid-500 md:mr-3" />
          <span className="font-bold text-lg hidden md:block">Cupid AI</span>
        </div>
        
        <ScrollArea className="flex-1 py-4">
          <div className="space-y-1 px-2">
            <Button
              variant={currentTab === "discover" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setCurrentTab("discover")}
            >
              <Search className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline">Discover</span>
            </Button>
            
            <Button
              variant={currentTab === "matches" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setCurrentTab("matches")}
            >
              <Users className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline">Matches</span>
            </Button>
            
            <Button
              variant={currentTab === "messages" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setCurrentTab("messages")}
            >
              <MessageCircle className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline">Messages</span>
            </Button>
            
            <Button
              variant={currentTab === "video" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setCurrentTab("video")}
            >
              <Video className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline">Video Calls</span>
            </Button>
            
            <Button
              variant={currentTab === "calendar" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setCurrentTab("calendar")}
            >
              <Calendar className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline">Calendar</span>
            </Button>
          </div>
          
          <div className="mt-6 px-3">
            <p className="text-xs font-medium text-muted-foreground mb-3 hidden md:block">
              AI TOOLS
            </p>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setShowAIAssistant(true);
                }}
              >
                <Sparkles className="h-5 w-5 md:mr-2 text-cupid-500" />
                <span className="hidden md:inline">AI Assistant</span>
              </Button>
            </div>
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <User className="h-5 w-5" />
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Your Profile</p>
              <p className="text-xs text-muted-foreground">View and edit</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-4">
          <h1 className="text-xl font-semibold">
            {currentTab === "discover" && "Discover"}
            {currentTab === "matches" && "Your Matches"}
            {currentTab === "messages" && "Messages"}
            {currentTab === "video" && "Video Calls"}
            {currentTab === "calendar" && "Calendar"}
          </h1>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {inVideoCall && activeProfile ? (
            <div>
              <VideoCallCard
                profile={activeProfile}
                onEndCall={() => {
                  setInVideoCall(false);
                  setActiveProfile(null);
                  toast({
                    title: "Call Ended",
                    description: `Your call with ${activeProfile.name} has ended.`,
                  });
                }}
              />
            </div>
          ) : (
            <>
              {currentTab === "discover" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {mockProfiles.map((profile) => (
                    <ProfileCard
                      key={profile.id}
                      profile={profile}
                      onLike={handleLike}
                      onDislike={handleDislike}
                      onVideoCall={handleVideoCall}
                    />
                  ))}
                </div>
              )}

              {currentTab === "matches" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockMatches.map((match) => (
                    <div
                      key={match.id}
                      className="glass-card p-4 rounded-lg flex flex-col items-center cursor-pointer animate-scale-in"
                      onClick={() => {
                        toast({
                          title: "Coming Soon",
                          description: "Chat functionality will be available soon!",
                        });
                      }}
                    >
                      <Avatar className="h-24 w-24 mb-4">
                        <img
                          src={match.profileImage}
                          alt={match.name}
                          className="object-cover w-full h-full"
                        />
                      </Avatar>
                      <h3 className="text-lg font-semibold">{match.name}, {match.age}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{match.lastMessageTime}</p>
                      <p className="text-sm mt-3 text-center line-clamp-2">{match.lastMessage}</p>
                      <Button className="w-full mt-4 cupid-gradient">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {currentTab === "video" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Upcoming Video Calls</h2>
                    {mockVideoCalls.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockVideoCalls.map((call) => (
                          <div
                            key={call.id}
                            className="glass-card p-4 rounded-lg animate-scale-in"
                          >
                            <div className="flex items-center mb-4">
                              <Avatar className="h-16 w-16 mr-4">
                                <img
                                  src={call.profileImage}
                                  alt={call.name}
                                  className="object-cover w-full h-full"
                                />
                              </Avatar>
                              <div>
                                <h3 className="text-lg font-semibold">{call.name}, {call.age}</h3>
                                <p className="text-sm text-muted-foreground">{call.scheduledTime}</p>
                                <p className="text-sm text-muted-foreground">{call.duration}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button className="flex-1 cupid-gradient" onClick={() => handleVideoCall(mockProfiles[0])}>
                                <Video className="h-4 w-4 mr-2" />
                                Join Call
                              </Button>
                              <Button variant="outline" className="flex-1">
                                Reschedule
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="glass-card p-8 rounded-lg text-center animate-scale-in">
                        <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">No Upcoming Calls</h3>
                        <p className="text-muted-foreground mb-6">
                          You don't have any scheduled video calls. Connect with your matches and schedule a call!
                        </p>
                        <Button onClick={() => setCurrentTab("discover")}>
                          Find Matches
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">AI Suggested Times</h2>
                    <div className="glass-card p-6 rounded-lg animate-scale-in">
                      <p className="mb-4">
                        Based on your schedule and your matches' activity patterns, here are the best times for video calls:
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-secondary rounded-lg flex justify-between items-center">
                          <div>
                            <p className="font-medium">Weekday Evenings</p>
                            <p className="text-sm text-muted-foreground">7:00 PM - 9:00 PM</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            High Availability
                          </Badge>
                        </div>
                        <div className="p-3 bg-secondary rounded-lg flex justify-between items-center">
                          <div>
                            <p className="font-medium">Weekend Afternoons</p>
                            <p className="text-sm text-muted-foreground">2:00 PM - 5:00 PM</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            High Availability
                          </Badge>
                        </div>
                        <div className="p-3 bg-secondary rounded-lg flex justify-between items-center">
                          <div>
                            <p className="font-medium">Sunday Evenings</p>
                            <p className="text-sm text-muted-foreground">6:00 PM - 8:00 PM</p>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                            Medium Availability
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(currentTab === "messages" || currentTab === "calendar") && (
                <div className="glass-card p-8 rounded-lg text-center animate-scale-in">
                  <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                    {currentTab === "messages" ? (
                      <MessageCircle className="h-10 w-10 text-muted-foreground" />
                    ) : (
                      <Calendar className="h-10 w-10 text-muted-foreground" />
                    )}
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Coming Soon</h2>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    {currentTab === "messages"
                      ? "The messaging feature is currently under development. Check back soon to chat with your matches!"
                      : "Calendar integration is coming soon. You'll be able to schedule and manage your video calls directly from here."}
                  </p>
                  <Button onClick={() => setCurrentTab("discover")}>
                    Back to Discover
                  </Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
      
      <AIAssistant 
        purpose="conversation-tips"
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        initialMessage="Hi there! I'm your AI dating assistant. I can help you with conversation starters, communication tips, or analyzing compatibility with your matches. What would you like help with today?"
      />
    </div>
  );
};

export default Dashboard;
