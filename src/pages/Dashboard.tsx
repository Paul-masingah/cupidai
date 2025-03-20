
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// Components
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DiscoverTab from "@/components/dashboard/tabs/DiscoverTab";
import MatchesTab from "@/components/dashboard/tabs/MatchesTab";
import VideoCallsTab from "@/components/dashboard/tabs/VideoCallsTab";
import ComingSoonTab from "@/components/dashboard/tabs/ComingSoonTab";
import VideoCallCard from "@/components/VideoCallCard";
import AIAssistant from "@/components/AIAssistant";
import { Profile } from "@/components/ProfileCard";

// Mock data
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
  
  const handleMessageClick = () => {
    toast({
      title: "Coming Soon",
      description: "Chat functionality will be available soon!",
    });
  };

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setShowAIAssistant={setShowAIAssistant}
      />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader currentTab={currentTab} />
        
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
                <DiscoverTab
                  profiles={mockProfiles}
                  onLike={handleLike}
                  onDislike={handleDislike}
                  onVideoCall={handleVideoCall}
                />
              )}

              {currentTab === "matches" && (
                <MatchesTab
                  matches={mockMatches}
                  onMessageClick={handleMessageClick}
                />
              )}

              {currentTab === "video" && (
                <VideoCallsTab
                  videoCalls={mockVideoCalls}
                  onJoinCall={handleVideoCall}
                  onFindMatches={() => setCurrentTab("discover")}
                  firstProfile={mockProfiles[0]}
                />
              )}

              {(currentTab === "messages" || currentTab === "calendar") && (
                <ComingSoonTab
                  tabName={currentTab as "messages" | "calendar"}
                  onBackToDiscover={() => setCurrentTab("discover")}
                />
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
