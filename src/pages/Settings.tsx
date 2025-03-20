
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ProfileSettings from "@/components/settings/ProfileSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import PrivacySettings from "@/components/settings/PrivacySettings";
import { saveToStorage, getFromStorage } from "@/utils/storage";

export type SettingsData = {
  profile: {
    bio: string;
    lookingFor: string;
    showAge: boolean;
    showLocation: boolean;
    maxDistance: number;
    ageRange: [number, number];
  };
  notifications: {
    newMatches: boolean;
    messages: boolean;
    appUpdates: boolean;
    emailDigest: boolean;
  };
  privacy: {
    profileVisibility: "everyone" | "matches" | "nobody";
    showOnlineStatus: boolean;
    dataSharing: boolean;
    blockList: string[];
  };
};

const defaultSettings: SettingsData = {
  profile: {
    bio: "",
    lookingFor: "",
    showAge: true,
    showLocation: true,
    maxDistance: 50,
    ageRange: [18, 60],
  },
  notifications: {
    newMatches: true,
    messages: true,
    appUpdates: false,
    emailDigest: false,
  },
  privacy: {
    profileVisibility: "everyone",
    showOnlineStatus: true,
    dataSharing: true,
    blockList: [],
  },
};

const SETTINGS_STORAGE_KEY = "cupid_ai_user_settings";

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);

  // Load settings from storage on component mount
  useEffect(() => {
    const savedSettings = getFromStorage<SettingsData>(SETTINGS_STORAGE_KEY, defaultSettings);
    setSettings(savedSettings);
  }, []);

  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate saving delay for better UX
    setTimeout(() => {
      saveToStorage(SETTINGS_STORAGE_KEY, settings);
      setIsSaving(false);
    }, 600);
  };

  const updateProfileSettings = (profileData: SettingsData["profile"]) => {
    setSettings(prev => ({
      ...prev,
      profile: profileData
    }));
  };

  const updateNotificationSettings = (notificationData: SettingsData["notifications"]) => {
    setSettings(prev => ({
      ...prev,
      notifications: notificationData
    }));
  };

  const updatePrivacySettings = (privacyData: SettingsData["privacy"]) => {
    setSettings(prev => ({
      ...prev,
      privacy: privacyData
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="h-16 border-b flex items-center px-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-4">Settings</h1>
        <div className="ml-auto">
          <Button 
            onClick={handleSaveSettings} 
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </header>

      <div className="container max-w-4xl py-6 px-4 md:px-6">
        <Tabs 
          defaultValue="profile" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4 animate-fade-in">
            <ProfileSettings 
              settings={settings.profile} 
              updateSettings={updateProfileSettings}
            />
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4 animate-fade-in">
            <NotificationSettings 
              settings={settings.notifications} 
              updateSettings={updateNotificationSettings}
            />
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-4 animate-fade-in">
            <PrivacySettings 
              settings={settings.privacy} 
              updateSettings={updatePrivacySettings}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
