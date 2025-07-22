export interface Product {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  price: number;
  discount_price?: number;
  rating: number;
  reviews_count: number;
  is_sale: boolean;
  is_new: boolean;
  is_featured: boolean;
  category?: string;
  handle?: string;
  images?: string[];
}

export interface Category {
  id: string;
  name: string;
  handle: string;
  description?: string;
  thumbnail?: string;
  productsCount?: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  variant_id?: string;
}

export interface Address {
  id: string;
  address_name?: string;
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  province: string;
  postal_code: string;
  country_code: string;
  phone: string;
  is_default_shipping: boolean;
  is_default_billing: boolean;
  latitude?: number;
  longitude?: number;
  geocoded_address?: string;
  is_location_confirmed?: boolean;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  geocodedAddress?: string;
  isConfirmed: boolean;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';