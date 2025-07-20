import { useState, useEffect } from 'react';

interface UseImagePreloaderOptions {
  images: string[];
  priority?: boolean;
}

interface ImagePreloaderReturn {
  loadedImages: Set<string>;
  loadingProgress: number;
  preloadImage: (src: string) => Promise<void>;
}

export const useImagePreloader = ({ 
  images, 
  priority = false 
}: UseImagePreloaderOptions): ImagePreloaderReturn => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [loadingProgress, setLoadingProgress] = useState(0);

  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, src]));
        resolve();
      };
      
      img.onerror = () => {
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      img.src = src;
    });
  };

  useEffect(() => {
    if (images.length === 0) return;

    const loadImages = async () => {
      const promises = images.map(async (src, index) => {
        try {
          if (priority) {
            // Load images sequentially for priority loading
            await preloadImage(src);
          } else {
            // Add small delay for non-priority images
            await new Promise(resolve => setTimeout(resolve, index * 100));
            await preloadImage(src);
          }
        } catch (error) {
          console.warn(`Failed to preload image: ${src}`, error);
        }
      });

      if (priority) {
        // Sequential loading for priority images
        for (const promise of promises) {
          await promise;
          setLoadingProgress(prev => prev + (100 / images.length));
        }
      } else {
        // Parallel loading for non-priority images
        await Promise.allSettled(promises);
        setLoadingProgress(100);
      }
    };

    loadImages();
  }, [images, priority]);

  useEffect(() => {
    setLoadingProgress((loadedImages.size / images.length) * 100);
  }, [loadedImages.size, images.length]);

  return {
    loadedImages,
    loadingProgress,
    preloadImage
  };
};