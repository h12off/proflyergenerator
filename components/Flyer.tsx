import React, { forwardRef } from 'react';
import { UploadIcon } from './Icons';

// Interface for the textual content of the ad
export interface FlyerContent {
  hook: string;
  headline: string;

  subheading: string;
  offer: string;
  callToAction: string;
  websiteUrl: string;
}

// Interface for the visual design of the ad
export interface FlyerDesign {
    themeName: string;
    colorPalette: {
        backgroundFrom: string;
        backgroundTo: string;
        primary: string;
        secondary: string;
        accent: string;
        textLight: string;
        overlayColor: string;
        overlayOpacity: number;
    };
    fontPairing: {
        headlineFont: 'Poppins' | 'Inter' | 'Oswald' | 'Anton' | 'Playfair Display';
        bodyFont: 'Inter' | 'Roboto Slab' | 'Lato';
    };
    layoutStyle: 'headline-focus' | 'image-dominant-cta-bar' | 'urgent-offer-overlay';
    badgeText?: string;
    ctaAnimation: 'none' | 'pulse';
}

// Type for the background media
export type BackgroundMedia = { type: 'image'; url: string };

// Local type for aspect ratio to avoid importing from a hook
type AspectRatio = '1:1' | '9:16' | '16:9';

export const defaultFlyerContent: FlyerContent = {
  hook: "TIRED OF BEING INVISIBLE?",
  headline: "DOMINATE YOUR MARKET",
  subheading: "With Stellar Digital's Expert Marketing",
  offer: "Claim your FREE website SEO audit today & uncover hidden growth opportunities!",
  callToAction: "GET MY FREE AUDIT",
  websiteUrl: "https://stellardigital.io", // A plausible example URL
};

// Default design used before the first generation
export const defaultFlyerDesign: FlyerDesign = {
    themeName: "Headline Focus",
    colorPalette: {
        backgroundFrom: '#000000',
        backgroundTo: '#1C1C1C',
        primary: '#FFD700', // Gold
        secondary: '#FFFFFF',
        accent: '#FF3B30', // Urgency Red
        textLight: '#FFFFFF',
        overlayColor: '#000000',
        overlayOpacity: 0.8,
    },
    fontPairing: {
        headlineFont: 'Poppins',
        bodyFont: 'Inter',
    },
    layoutStyle: 'headline-focus',
    badgeText: 'LIMITED TIME',
    ctaAnimation: 'pulse',
};


interface FlyerProps {
  backgroundMedia: BackgroundMedia | null;
  content: FlyerContent;
  design: FlyerDesign;
  aspectRatio: AspectRatio;
}

const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '0, 0, 0';
};

const FlyerBackground: React.FC<{ backgroundMedia: BackgroundMedia | null; design: FlyerDesign }> = ({ backgroundMedia, design }) => {
    const { overlayColor, overlayOpacity } = design.colorPalette;
    const rgb = hexToRgb(overlayColor);
    const opacity = Math.max(0, Math.min(1, overlayOpacity));

    const overlayStyle: React.CSSProperties = {
        background: `linear-gradient(to top, rgba(${rgb}, ${opacity}) 20%, rgba(${rgb}, ${opacity * 0.7}) 60%, rgba(${rgb}, ${opacity * 0.2}) 100%)`
    };

    const renderMedia = () => {
        if (!backgroundMedia) {
             return (
                <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0">
                  <div className="text-center text-gray-500 p-4">
                    <UploadIcon className="mx-auto h-12 w-12 sm:h-16 sm:w-16 opacity-30" />
                    <p className="mt-4 text-md sm:text-lg">Upload an image</p>
                  </div>
                </div>
            );
        }

        if (backgroundMedia.type === 'image') {
            return (
                <img
                    src={backgroundMedia.url}
                    alt="Custom flyer background"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
            );
        }

        return null;
    };

    return (
        <div data-testid="flyer-background-container" className="absolute inset-0 w-full h-full">
            {renderMedia()}
            <div className="absolute inset-0 z-10" style={overlayStyle} />
        </div>
    );
};


// Adaptive sizing configuration for each aspect ratio
const layoutConfig = {
    '1:1': {
        containerPadding: 'p-4 sm:p-5 md:p-6 lg:p-8',
        hook: 'text-base sm:text-lg md:text-xl lg:text-2xl',
        headline: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
        subheading: 'text-sm sm:text-base md:text-lg lg:text-xl',
        offer: 'text-xs sm:text-sm md:text-base lg:text-lg',
        ctaButton: 'py-2 px-4 text-sm sm:text-base md:py-3 md:px-6 md:text-lg lg:py-4 lg:px-8 lg:text-xl',
        badge: 'px-2 py-1 text-[10px] sm:text-xs md:px-3 md:py-1.5 md:text-sm lg:px-4 lg:text-base',
    },
    '9:16': { // Tall & Narrow
        containerPadding: 'p-4 sm:p-5 md:p-6',
        hook: 'text-sm sm:text-base md:text-lg',
        headline: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
        subheading: 'text-xs sm:text-sm md:text-base lg:text-lg',
        offer: 'text-[11px] sm:text-xs md:text-sm lg:text-base',
        ctaButton: 'py-2 px-3 text-sm sm:text-base md:py-3 md:px-5 md:text-lg',
        badge: 'px-2 py-0.5 text-[9px] sm:text-xs md:px-3 md:py-1 md:text-sm',
    },
    '16:9': { // Wide & Short
        containerPadding: 'p-3 sm:p-4 md:p-5 lg:p-6',
        hook: 'text-xs sm:text-sm md:text-base lg:text-lg',
        headline: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
        subheading: 'text-[11px] sm:text-xs md:text-sm lg:text-base',
        offer: 'text-[10px] sm:text-[11px] md:text-xs lg:text-sm',
        ctaButton: 'py-1.5 px-3 text-xs sm:py-2 sm:px-4 sm:text-sm md:py-2.5 md:px-5 md:text-base',
        badge: 'px-1.5 py-0.5 text-[8px] sm:px-2 sm:text-xs md:px-2.5 md:text-sm',
    }
};

const LayoutRenderer: React.FC<Omit<FlyerProps, 'backgroundMedia'>> = ({ content, design, aspectRatio }) => {
    const config = layoutConfig[aspectRatio];
    const { colorPalette, fontPairing, layoutStyle, ctaAnimation, badgeText } = design;

    const CtaButton = () => (
        <a href={content.websiteUrl} target="_blank" rel="noopener noreferrer" className={`inline-block ${config.ctaButton} font-black uppercase rounded-lg shadow-lg transform transition-transform duration-300 ${ctaAnimation === 'pulse' ? 'animate-pulse-cta' : 'hover:scale-105'}`} style={{ backgroundColor: colorPalette.accent, color: colorPalette.textLight === '#FFFFFF' ? '#000000' : '#FFFFFF', fontFamily: fontPairing.headlineFont }}>
            {content.callToAction}
        </a>
    );
    
    // Layout: A bar at the bottom containing all content. Great for showing off the background.
    if (layoutStyle === 'image-dominant-cta-bar') {
        return (
            <div className="relative z-20 flex flex-col h-full justify-end">
                <div className={`w-full text-center p-4`} style={{ backgroundColor: `rgba(${hexToRgb(colorPalette.overlayColor)}, 0.8)`, backdropFilter: 'blur(4px)' }}>
                    <h1 className={`${config.headline} font-black uppercase leading-tight break-words`} style={{ fontFamily: fontPairing.headlineFont, color: colorPalette.primary }}>{content.headline}</h1>
                    <p className={`${config.subheading} mt-1 font-bold break-words`} style={{ fontFamily: fontPairing.bodyFont, color: colorPalette.secondary }}>{content.subheading}</p>
                    <div className="mt-4"><CtaButton /></div>
                </div>
            </div>
        );
    }
    
    // Default Layouts: Content is spread vertically across the flyer.
    const justification = layoutStyle === 'urgent-offer-overlay' ? 'justify-between' : 'justify-around';

    return (
        <div className={`relative z-20 flex flex-col h-full text-center ${justification} ${config.containerPadding} overflow-hidden`}>
            {/* Header Area (Hook/Badge) */}
            <div className="flex-shrink-0">
                {badgeText && content.headline && (
                    <span className={`inline-block bg-red-500 text-white font-bold tracking-widest uppercase rounded-md ${config.badge}`} style={{ fontFamily: fontPairing.headlineFont }}>
                        {badgeText}
                    </span>
                )}
                 <p className={`${config.hook} font-bold mt-2 uppercase tracking-wider`} style={{ fontFamily: fontPairing.bodyFont, color: colorPalette.secondary, textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>{content.hook}</p>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col justify-center items-center">
                <h1 className={`${config.headline} font-black uppercase leading-tight break-words`} style={{ fontFamily: fontPairing.headlineFont, color: colorPalette.primary, textShadow: '2px 2px 6px rgba(0,0,0,0.7)' }}>{content.headline}</h1>
                <p className={`${config.subheading} mt-2 font-bold break-words max-w-prose`} style={{ fontFamily: fontPairing.bodyFont, color: colorPalette.secondary }}>{content.subheading}</p>
                <p className={`${config.offer} mt-5 max-w-prose break-words leading-relaxed`} style={{ fontFamily: fontPairing.bodyFont, color: colorPalette.textLight }}>{content.offer}</p>
            </div>

            {/* Footer Area (CTA) */}
            <div className="flex-shrink-0">
                 {content.callToAction && <CtaButton />}
            </div>
        </div>
    );
};


const Flyer = forwardRef<HTMLDivElement, FlyerProps>(({ backgroundMedia, content, design, aspectRatio }, ref) => {
    const { colorPalette } = design;

    const flyerAspectRatioClass = {
        '1:1': 'aspect-square',
        '9:16': 'aspect-[9/16]',
        '16:9': 'aspect-[16/9]'
    }[aspectRatio];

    return (
        <div
            ref={ref}
            className={`flyer-container relative w-full max-w-2xl overflow-hidden shadow-2xl rounded-lg ${flyerAspectRatioClass}`}
            style={{
                background: `linear-gradient(to bottom, ${colorPalette.backgroundFrom}, ${colorPalette.backgroundTo})`
            }}
        >
            <FlyerBackground backgroundMedia={backgroundMedia} design={design} />
            <LayoutRenderer content={content} design={design} aspectRatio={aspectRatio} />
        </div>
    );
});

export default Flyer;