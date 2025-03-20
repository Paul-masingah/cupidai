
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Profile } from "./ProfileCard";
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageCircle, Heart, User, Lightbulb } from "lucide-react";

interface VideoCallCardProps {
  profile: Profile;
  onEndCall: () => void;
}

const VideoCallCard: React.FC<VideoCallCardProps> = ({ profile, onEndCall }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showConversationTips, setShowConversationTips] = useState(false);
  
  const mockConversationStarters = [
    "I noticed you're into photography. What's your favorite subject to capture?",
    "Your profile mentioned hiking. What's the most memorable trail you've been on?",
    "I'm curious about your travel to Japan. What was your favorite experience there?",
    "We both seem to enjoy cooking. What's your signature dish?",
    "If you could have dinner with any historical figure, who would it be and why?"
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto glass-card overflow-hidden animate-scale-in">
      <div className="relative h-[600px] lg:h-[700px] w-full bg-black">
        {/* Remote Video (Simulated) */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${profile.profileImage})` }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        {/* Remote User Name Badge */}
        <div className="absolute top-4 left-4">
          <Badge className="px-3 py-1 bg-black/40 backdrop-blur-md text-white">
            {profile.name}, {profile.age}
          </Badge>
        </div>
        
        {/* Local Video Preview */}
        <div className="absolute bottom-4 right-4 w-40 h-56 overflow-hidden rounded-lg border border-white/20 shadow-lg">
          <div className="w-full h-full bg-gray-900">
            {!isVideoOff ? (
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80')` }} />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="h-12 w-12 text-white/50" />
              </div>
            )}
          </div>
        </div>
        
        {/* Call Controls */}
        <div className="absolute bottom-4 left-0 right-0 mx-auto w-fit flex items-center gap-3 p-2 rounded-full bg-black/30 backdrop-blur-md">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full ${isMuted ? 'bg-white/10 text-white' : 'bg-white/20 text-white'}`}
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isMuted ? 'Unmute' : 'Mute'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full ${isVideoOff ? 'bg-white/10 text-white' : 'bg-white/20 text-white'}`}
                  onClick={() => setIsVideoOff(!isVideoOff)}
                >
                  {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isVideoOff ? 'Turn Video On' : 'Turn Video Off'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  className="rounded-full"
                  onClick={onEndCall}
                >
                  <PhoneOff className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                End Call
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/20 text-white"
                  onClick={() => setShowConversationTips(true)}
                >
                  <Lightbulb className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Conversation Starters
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Conversation Starters Dialog */}
      <Dialog open={showConversationTips} onOpenChange={setShowConversationTips}>
        <DialogContent className="glass-card animate-scale-in">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              AI Conversation Starters
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-sm text-muted-foreground">
              Here are some personalized conversation starters based on {profile.name}'s profile:
            </p>
            <ul className="space-y-3">
              {mockConversationStarters.map((starter, i) => (
                <li key={i} className="p-3 rounded-lg bg-secondary text-sm hover:bg-secondary/80 transition-colors cursor-pointer">
                  {starter}
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default VideoCallCard;
