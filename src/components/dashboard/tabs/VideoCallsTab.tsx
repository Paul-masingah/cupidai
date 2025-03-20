
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video } from "lucide-react";
import { Profile } from "@/components/ProfileCard";

interface VideoCall {
  id: string;
  name: string;
  age: number;
  profileImage: string;
  scheduledTime: string;
  duration: string;
}

interface VideoCallsTabProps {
  videoCalls: VideoCall[];
  onJoinCall: (profile: Profile) => void;
  onFindMatches: () => void;
  firstProfile: Profile; // For demo purposes
}

const VideoCallsTab: React.FC<VideoCallsTabProps> = ({
  videoCalls,
  onJoinCall,
  onFindMatches,
  firstProfile,
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Upcoming Video Calls</h2>
        {videoCalls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoCalls.map((call) => (
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
                  <Button className="flex-1 cupid-gradient" onClick={() => onJoinCall(firstProfile)}>
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
            <Button onClick={onFindMatches}>
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
              <Badge variant="success">
                High Availability
              </Badge>
            </div>
            <div className="p-3 bg-secondary rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">Weekend Afternoons</p>
                <p className="text-sm text-muted-foreground">2:00 PM - 5:00 PM</p>
              </div>
              <Badge variant="success">
                High Availability
              </Badge>
            </div>
            <div className="p-3 bg-secondary rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">Sunday Evenings</p>
                <p className="text-sm text-muted-foreground">6:00 PM - 8:00 PM</p>
              </div>
              <Badge variant="warning">
                Medium Availability
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCallsTab;
