
export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  badge?: string;
  rating?: number;
  reviewsCount?: number;
}
