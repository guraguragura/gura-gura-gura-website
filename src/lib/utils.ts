import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeImageUrl(url: string | undefined): string {
  if (!url) return '/placeholder.svg';
  
  // Replace localhost URLs with public Medusa backend URL
  const publicBase = import.meta.env.VITE_MEDUSA_PUBLIC_BASE_URL || 'https://medusa-public-images.s3.eu-west-1.amazonaws.com';
  
  if (url.startsWith('http://localhost:9000')) {
    return url.replace('http://localhost:9000', publicBase);
  }
  
  // Upgrade http to https for security if it's not a localhost URL
  if (url.startsWith('http://') && !url.startsWith('http://localhost')) {
    return url.replace('http://', 'https://');
  }
  
  return url;
}
