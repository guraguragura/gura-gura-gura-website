
import React from "react";

interface FilterItemProps {
  id: string;
  name: string;
  value: string | number;
  checked: boolean;
  onChange: () => void;
  count: number;
  children?: React.ReactNode;
}

const RadioFilterItem = ({ id, name, value, checked, onChange, count, children }: FilterItemProps) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      <label 
        htmlFor={id} 
        className="flex justify-between items-center cursor-pointer text-sm flex-1"
      >
        {children ? (
          children
        ) : (
          <span>{value}</span>
        )}
        <span className="text-gray-500">({count})</span>
      </label>
    </div>
  );
};

export default RadioFilterItem;
