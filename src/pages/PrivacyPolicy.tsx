
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        
        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
          <h1>Privacy Policy</h1>
          <p>Last Updated: March 21, 2025</p>
          
          <h2>1. Introduction</h2>
          <p>
            Welcome to Cupid AI ("we," "our," or "us"). We respect your privacy and are committed 
            to protecting your personal data. This Privacy Policy explains how we collect, use, 
            and safeguard your information when you use our video dating platform.
          </p>
          
          <h2>2. Information We Collect</h2>
          <p>We collect several types of information, including:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, date of birth, gender, 
              location, and other details you provide in your profile.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our platform, 
              including features used, time spent, and actions taken.</li>
            <li><strong>Communication Data:</strong> Messages, video calls, and other communications 
              you have with other users.</li>
            <li><strong>Device Information:</strong> Information about your device, IP address, 
              and browser type.</li>
          </ul>
          
          <h2>3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Match you with compatible users</li>
            <li>Communicate with you about our platform</li>
            <li>Ensure the safety and security of our community</li>
            <li>Comply with legal obligations</li>
          </ul>
          
          <h2>4. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your information with:
          </p>
          <ul>
            <li>Other users, as necessary for the service (e.g., matching)</li>
            <li>Service providers who help us operate our platform</li>
            <li>Legal authorities when required by law</li>
          </ul>
          
          <h2>5. Your Rights</h2>
          <p>
            Depending on your location, you may have rights regarding your personal information, including:
          </p>
          <ul>
            <li>Access to your data</li>
            <li>Correction of inaccurate data</li>
            <li>Deletion of your data</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
          </ul>
          
          <h2>6. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. 
            However, no internet transmission is completely secure, and we cannot guarantee 
            the security of information transmitted through our platform.
          </p>
          
          <h2>7. International Data Transfers</h2>
          <p>
            Your information may be transferred to — and processed in — countries other than 
            the country you live in. These countries may have different data protection laws.
          </p>
          
          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any 
            changes by posting the new policy on this page and updating the "Last Updated" date.
          </p>
          
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
            support@cupidai.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
