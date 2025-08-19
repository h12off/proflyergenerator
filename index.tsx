import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Using versatile fonts that support all required weights (bold, black)
// to prevent font rendering issues (e.g., faux bolding).
const FONT_URL = 'https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;700;900&family=Lato:wght@400;700&family=Oswald:wght@700&family=Playfair+Display:wght@700;900&family=Poppins:wght@700;900&family=Roboto+Slab:wght@400;700&display=swap';

/**
 * Fetches the Google Fonts stylesheet, downloads the font files,
 * converts them to base64 data URLs, and embeds the complete CSS
 * in a <style> tag in the document head. This prevents cross-origin
 * errors when generating images/videos.
 *
 * If embedding fails, it falls back to a standard <link> tag to ensure
 * the UI still renders correctly.
 */
const embedGoogleFonts = async (): Promise<void> => {
    try {
        // Fetch the master CSS file from Google Fonts
        const cssResponse = await fetch(FONT_URL, {
            headers: {
                // Mimic a browser User-Agent to get the most compatible font format (woff2)
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        if (!cssResponse.ok) {
            throw new Error(`Failed to fetch font CSS: ${cssResponse.statusText}`);
        }
        let cssText = await cssResponse.text();
        
        // Find all font URLs within the CSS. This regex handles optional quotes and is non-greedy.
        const fontUrlRegex = /url\(['"]?(https?:\/\/[^)]+?)['"]?\)/g;
        // Using a Set to avoid fetching the same URL multiple times
        const fontUrls = [...new Set([...cssText.matchAll(fontUrlRegex)].map(match => match[1]))];
        
        // Fetch each font file and convert it to a Base64 data URL
        const fontPromises = fontUrls.map(async (url) => {
            try {
                const fontResponse = await fetch(url);
                if (!fontResponse.ok) {
                     console.warn(`Failed to fetch font file: ${url}`);
                     return null;
                }
                const blob = await fontResponse.blob();
                const dataUrl = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
                return { originalUrl: url, dataUrl };
            } catch (e) {
                console.warn(`Could not fetch and embed font: ${url}`, e);
                return null;
            }
        });

        const embeddedFonts = (await Promise.all(fontPromises)).filter(Boolean) as { originalUrl: string; dataUrl: string }[];
        
        // Replace the original font URLs in the CSS with the Base64 data URLs
        for (const { originalUrl, dataUrl } of embeddedFonts) {
            // Escape the original URL to safely use it in a RegExp
            const escapedUrl = originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            cssText = cssText.replace(new RegExp(escapedUrl, 'g'), dataUrl);
        }
        
        // Inject the fully embedded CSS into the document head
        const style = document.createElement('style');
        style.textContent = cssText;
        document.head.appendChild(style);
        console.log("Successfully embedded Google Fonts.");

    } catch (error) {
        // --- Fallback Mechanism ---
        // If anything goes wrong, fall back to linking the stylesheet directly.
        // This ensures the app renders correctly, although image/video generation
        // may fail due to cross-origin restrictions on the canvas.
        console.error("Fatal error embedding fonts. Falling back to <link> tag.", error);
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = FONT_URL;
        document.head.appendChild(link);
    }
};


const initializeApp = async () => {
  await embedGoogleFonts();

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

initializeApp();