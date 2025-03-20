
import React from "react";
import ProfileCard, { Profile } from "@/components/ProfileCard";

interface DiscoverTabProps {
  profiles: Profile[];
  onLike: (profile: Profile) => void;
  onDislike: (profile: Profile) => void;
  onVideoCall: (profile: Profile) => void;
}

const DiscoverTab: React.FC<DiscoverTabProps> = ({
  profiles,
  onLike,
  onDislike,
  onVideoCall,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onLike={onLike}
          onDislike={onDislike}
          onVideoCall={onVideoCall}
        />
      ))}
    </div>
  );
};

export default DiscoverTab;
