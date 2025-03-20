
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
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
          <h1>Terms of Service</h1>
          <p>Last Updated: March 21, 2025</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Cupid AI, you agree to be bound by these Terms of Service. 
            If you disagree with any part of the terms, you may not access the service.
          </p>
          
          <h2>2. Eligibility</h2>
          <p>
            You must be at least 18 years old to use Cupid AI. By using our services, you represent 
            and warrant that you are at least 18 years of age and have the right, authority, and 
            capacity to enter into this agreement.
          </p>
          
          <h2>3. Account Registration</h2>
          <p>
            To access certain features of our platform, you must register for an account. 
            You agree to provide accurate, current, and complete information during the 
            registration process and to update such information to keep it accurate, current, and complete.
          </p>
          
          <h2>4. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the service to harm, harass, or intimidate others</li>
            <li>Impersonate any person or entity</li>
            <li>Post false, misleading, or deceptive content</li>
            <li>Engage in any activity that interferes with or disrupts the service</li>
            <li>Upload or transmit viruses or any other malicious code</li>
            <li>Attempt to gain unauthorized access to any part of the service</li>
          </ul>
          
          <h2>5. Content</h2>
          <p>
            You are solely responsible for the content you post on Cupid AI. We reserve the right to 
            remove any content that violates these terms or that we find objectionable for any reason.
          </p>
          
          <h2>6. Intellectual Property</h2>
          <p>
            Cupid AI and its original content, features, and functionality are and will remain the 
            exclusive property of Cupid AI and its licensors. The service is protected by copyright, 
            trademark, and other laws of both the United States and foreign countries.
          </p>
          
          <h2>7. Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the service immediately, 
            without prior notice or liability, for any reason whatsoever, including without 
            limitation if you breach the Terms.
          </p>
          
          <h2>8. Limitation of Liability</h2>
          <p>
            In no event shall Cupid AI, nor its directors, employees, partners, agents, suppliers, 
            or affiliates, be liable for any indirect, incidental, special, consequential or punitive 
            damages, including without limitation, loss of profits, data, use, goodwill, or other 
            intangible losses, resulting from your access to or use of or inability to access or use the service.
          </p>
          
          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
            If a revision is material, we will try to provide at least 30 days' notice prior to any new 
            terms taking effect.
          </p>
          
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
            terms@cupidai.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
