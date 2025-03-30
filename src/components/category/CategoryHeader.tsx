
import React from "react";

interface CategoryHeaderProps {
  name: string;
}

const CategoryHeader = ({ name }: CategoryHeaderProps) => {
  return (
    <h2 className="text-xl font-bold mb-6">{name || "Product Category"}</h2>
  );
};

export default CategoryHeader;
