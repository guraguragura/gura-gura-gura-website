
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useCrisp } from './CrispProvider';

interface ChatButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  label?: string;
}

const ChatButton = ({ 
  variant = "default", 
  size = "default", 
  className = "",
  label = "Chat with us"
}: ChatButtonProps) => {
  const { openChat } = useCrisp();

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={className} 
      onClick={() => openChat()}
    >
      <MessageSquare className="h-4 w-4 mr-2" />
      {label}
    </Button>
  );
};

export default ChatButton;
