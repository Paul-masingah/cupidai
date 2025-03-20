
import React from "react";

const steps = [
  {
    number: "01",
    title: "Create your profile",
    description: "Sign up and build your profile with photos, interests, and preferences to help our AI understand you better."
  },
  {
    number: "02",
    title: "Get matched",
    description: "Our AI analyzes your profile and preferences to suggest highly compatible matches."
  },
  {
    number: "03",
    title: "Schedule video dates",
    description: "Skip the texting phase and schedule short video dates directly with your matches."
  },
  {
    number: "04",
    title: "Connect deeper",
    description: "Use our AI conversation assistant during calls to keep things flowing naturally."
  }
];

const HowItWorksSection = () => {
  return (
    <div className="bg-muted/30 py-20" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cupid AI makes finding meaningful connections simple and efficient with these easy steps
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col md:flex-row items-start gap-8 pb-12 ${
                index < steps.length - 1 ? "mb-12 border-b border-border" : ""
              }`}
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-cupid-100 text-cupid-900 text-2xl font-bold">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block h-full w-px bg-border absolute left-8 top-16 ml-[0.5px]"></div>
                )}
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-lg">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
