
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { SettingsData } from "@/pages/Settings";

interface PrivacySettingsProps {
  settings: SettingsData["privacy"];
  updateSettings: (settings: SettingsData["privacy"]) => void;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({
  settings,
  updateSettings
}) => {
  const handleChange = (field: keyof SettingsData["privacy"], value: any) => {
    updateSettings({
      ...settings,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>Control your privacy and data sharing preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="block mb-2">Profile Visibility</Label>
              <RadioGroup 
                value={settings.profileVisibility} 
                onValueChange={(value: "everyone" | "matches" | "nobody") => 
                  handleChange("profileVisibility", value)
                }
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="everyone" id="visibility-everyone" />
                  <Label htmlFor="visibility-everyone">Everyone</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="matches" id="visibility-matches" />
                  <Label htmlFor="visibility-matches">Matches Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nobody" id="visibility-nobody" />
                  <Label htmlFor="visibility-nobody">Nobody (Appear Offline)</Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="onlineStatus" className="block">Online Status</Label>
                <p className="text-sm text-muted-foreground">Show when you're active on the app</p>
              </div>
              <Switch 
                id="onlineStatus" 
                checked={settings.showOnlineStatus}
                onCheckedChange={(checked) => handleChange("showOnlineStatus", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dataSharing" className="block">Data Sharing</Label>
                <p className="text-sm text-muted-foreground">Allow anonymous data collection to improve matching</p>
              </div>
              <Switch 
                id="dataSharing" 
                checked={settings.dataSharing}
                onCheckedChange={(checked) => handleChange("dataSharing", checked)}
              />
            </div>

            <Separator />

            <div>
              <Label className="block mb-2">Blocked Users</Label>
              {settings.blockList.length > 0 ? (
                <div className="space-y-2">
                  {settings.blockList.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <span>{user}</span>
                      <button 
                        className="text-sm text-destructive hover:underline"
                        onClick={() => {
                          const newBlockList = [...settings.blockList];
                          newBlockList.splice(index, 1);
                          handleChange("blockList", newBlockList);
                        }}
                      >
                        Unblock
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">You haven't blocked any users.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacySettings;
