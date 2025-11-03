
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Define interfaces for product details
interface ProductMetadata {
  images?: string[];
  price?: number;
  discount_price?: number;
  rating?: number;
  reviews_count?: number;
  in_stock?: boolean;
  sku?: string;
  specifications?: Record<string, any>;
  features?: string[];
  is_sale?: boolean;
  is_new?: boolean;
  variants?: any[];
}

export interface ProductDetails {
  id: string;
  title: string;
  description: string;
  subtitle?: string;
  price: number;
  discount_price?: number;
  thumbnail: string;
  images: string[];
  rating: number;
  reviews_count: number;
  in_stock: boolean;
  sku?: string;
  specifications?: Record<string, any>;
  features?: string[];
  is_sale?: boolean;
  is_new?: boolean;
  variants?: any[];
  metadata: ProductMetadata;
}

/**
 * Safely extracts a value from a JSON object with type checking
 * @param obj The object to extract from
 * @param key The key to extract
 * @param type The expected type
 * @param defaultValue Default value if key doesn't exist or type doesn't match
 */
function safeExtract<T>(
  obj: Record<string, unknown> | null | undefined, 
  key: string, 
  type: string, 
  defaultValue: T
): T {
  if (!obj || typeof obj !== 'object' || obj === null) {
    return defaultValue;
  }
  
  const value = obj[key];
  if (value === undefined || value === null || typeof value !== type) {
    return defaultValue;
  }
  
  return value as T;
}

/**
 * Safely extracts an array from a JSON object
 * @param obj The object to extract from
 * @param key The key to extract
 * @param defaultValue Default value if key doesn't exist or is not an array
 */
function safeExtractArray<T>(
  obj: Record<string, unknown> | null | undefined, 
  key: string, 
  defaultValue: T[]
): T[] {
  if (!obj || typeof obj !== 'object' || obj === null) {
    return defaultValue;
  }
  
  const value = obj[key];
  if (!Array.isArray(value)) {
    return defaultValue;
  }
  
  return value as T[];
}

/**
 * Safely extracts a boolean from a JSON object
 * @param obj The object to extract from
 * @param key The key to extract
 * @param defaultValue Default value if key doesn't exist or is not a boolean
 */
function safeExtractBoolean(
  obj: Record<string, unknown> | null | undefined, 
  key: string, 
  defaultValue: boolean
): boolean {
  if (!obj || typeof obj !== 'object' || obj === null) {
    return defaultValue;
  }
  
  const value = obj[key];
  if (typeof value !== 'boolean') {
    return defaultValue;
  }
  
  return value;
}

/**
 * Safely extracts an object from a JSON object
 * @param obj The object to extract from
 * @param key The key to extract
 * @param defaultValue Default value if key doesn't exist or is not an object
 */
function safeExtractObject<T>(
  obj: Record<string, unknown> | null | undefined, 
  key: string, 
  defaultValue: T
): T {
  if (!obj || typeof obj !== 'object' || obj === null) {
    return defaultValue;
  }
  
  const value = obj[key];
  if (typeof value !== 'object' || value === null) {
    return defaultValue;
  }
  
  return value as T;
}

export function useProductDetails(productId: string | undefined) {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setLoading(false);
        setError("Product ID is required");
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const { data, error: queryError } = await supabase
          .from('product')
          .select('*, product_category_product(product_category_id, product_category:product_category(name, handle))')
          .eq('id', productId)
          .single();

        if (queryError) {
          console.error("Error fetching product:", queryError);
          setError("Failed to load product");
          setProduct(null);
        } else if (data) {
          // First, ensure metadata is an object
          const rawMetadata = (typeof data.metadata === 'object' && data.metadata !== null) 
            ? data.metadata as Record<string, unknown>
            : {};
          
          // Extract values safely with type checking
          const price = safeExtract(rawMetadata, 'price', 'number', 19.99);
          const discountPrice = safeExtract(rawMetadata, 'discount_price', 'number', undefined);
          const images = safeExtractArray(rawMetadata, 'images', [data.thumbnail || "/placeholder.svg"]);
          const rating = safeExtract(rawMetadata, 'rating', 'number', 4.5);
          const reviewsCount = safeExtract(rawMetadata, 'reviews_count', 'number', 124);
          const inStock = safeExtractBoolean(rawMetadata, 'in_stock', true);
          const sku = safeExtract(rawMetadata, 'sku', 'string', '');
          const isSale = safeExtractBoolean(rawMetadata, 'is_sale', false);
          const isNew = safeExtractBoolean(rawMetadata, 'is_new', false);
          const specifications = safeExtractObject(rawMetadata, 'specifications', {});
          const features = safeExtractArray(rawMetadata, 'features', []);
          const variants = safeExtractArray(rawMetadata, 'variants', []);
          
          // Create a safe ProductMetadata object
          const productMetadata: ProductMetadata = {
            price,
            discount_price: discountPrice,
            images,
            rating,
            reviews_count: reviewsCount,
            in_stock: inStock,
            sku,
            specifications,
            features,
            is_sale: isSale,
            is_new: isNew,
            variants
          };
          
          // Build product with directly assigned properties
          const formattedProduct: ProductDetails = {
            id: data.id,
            title: data.title,
            description: data.description || "",
            subtitle: data.subtitle || "",
            price,
            discount_price: discountPrice,
            thumbnail: data.thumbnail || "/placeholder.svg",
            images,
            rating,
            reviews_count: reviewsCount,
            in_stock: inStock,
            sku,
            specifications,
            features,
            is_sale: isSale,
            is_new: isNew,
            variants,
            metadata: productMetadata
          };
          
          setProduct(formattedProduct);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("An unexpected error occurred");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
}
