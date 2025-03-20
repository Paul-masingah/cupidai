
import React from "react";
import { Video, Heart, Sparkles, Shield, Clock, CheckCircle } from "lucide-react";

const features = [
  {
    icon: <Video className="h-10 w-10 text-cupid-500" />,
    title: "Video-First Dating",
    description: "Skip the endless messaging and see the real person behind the profile with our video-first approach."
  },
  {
    icon: <Sparkles className="h-10 w-10 text-cupid-500" />,
    title: "AI Matchmaking",
    description: "Our advanced AI analyzes compatibility factors beyond surface-level preferences for better matches."
  },
  {
    icon: <Shield className="h-10 w-10 text-cupid-500" />,
    title: "Safe & Secure",
    description: "Enhanced verification and reporting features to ensure your dating experience is safe and comfortable."
  },
  {
    icon: <Heart className="h-10 w-10 text-cupid-500" />,
    title: "Conversation Coaching",
    description: "Never run out of things to say with our AI conversation assistant that helps keep things flowing."
  },
  {
    icon: <Clock className="h-10 w-10 text-cupid-500" />,
    title: "Scheduled Video Dates",
    description: "Plan ahead with our convenient scheduling system for your video dates."
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-cupid-500" />,
    title: "Verified Profiles",
    description: "All users go through a verification process to ensure you're talking to real people."
  }
];

const FeatureSection = () => {
  return (
    <div className="bg-background py-20" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Cupid AI</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge AI with video technology to create a more
            authentic and efficient dating experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-border">
              <div className="h-16 w-16 rounded-full bg-cupid-50 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
