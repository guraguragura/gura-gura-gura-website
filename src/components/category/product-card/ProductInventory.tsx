import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProductInventoryProps {
  soldItems: number;
  totalInventory: number;
}

const ProductInventory: React.FC<ProductInventoryProps> = ({ soldItems, totalInventory }) => {
  const inventoryPercentage = (soldItems / totalInventory) * 100;
  
  return (
    <>
      <Progress value={inventoryPercentage} className="h-1.5 mb-1" />
      <div className="text-xs text-gray-600 mb-3">
        Sold: {soldItems}/{totalInventory}
      </div>
    </>
  );
};

export default ProductInventory;

import "./ProductInventory.css";
