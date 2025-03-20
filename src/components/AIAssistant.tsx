
import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, SendIcon } from "lucide-react";

interface Message {
  content: string;
  sender: "ai" | "user";
  timestamp: Date;
}

interface AIAssistantProps {
  initialMessage?: string;
  purpose: "onboarding" | "matchmaking" | "conversation-tips";
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (data: any) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({
  initialMessage = "Hi there! I'm Cupid, your AI assistant. How can I help you today?",
  purpose,
  isOpen,
  onClose,
  onComplete,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          content: initialMessage,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, initialMessage, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response based on purpose
    setTimeout(() => {
      let aiResponse = "";
      
      switch (purpose) {
        case "onboarding":
          aiResponse = generateOnboardingResponse(input);
          break;
        case "matchmaking":
          aiResponse = generateMatchmakingResponse(input);
          break;
        case "conversation-tips":
          aiResponse = generateConversationTips(input);
          break;
        default:
          aiResponse = "I'm not sure how to respond to that.";
      }

      const aiMessage: Message = {
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateOnboardingResponse = (userInput: string): string => {
    if (userInput.toLowerCase().includes("interest") || userInput.toLowerCase().includes("hobby")) {
      return "Great! Sharing your interests helps us find better matches. What are some activities you enjoy in your free time?";
    } else if (userInput.toLowerCase().includes("job") || userInput.toLowerCase().includes("work")) {
      return "Your career is an important part of who you are. Could you tell me more about what you do professionally?";
    } else if (userInput.toLowerCase().includes("looking for") || userInput.toLowerCase().includes("want")) {
      return "Understanding what you're looking for in a partner helps us make better matches. Could you describe your ideal relationship?";
    } else {
      return "Thanks for sharing that! The more I learn about you, the better matches I can suggest. What else would you like to share about yourself?";
    }
  };

  const generateMatchmakingResponse = (userInput: string): string => {
    if (userInput.toLowerCase().includes("match") || userInput.toLowerCase().includes("find")) {
      return "Based on your profile and preferences, I've found several potential matches that share your interests in photography and hiking. Would you like to see them?";
    } else if (userInput.toLowerCase().includes("why") || userInput.toLowerCase().includes("how")) {
      return "I recommend matches based on shared interests, values, and communication styles. The more you interact with the app, the better my suggestions become.";
    } else {
      return "I'm constantly analyzing profiles to find your most compatible matches. Would you like me to prioritize shared interests or complementary personalities in your next round of suggestions?";
    }
  };

  const generateConversationTips = (userInput: string): string => {
    if (userInput.toLowerCase().includes("start") || userInput.toLowerCase().includes("begin")) {
      return "I notice they mentioned loving photography in their profile. Try asking what inspired them to pick up a camera or what their favorite subject to photograph is. This shows you've paid attention to their interests.";
    } else if (userInput.toLowerCase().includes("nervous") || userInput.toLowerCase().includes("awkward")) {
      return "It's completely normal to feel nervous! Remember that they're likely feeling the same way. Try preparing a few questions beforehand, and don't be afraid of brief silences - they're natural in any conversation.";
    } else {
      return "Based on your previous conversations, I've noticed you connect well when discussing travel experiences. Consider asking about their dream destination or sharing a memorable travel story to spark engaging conversation.";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const titleByPurpose = {
    onboarding: "Create Your Profile",
    matchmaking: "Find Your Match",
    "conversation-tips": "Conversation Assistant",
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] glass-card animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Heart className="h-5 w-5 text-cupid-500" />
            {titleByPurpose[purpose]}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-[350px]">
          <div className="flex-1 overflow-y-auto px-1 py-2 space-y-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.sender === "user"
                      ? "bg-cupid-500 text-white"
                      : "bg-secondary"
                  } animate-slide-up`}
                >
                  {message.sender === "ai" && (
                    <div className="flex items-center mb-1 gap-2">
                      <Avatar className="h-6 w-6 bg-cupid-100">
                        <Heart className="h-3 w-3 text-cupid-500" />
                      </Avatar>
                      <span className="text-xs font-medium">Cupid AI</span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 block text-right mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl p-3 bg-secondary animate-pulse-gentle">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 bg-cupid-100">
                      <Heart className="h-3 w-3 text-cupid-500" />
                    </Avatar>
                    <span className="text-xs font-medium">Cupid AI is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t pt-3 mt-3">
            <div className="flex gap-2">
              <Textarea
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="min-h-[60px] resize-none"
              />
              <Button
                size="icon"
                className="h-[60px] w-[60px] cupid-gradient"
                onClick={handleSendMessage}
              >
                <SendIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIAssistant;
