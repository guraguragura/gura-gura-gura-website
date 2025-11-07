import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeImageUrl(url: string | undefined): string {
  if (!url) return '/placeholder.svg';
  
  let normalizedUrl = url;
  
  // Replace localhost URLs with public Medusa backend URL
  const publicBase = import.meta.env.VITE_MEDUSA_PUBLIC_BASE_URL || 'https://medusa-public-images.s3.eu-west-1.amazonaws.com';
  
  if (normalizedUrl.startsWith('http://localhost:9000')) {
    normalizedUrl = normalizedUrl.replace('http://localhost:9000', publicBase);
  }
  
  // Only upgrade to HTTPS if publicBase itself uses HTTPS
  // This prevents forcing HTTPS on development/HTTP-only servers
  const shouldUpgradeToHttps = publicBase.startsWith('https://');
  if (shouldUpgradeToHttps && normalizedUrl.startsWith('http://') && !normalizedUrl.includes('localhost')) {
    normalizedUrl = normalizedUrl.replace('http://', 'https://');
  }
  
  return normalizedUrl;
}
