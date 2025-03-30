
import React from "react";
import { Button } from "@/components/ui/button";
import { Grid3X3Icon, ListIcon } from "lucide-react";

interface ProductViewToggleProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

const ProductViewToggle = ({ viewMode, setViewMode }: ProductViewToggleProps) => {
  return (
    <div className="hidden md:flex space-x-2">
      <Button
        variant="outline"
        size="icon"
        className={viewMode === "grid" ? "bg-blue-50" : ""}
        onClick={() => setViewMode("grid")}
      >
        <Grid3X3Icon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={viewMode === "list" ? "bg-blue-50" : ""}
        onClick={() => setViewMode("list")}
      >
        <ListIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProductViewToggle;
