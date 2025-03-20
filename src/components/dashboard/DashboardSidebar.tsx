
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { 
  Heart, 
  User, 
  MessageCircle, 
  Video, 
  Calendar, 
  Search, 
  Users,
  Sparkles,
  Settings
} from "lucide-react";

interface DashboardSidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  setShowAIAssistant: (show: boolean) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  currentTab,
  setCurrentTab,
  setShowAIAssistant,
}) => {
  const navigate = useNavigate();
  
  return (
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
              onClick={() => setShowAIAssistant(true)}
            >
              <Sparkles className="h-5 w-5 md:mr-2 text-cupid-500" />
              <span className="hidden md:inline">AI Assistant</span>
            </Button>
          </div>
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3 cursor-pointer" onClick={() => navigate("/settings")}>
            <User className="h-5 w-5" />
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium">Your Profile</p>
            <div className="flex items-center">
              <Button 
                variant="link" 
                className="h-auto p-0 text-xs text-muted-foreground hover:text-primary"
                onClick={() => navigate("/settings")}
              >
                Settings
                <Settings className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
