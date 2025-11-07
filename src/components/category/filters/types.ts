
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

export interface OptionValue {
  value: string;
  count: number;
}

export interface ProductFilters {
  Size?: string | null;
  Color?: string | null;
  brand?: string | null;
  material?: string | null;
  type?: string | null;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
  [key: string]: string | null | undefined;
}
