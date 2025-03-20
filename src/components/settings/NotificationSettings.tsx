
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { SettingsData } from "@/pages/Settings";

interface NotificationSettingsProps {
  settings: SettingsData["notifications"];
  updateSettings: (settings: SettingsData["notifications"]) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  settings,
  updateSettings
}) => {
  const handleChange = (field: keyof SettingsData["notifications"], value: boolean) => {
    updateSettings({
      ...settings,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Control what notifications you receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newMatches" className="block">New Matches</Label>
                <p className="text-sm text-muted-foreground">Get notified when you match with someone</p>
              </div>
              <Switch 
                id="newMatches" 
                checked={settings.newMatches}
                onCheckedChange={(checked) => handleChange("newMatches", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="messages" className="block">Messages</Label>
                <p className="text-sm text-muted-foreground">Receive notifications for new messages</p>
              </div>
              <Switch 
                id="messages" 
                checked={settings.messages}
                onCheckedChange={(checked) => handleChange("messages", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="appUpdates" className="block">App Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified about new features and updates</p>
              </div>
              <Switch 
                id="appUpdates" 
                checked={settings.appUpdates}
                onCheckedChange={(checked) => handleChange("appUpdates", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailDigest" className="block">Email Digest</Label>
                <p className="text-sm text-muted-foreground">Receive weekly email summaries</p>
              </div>
              <Switch 
                id="emailDigest" 
                checked={settings.emailDigest}
                onCheckedChange={(checked) => handleChange("emailDigest", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
