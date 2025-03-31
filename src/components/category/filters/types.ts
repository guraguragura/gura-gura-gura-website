
export interface FilterItemProps {
  id: string;
  name: string;
  value: string | number;
  checked: boolean;
  onChange: () => void;
  count: number;
  children?: React.ReactNode;
}

export interface CategoryData {
  name: string;
  handle: string;
  count: number;
}

export interface FilterOption {
  name: string;
  count: number;
}

export interface RatingOption {
  value: number;
  count: number;
}
