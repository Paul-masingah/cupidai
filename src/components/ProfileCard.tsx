
import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, X, MessageCircle, Video } from "lucide-react";

export interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  interests: string[];
  profileImage: string;
  compatibilityScore: number;
  distance: number; // in miles
}

interface ProfileCardProps {
  profile: Profile;
  onLike: (profile: Profile) => void;
  onDislike: (profile: Profile) => void;
  onVideoCall: (profile: Profile) => void;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onLike,
  onDislike,
  onVideoCall,
  className = "",
}) => {
  return (
    <Card className={`overflow-hidden glass-card animate-slide-up ${className}`}>
      <div className="relative h-96 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${profile.profileImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="outline" className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full">
            <span className="mr-1">❤️</span>
            {profile.compatibilityScore}% Match
          </Badge>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
          <h3 className="text-2xl font-bold">{profile.name}, {profile.age}</h3>
          <p className="text-sm opacity-90">{profile.location} · {profile.distance} miles away</p>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.interests.slice(0, 4).map((interest, i) => (
              <Badge key={i} className="bg-white/20 backdrop-blur-sm text-white">
                {interest}
              </Badge>
            ))}
            {profile.interests.length > 4 && (
              <Badge className="bg-white/20 backdrop-blur-sm text-white">
                +{profile.interests.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-muted-foreground mb-4">{profile.bio}</p>
        
        <div className="flex justify-between gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 border-2"
            onClick={() => onDislike(profile)}
          >
            <X className="h-5 w-5 text-destructive" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 border-2"
            onClick={() => onVideoCall(profile)}
          >
            <Video className="h-5 w-5 text-blue-500" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 border-2"
            onClick={() => onLike(profile)}
          >
            <Heart className="h-5 w-5 text-cupid-500" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
