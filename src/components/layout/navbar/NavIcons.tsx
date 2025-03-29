
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCartIcon, UserIcon, HeartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const NavIcons = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center space-x-4">
      <Link to={user ? "/account" : "/auth"}>
        <Button variant="ghost" size="sm" className="flex flex-col items-center p-1">
          <UserIcon className="h-5 w-5" />
          <span className="text-xs mt-1">{user ? "Account" : "Log in"}</span>
        </Button>
      </Link>
      <Button variant="ghost" size="sm" className="flex flex-col items-center p-1">
        <HeartIcon className="h-5 w-5" />
        <span className="text-xs mt-1">Wishlist</span>
      </Button>
      <Button variant="ghost" size="sm" className="flex flex-col items-center p-1">
        <ShoppingCartIcon className="h-5 w-5" />
        <span className="text-xs mt-1">Cart</span>
      </Button>
    </div>
  );
};

export default NavIcons;
