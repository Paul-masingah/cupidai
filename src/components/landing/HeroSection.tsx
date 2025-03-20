
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Video, Shield, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cupid-50/40 via-background to-background -z-10"></div>
      <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-cupid-100/30 to-transparent rounded-full blur-3xl -z-10 transform translate-x-1/4 -translate-y-1/4"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center justify-center p-2 bg-cupid-50/30 rounded-full mb-6 animate-pulse-gentle">
          <Heart className="h-6 w-6 text-cupid-500" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Find Your Perfect Match with{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cupid-400 to-cupid-600">
            AI-Powered
          </span>{" "}
          Video Dating
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mb-10">
          Cupid AI uses advanced machine learning to connect you with compatible
          matches. Skip the awkward texting and go straight to meaningful video 
          conversations.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button 
            asChild 
            size="lg" 
            className="cupid-gradient text-lg py-6 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Link to="/onboarding">Get Started</Link>
          </Button>
          
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="text-lg py-6 px-8 rounded-full"
          >
            <Link to="/#how-it-works">Learn More</Link>
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl w-full">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold mb-2">94%</p>
            <p className="text-sm text-muted-foreground">Match Success Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold mb-2">10K+</p>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold mb-2">15min</p>
            <p className="text-sm text-muted-foreground">Avg. First Call</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold mb-2">4.8/5</p>
            <p className="text-sm text-muted-foreground">User Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
