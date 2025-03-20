
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { SettingsData } from "@/pages/Settings";

interface ProfileSettingsProps {
  settings: SettingsData["profile"];
  updateSettings: (settings: SettingsData["profile"]) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  settings,
  updateSettings
}) => {
  const handleChange = (field: keyof SettingsData["profile"], value: any) => {
    updateSettings({
      ...settings,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal profile information and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bio">About Me</Label>
            <Textarea
              id="bio"
              placeholder="Tell others about yourself..."
              value={settings.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lookingFor">I'm Looking For</Label>
            <Select 
              value={settings.lookingFor} 
              onValueChange={(value) => handleChange("lookingFor", value)}
            >
              <SelectTrigger id="lookingFor">
                <SelectValue placeholder="Select what you're looking for" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relationship">Long-term Relationship</SelectItem>
                <SelectItem value="casual">Casual Dating</SelectItem>
                <SelectItem value="friendship">Friendship</SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showAge" className="block">Show Age</Label>
                <p className="text-sm text-muted-foreground">Display your age on your profile</p>
              </div>
              <Switch 
                id="showAge" 
                checked={settings.showAge}
                onCheckedChange={(checked) => handleChange("showAge", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showLocation" className="block">Show Location</Label>
                <p className="text-sm text-muted-foreground">Share your location with other users</p>
              </div>
              <Switch 
                id="showLocation" 
                checked={settings.showLocation}
                onCheckedChange={(checked) => handleChange("showLocation", checked)}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <Label htmlFor="distance" className="block mb-2">Maximum Distance (miles)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="distance"
                  min={1}
                  max={100}
                  step={1}
                  value={[settings.maxDistance]}
                  onValueChange={([value]) => handleChange("maxDistance", value)}
                  className="flex-1"
                />
                <span className="w-12 text-center">{settings.maxDistance}</span>
              </div>
            </div>

            <div>
              <Label className="block mb-2">Age Range</Label>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  min={18}
                  max={settings.ageRange[1]}
                  value={settings.ageRange[0]}
                  onChange={(e) => {
                    const minAge = parseInt(e.target.value) || 18;
                    handleChange("ageRange", [minAge, settings.ageRange[1]]);
                  }}
                  className="w-20"
                />
                <span>to</span>
                <Input
                  type="number"
                  min={settings.ageRange[0]}
                  max={100}
                  value={settings.ageRange[1]}
                  onChange={(e) => {
                    const maxAge = parseInt(e.target.value) || 60;
                    handleChange("ageRange", [settings.ageRange[0], maxAge]);
                  }}
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
