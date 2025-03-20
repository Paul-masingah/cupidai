
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface Match {
  id: string;
  name: string;
  age: number;
  profileImage: string;
  lastMessage: string;
  lastMessageTime: string;
}

interface MatchesTabProps {
  matches: Match[];
  onMessageClick: () => void;
}

const MatchesTab: React.FC<MatchesTabProps> = ({ matches, onMessageClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {matches.map((match) => (
        <div
          key={match.id}
          className="glass-card p-4 rounded-lg flex flex-col items-center cursor-pointer animate-scale-in"
          onClick={onMessageClick}
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
  );
};

export default MatchesTab;
