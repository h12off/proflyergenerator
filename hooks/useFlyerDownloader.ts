

import { useState, useCallback, RefObject } from 'react';

// Declare global types for libraries loaded via <script>
declare const htmlToImage: {
  toPng: (node: HTMLElement, options?: any) => Promise<string>;
};

// Exported type for aspect ratio
export type AspectRatio = '1:1' | '9:16' | '16:9';

export const useFlyerDownloader = (ref: RefObject<HTMLElement>) => {
  const [isDownloadingPng, setIsDownloadingPng] = useState(false);

  /**
   * Internal function to perform the PNG download.
   */
  const _downloadPng = useCallback(async (): Promise<boolean> => {
    const node = ref.current;
    if (!node) {
      console.error("Error: Flyer element not found.");
      return false;
    }
    
    if (typeof htmlToImage === 'undefined') {
      console.error("Error: Image generation library not loaded.");
      return false;
    }

    setIsDownloadingPng(true);

    try {
      const dataUrl = await htmlToImage.toPng(node, {
        quality: 1,
        pixelRatio: 2, // Capture at 2x resolution for crisp images
      });
      
      const link = document.createElement('a');
      link.download = 'high-conversion-ad.png';
      link.href = dataUrl;
      link.click();
      return true;

    } catch (error) {
      console.error('Download failed:', error);
      alert('Could not download the flyer. Please try again. Check console for details.');
      return false;
    } finally {
      setIsDownloadingPng(false);
    }
  }, [ref]);

  /**
   * Public function to request a PNG download.
   */
  const requestPngDownload = useCallback(async (): Promise<boolean> => {
    return await _downloadPng();
  }, [_downloadPng]);


  return { requestPngDownload, isDownloadingPng };
};