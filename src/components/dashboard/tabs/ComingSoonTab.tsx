
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar } from "lucide-react";

interface ComingSoonTabProps {
  tabName: "messages" | "calendar";
  onBackToDiscover: () => void;
}

const ComingSoonTab: React.FC<ComingSoonTabProps> = ({ tabName, onBackToDiscover }) => {
  return (
    <div className="glass-card p-8 rounded-lg text-center animate-scale-in">
      <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
        {tabName === "messages" ? (
          <MessageCircle className="h-10 w-10 text-muted-foreground" />
        ) : (
          <Calendar className="h-10 w-10 text-muted-foreground" />
        )}
      </div>
      <h2 className="text-2xl font-bold mb-3">Coming Soon</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        {tabName === "messages"
          ? "The messaging feature is currently under development. Check back soon to chat with your matches!"
          : "Calendar integration is coming soon. You'll be able to schedule and manage your video calls directly from here."}
      </p>
      <Button onClick={onBackToDiscover}>
        Back to Discover
      </Button>
    </div>
  );
};

export default ComingSoonTab;
