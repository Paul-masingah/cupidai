
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Video, Sparkles, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-cupid-50/50 to-background" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto animate-fade-in">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/20">
              <Heart className="h-10 w-10 text-cupid-500" />
            </div>
          </div>
          
          <h1 className="font-bold text-6xl md:text-7xl mb-6 tracking-tight">
            Find your perfect match with <span className="text-cupid-600">Cupid AI</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our AI understands what makes you unique, helping you find meaningful connections based on shared interests, values, and compatibility.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="cupid-gradient text-lg group">
              <Link to="/onboarding">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link to="/dashboard">
                Explore
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-10 w-full text-center animate-bounce">
          <ArrowRight className="h-6 w-6 mx-auto transform rotate-90" />
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Love enhanced by <span className="text-cupid-600">intelligence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI technology makes finding your perfect match more intuitive, efficient, and successful than ever before.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-secondary rounded-2xl animate-slide-up">
              <div className="h-14 w-14 rounded-full bg-cupid-100 flex items-center justify-center mb-6">
                <Sparkles className="h-7 w-7 text-cupid-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">AI-Powered Matching</h3>
              <p className="text-muted-foreground">
                Our advanced algorithm analyzes interests, values, and communication styles to find truly compatible connections.
              </p>
            </div>
            
            <div className="p-6 bg-secondary rounded-2xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="h-14 w-14 rounded-full bg-cupid-100 flex items-center justify-center mb-6">
                <Video className="h-7 w-7 text-cupid-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Video-First Dating</h3>
              <p className="text-muted-foreground">
                Skip the endless texting phase. Our platform focuses on authentic video connections with AI-assisted conversation starters.
              </p>
            </div>
            
            <div className="p-6 bg-secondary rounded-2xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="h-14 w-14 rounded-full bg-cupid-100 flex items-center justify-center mb-6">
                <Heart className="h-7 w-7 text-cupid-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Personalized Guidance</h3>
              <p className="text-muted-foreground">
                Receive tailored conversation starters and relationship insights based on your unique connection with each match.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-cupid-100 dark:bg-cupid-900/20" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to meet your match?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of people who have found meaningful connections through Cupid AI.
          </p>
          <Button asChild size="lg" className="cupid-gradient text-lg">
            <Link to="/onboarding">
              Create Your Profile
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-10 px-6 bg-white dark:bg-gray-950 border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <Heart className="h-6 w-6 text-cupid-500 mr-2" />
            <span className="text-xl font-bold">Cupid AI</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Cupid AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
