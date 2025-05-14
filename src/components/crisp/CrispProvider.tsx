
import { ReactNode, useEffect } from 'react';

declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}

interface CrispProviderProps {
  children: ReactNode;
}

export const CrispProvider = ({ children }: CrispProviderProps) => {
  useEffect(() => {
    // Initialize Crisp if it exists
    if (window.$crisp) {
      // You can add custom configurations here
      // For example:
      // window.$crisp.push(["set", "user:email", "[user_email]"]);
      // window.$crisp.push(["set", "user:nickname", "[user_nickname]"]);
    }
  }, []);

  return <>{children}</>;
};

export const useCrisp = () => {
  const openChat = () => {
    if (window.$crisp) {
      window.$crisp.push(["do", "chat:open"]);
    }
  };

  const closeChat = () => {
    if (window.$crisp) {
      window.$crisp.push(["do", "chat:close"]);
    }
  };

  const hideChat = () => {
    if (window.$crisp) {
      window.$crisp.push(["do", "chat:hide"]);
    }
  };

  const showChat = () => {
    if (window.$crisp) {
      window.$crisp.push(["do", "chat:show"]);
    }
  };

  const setUserData = (email: string, nickname?: string, avatar?: string) => {
    if (window.$crisp) {
      if (email) window.$crisp.push(["set", "user:email", email]);
      if (nickname) window.$crisp.push(["set", "user:nickname", nickname]);
      if (avatar) window.$crisp.push(["set", "user:avatar", avatar]);
    }
  };

  return { openChat, closeChat, hideChat, showChat, setUserData };
};
