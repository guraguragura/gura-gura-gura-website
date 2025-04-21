
export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  badge?: string;
  rating?: number;
  reviewsCount?: number;
}
