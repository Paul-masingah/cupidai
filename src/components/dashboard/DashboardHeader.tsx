
import React from "react";
import { Button } from "@/components/ui/button";
import { Bell, Settings } from "lucide-react";

interface DashboardHeaderProps {
  currentTab: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ currentTab }) => {
  return (
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
  );
};

export default DashboardHeader;
