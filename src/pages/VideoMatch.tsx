
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import VideoCallCard from "@/components/VideoCallCard";
import AIAssistant from "@/components/AIAssistant";
import { useToast } from "@/components/ui/use-toast";
import { ChevronLeft, Heart, Video, Lightbulb } from "lucide-react";
import { Profile } from "@/components/ProfileCard";

// Mock profile data for demonstration
const mockProfile: Profile = {
  id: "1",
  name: "Emma",
  age: 28,
  location: "San Francisco, CA",
  bio: "Photographer and coffee enthusiast. I love exploring new hiking trails and trying local cafes. Looking for someone who shares my sense of adventure.",
  interests: ["Photography", "Hiking", "Coffee", "Travel", "Art"],
  profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  compatibilityScore: 92,
  distance: 5,
};

const VideoMatch = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch the profile based on the ID
    // For now, we'll use the mock data
    setProfile(mockProfile);

    // Simulate connecting to call
    const timer = setTimeout(() => {
      setIsConnecting(false);
      setIsCallActive(true);
      toast({
        title: "Call Connected",
        description: `You are now connected with ${mockProfile.name}.`,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [id]);

  const handleEndCall = () => {
    toast({
      title: "Call Ended",
      description: profile ? `Your call with ${profile.name} has ended.` : "Call ended",
    });
    navigate("/dashboard");
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {isConnecting ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in">
            <div className="glass-card p-8 rounded-xl text-center max-w-md">
              <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-cupid-100 flex items-center justify-center">
                <Video className="h-10 w-10 text-cupid-500 animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Connecting to Video Call</h2>
              <p className="text-muted-foreground mb-8">
                We're connecting you with {profile.name} for a video chat. This may take a few moments.
              </p>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-cupid-500 animate-pulse" style={{ width: "80%" }}></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                asChild
              >
                <Link to="/dashboard">
                  <ChevronLeft className="h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setShowTips(true)}
              >
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                Conversation Tips
              </Button>
            </div>
            
            <VideoCallCard profile={profile} onEndCall={handleEndCall} />
          </>
        )}
      </div>
      
      <AIAssistant 
        purpose="conversation-tips"
        isOpen={showTips}
        onClose={() => setShowTips(false)}
        initialMessage={`I've analyzed ${profile.name}'s profile and your compatibility. Here are some personalized conversation starters based on your shared interests in ${profile.interests.slice(0, 2).join(" and ")}. What specific aspect of the conversation would you like help with?`}
      />
    </div>
  );
};

export default VideoMatch;
