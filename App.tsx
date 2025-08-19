import React, { useState, useRef, useEffect, useCallback } from 'react';
import Flyer, { FlyerContent, FlyerDesign, defaultFlyerDesign, BackgroundMedia, defaultFlyerContent } from './components/Flyer';
import { useFlyerDownloader, AspectRatio } from './hooks/useFlyerDownloader';
import { idbGet, idbSet } from './hooks/idb';
import { UploadIcon, DownloadIcon, TemplateIcon, ContentIcon, DesignLayoutIcon, ColorPaletteIcon, BackgroundImageIcon } from './components/Icons';
import AboutModal from './components/AboutModal';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import TermsAndConditionsModal from './components/TermsAndConditionsModal';
import { Template, templates } from './templates';
import TemplateGallery from './components/TemplateGallery';


// --- AdSense Component ---
declare global {
    interface Window {
        adsbygoogle?: any[];
    }
}

interface AdSenseBannerProps {
    'data-ad-client': string;
    'data-ad-slot': string;
    style?: React.CSSProperties;
    className?: string;
}

const AdSenseBanner: React.FC<AdSenseBannerProps> = ({ className, style, ...props }) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error('AdSense error:', e);
        }
    }, []);

    return (
        <div className={className}>
             <ins
                className="adsbygoogle"
                style={{ display: 'block', textAlign: 'center', ...style }}
                data-ad-client={props['data-ad-client']}
                data-ad-slot={props['data-ad-slot']}
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
};

// --- Reusable Editor Components (Moved outside App for stability) ---

const DetailSection: React.FC<{ title: string, children: React.ReactNode, isOpen: boolean, onToggle: () => void, icon?: React.ReactNode }> = ({ title, children, isOpen, onToggle, icon }) => {
  const handleSummaryClick = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      onToggle();
  };

  return (
      <details className="group border border-gray-200 rounded-lg" open={isOpen}>
          <summary
              onClick={handleSummaryClick}
              className="text-md font-medium text-gray-800 cursor-pointer list-none flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
          >
              <div className="flex items-center gap-3">
                 {icon}
                 <span>{title}</span>
              </div>
              <svg className="h-5 w-5 transition-transform transform group-open:rotate-90 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
          </summary>
          <div className="p-4 pt-2 border-t border-gray-200">
              {children}
          </div>
      </details>
  );
};


const TextInput: React.FC<{ label: string, value: string, onChange: (value: string) => void, id: string }> = ({ label, value, onChange, id }) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-sm font-medium text-gray-600">{label}</label>
    <input id={id} type="text" value={value} onChange={e => onChange(e.target.value)} className="w-full p-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm" />
  </div>
);

const SelectInput: React.FC<{ label: string, value: string, onChange: (value: string) => void, id: string, children: React.ReactNode }> = ({ label, value, onChange, id, children }) => (
  <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-600">{label}</label>
      <select id={id} value={value} onChange={e => onChange(e.target.value)} className="w-full p-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm">
          {children}
      </select>
  </div>
);

// State for each flyer format
export interface FlyerFormatState {
    backgroundMedia: (BackgroundMedia & { idbKey?: string }) | null;
    flyerContent: FlyerContent;
    flyerDesign: FlyerDesign;
    aspectRatio: AspectRatio;
}

const FLYER_STATE_STORAGE_KEY = 'proFlyerGeneratorState_v8'; // Bumped version for new data structure

const createDefaultFormatState = (): Omit<FlyerFormatState, 'aspectRatio'> => ({
    backgroundMedia: null,
    flyerContent: defaultFlyerContent,
    flyerDesign: defaultFlyerDesign,
});

const getInitialFlyerState = () => {
    try {
        const item = window.localStorage.getItem(FLYER_STATE_STORAGE_KEY);
        if (item) {
            const parsed = JSON.parse(item);
            // Basic validation for the new structure
            if (parsed.flyerStates && parsed.activeAspectRatio && parsed.flyerStates['1:1']?.flyerContent) {
                return parsed as { flyerStates: Record<AspectRatio, FlyerFormatState>, activeAspectRatio: AspectRatio };
            }
        }
    } catch (error) {
        console.error("Error loading flyer state from localStorage, using defaults.", error);
        window.localStorage.removeItem(FLYER_STATE_STORAGE_KEY);
    }
    // Default state
    const defaultState: Record<AspectRatio, FlyerFormatState> = {
        '1:1': { ...createDefaultFormatState(), aspectRatio: '1:1' },
        '9:16': { ...createDefaultFormatState(), aspectRatio: '9:16' },
        '16:9': { ...createDefaultFormatState(), aspectRatio: '16:9' },
    };
    return {
        flyerStates: defaultState,
        activeAspectRatio: '1:1' as AspectRatio,
    };
};

const formatLabels: Record<AspectRatio, string> = {
    '1:1': 'Instagram Post',
    '9:16': 'Instagram Story',
    '16:9': 'YouTube Thumbnail',
};

const App: React.FC = () => {
  const [initialAppState] = useState(getInitialFlyerState);

  const [flyerStates, setFlyerStates] = useState<Record<AspectRatio, FlyerFormatState>>(initialAppState.flyerStates);
  const [activeAspectRatio, setActiveAspectRatio] = useState<AspectRatio>(initialAppState.activeAspectRatio);
  const [notification, setNotification] = useState<{type: 'error' | 'success', message: string} | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Templates': true,
    'Content': false,
  });
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isTemplateLoading, setIsTemplateLoading] = useState(false);
  
  const flyerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { requestPngDownload, isDownloadingPng } = useFlyerDownloader(flyerRef);

  const currentFlyerState = flyerStates[activeAspectRatio];

  const setAllFlyerStates = (updater: (currentState: FlyerFormatState) => { flyerContent: FlyerContent, flyerDesign: FlyerDesign, backgroundMedia?: BackgroundMedia | null }) => {
     setFlyerStates(prevStates => {
         const updates = updater(prevStates[activeAspectRatio]);
         const newStates: Record<AspectRatio, FlyerFormatState> = { ...prevStates };
         for (const key in newStates) {
             const aspectRatio = key as AspectRatio;
             newStates[aspectRatio] = {
                 ...newStates[aspectRatio],
                 flyerContent: updates.flyerContent,
                 flyerDesign: updates.flyerDesign,
                 // Only update backgroundMedia if it's explicitly provided in the update
                 ...(updates.backgroundMedia !== undefined && { backgroundMedia: updates.backgroundMedia })
             };
         }
         return newStates;
     });
  };

  // Effect to save main state to localStorage whenever it changes
  useEffect(() => {
    const saveState = async () => {
        const stateToSave = { flyerStates, activeAspectRatio };
        try {
            const dehydratedState = JSON.parse(JSON.stringify(stateToSave));
            const sourceBackgroundMedia = dehydratedState.flyerStates[activeAspectRatio].backgroundMedia;

            let finalIdbKey: string | undefined = undefined;

            if (sourceBackgroundMedia) {
                if (sourceBackgroundMedia.url) {
                    finalIdbKey = sourceBackgroundMedia.idbKey || `bg-media-${Date.now()}`;
                    try {
                        await idbSet(finalIdbKey, sourceBackgroundMedia.url);
                    } catch (e) {
                        console.error("Failed to save background to IndexedDB", e);
                        finalIdbKey = undefined;
                    }
                } else if (sourceBackgroundMedia.idbKey) {
                    finalIdbKey = sourceBackgroundMedia.idbKey;
                }
            }
            
            for (const key in dehydratedState.flyerStates) {
                const formatState = dehydratedState.flyerStates[key as AspectRatio];
                if (finalIdbKey) {
                    formatState.backgroundMedia = { type: 'image', idbKey: finalIdbKey };
                } else {
                    formatState.backgroundMedia = null;
                }
            }
            
            localStorage.setItem(FLYER_STATE_STORAGE_KEY, JSON.stringify(dehydratedState));
        } catch (e) {
            console.error("Failed to save state to localStorage", e);
            handleNotification('Could not save changes. The data might be too large.', 'error');
        }
    };

    saveState();
  }, [flyerStates, activeAspectRatio]);
  
  // Effect to hydrate state from IndexedDB on load
  useEffect(() => {
    const hydrate = async () => {
        const stateToHydrate = JSON.parse(JSON.stringify(flyerStates));
        let stateNeedsUpdate = false;
        const hydrationPromises = Object.keys(stateToHydrate).map(async (key) => {
            const formatState = stateToHydrate[key as AspectRatio];
            if (formatState.backgroundMedia?.idbKey && !formatState.backgroundMedia.url) {
                const url = await idbGet<string>(formatState.backgroundMedia.idbKey);
                if (url) {
                    formatState.backgroundMedia.url = url;
                    stateNeedsUpdate = true;
                }
            }
        });
        await Promise.all(hydrationPromises);
        if (stateNeedsUpdate) {
            setFlyerStates(stateToHydrate);
        }
    };
    hydrate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNotification = (message: string, type: 'success' | 'error' = 'error') => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 5000);
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setAllFlyerStates(current => ({
            ...current,
            backgroundMedia: { type: 'image', url }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAspectRatioChange = (ratio: AspectRatio) => {
    setActiveAspectRatio(ratio);
  };
  
  const handleDownload = async () => {
    await requestPngDownload();
  };
  
  const handleSelectTemplate = useCallback(async (template: Template) => {
    setIsTemplateLoading(true);
    handleNotification('Applying template...', 'success');
    
    let backgroundUpdate: { backgroundMedia: BackgroundMedia | null } = { backgroundMedia: null };

    if (template.backgroundImageUrl) {
        try {
            const response = await fetch(template.backgroundImageUrl);
            const blob = await response.blob();
            const dataUrl = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
            backgroundUpdate.backgroundMedia = { type: 'image', url: dataUrl };
        } catch (error) {
            console.error("Failed to fetch template background image", error);
            handleNotification("Could not load template image.", "error");
            backgroundUpdate.backgroundMedia = null; // Fallback to no image on error
        }
    }

    setAllFlyerStates(() => ({
        flyerContent: template.flyerContent,
        flyerDesign: template.flyerDesign,
        ...backgroundUpdate
    }));

    setIsTemplateLoading(false);
  }, []);

  // --- Handlers for manual editing ---
  const handleContentChange = (field: keyof FlyerContent, value: string) => {
    setAllFlyerStates(current => ({...current, flyerContent: { ...current.flyerContent, [field]: value }}));
  };
  
  const handleDesignChange = (field: keyof FlyerDesign, value: any) => {
    setAllFlyerStates(current => ({...current, flyerDesign: { ...current.flyerDesign, [field]: value }}));
  };

  const handleColorChange = (field: keyof FlyerDesign['colorPalette'], value: string | number) => {
    setAllFlyerStates(current => ({...current, flyerDesign: { ...current.flyerDesign, colorPalette: { ...current.flyerDesign.colorPalette, [field]: value }}}));
  };

  const handleFontChange = (field: keyof FlyerDesign['fontPairing'], value: string) => {
    setAllFlyerStates(current => ({...current, flyerDesign: { ...current.flyerDesign, fontPairing: { ...current.flyerDesign.fontPairing, [field]: value as any }}}));
  };
  
  const handleToggleSection = (title: string) => {
    setOpenSections(prev => ({
        ...prev,
        [title]: !prev[title],
    }));
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen font-sans flex flex-col items-center p-3 sm:p-4 lg:p-6">
      {(notification || isTemplateLoading) && (
        <div 
          className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg text-white ${notification?.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
          role="alert"
        >
          {isTemplateLoading ? 'Loading Template...' : notification?.message}
          {!isTemplateLoading && <button onClick={() => setNotification(null)} className="ml-4 font-bold">X</button>}
        </div>
      )}

      <header className="w-full max-w-7xl mx-auto mb-4 sm:mb-6 flex items-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Pro Flyer Generator</h1>
      </header>
      
      <div className="w-full max-w-7xl mx-auto mb-6">
        <AdSenseBanner
            style={{ minHeight: '100px' }}
            data-ad-client="ca-pub-1234567890123456" // REPLACE WITH YOUR AdSense CLIENT ID
            data-ad-slot="4444444444" // REPLACE WITH YOUR AdSense SLOT ID
        />
      </div>

      <main className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 lg:gap-8">
        <aside className="lg:w-1/3 w-full bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-lg flex flex-col gap-4 h-fit lg:sticky top-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Flyer Editor</h2>
            
            <DetailSection title="Templates" isOpen={!!openSections['Templates']} onToggle={() => handleToggleSection('Templates')} icon={<TemplateIcon className="h-5 w-5 text-blue-600" />}>
                <TemplateGallery templates={templates} onSelect={handleSelectTemplate} isLoading={isTemplateLoading} />
            </DetailSection>

            <DetailSection title="Content" isOpen={!!openSections['Content']} onToggle={() => handleToggleSection('Content')} icon={<ContentIcon className="h-5 w-5 text-blue-600" />}>
                <div className="space-y-4">
                  <TextInput id="hook" label="Hook" value={currentFlyerState.flyerContent.hook} onChange={val => handleContentChange('hook', val)} />
                  <TextInput id="headline" label="Headline" value={currentFlyerState.flyerContent.headline} onChange={val => handleContentChange('headline', val)} />
                  <TextInput id="subheading" label="Subheading" value={currentFlyerState.flyerContent.subheading} onChange={val => handleContentChange('subheading', val)} />
                  <TextInput id="offer" label="Offer" value={currentFlyerState.flyerContent.offer} onChange={val => handleContentChange('offer', val)} />
                  <TextInput id="cta" label="Call to Action" value={currentFlyerState.flyerContent.callToAction} onChange={val => handleContentChange('callToAction', val)} />
                  <TextInput id="website" label="Website URL" value={currentFlyerState.flyerContent.websiteUrl} onChange={val => handleContentChange('websiteUrl', val)} />
                </div>
            </DetailSection>

            <DetailSection title="Design & Layout" isOpen={!!openSections['Design & Layout']} onToggle={() => handleToggleSection('Design & Layout')} icon={<DesignLayoutIcon className="h-5 w-5 text-blue-600" />}>
                 <div className="space-y-4">
                    <SelectInput id="layout" label="Layout Style" value={currentFlyerState.flyerDesign.layoutStyle} onChange={val => handleDesignChange('layoutStyle', val)}>
                        <option value="headline-focus">Headline Focus</option>
                        <option value="image-dominant-cta-bar">Image Dominant</option>
                        <option value="urgent-offer-overlay">Urgent Offer</option>
                    </SelectInput>
                    <SelectInput id="headlineFont" label="Headline Font" value={currentFlyerState.flyerDesign.fontPairing.headlineFont} onChange={val => handleFontChange('headlineFont', val)}>
                        <option value="Poppins">Poppins</option>
                        <option value="Inter">Inter</option>
                        <option value="Oswald">Oswald</option>
                        <option value="Anton">Anton</option>
                        <option value="Playfair Display">Playfair Display</option>
                    </SelectInput>
                    <SelectInput id="bodyFont" label="Body Font" value={currentFlyerState.flyerDesign.fontPairing.bodyFont} onChange={val => handleFontChange('bodyFont', val)}>
                        <option value="Inter">Inter</option>
                        <option value="Roboto Slab">Roboto Slab</option>
                        <option value="Lato">Lato</option>
                    </SelectInput>
                    <TextInput id="badge" label="Badge Text (Optional)" value={currentFlyerState.flyerDesign.badgeText} onChange={val => handleDesignChange('badgeText', val)} />
                    <SelectInput id="ctaAnimation" label="CTA Animation" value={currentFlyerState.flyerDesign.ctaAnimation} onChange={val => handleDesignChange('ctaAnimation', val)}>
                        <option value="none">None</option>
                        <option value="pulse">Pulse</option>
                    </SelectInput>
                </div>
            </DetailSection>
            
            <DetailSection title="Color Palette" isOpen={!!openSections['Color Palette']} onToggle={() => handleToggleSection('Color Palette')} icon={<ColorPaletteIcon className="h-5 w-5 text-blue-600" />}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1"><label className="text-sm font-medium text-gray-600">Primary</label><input type="color" value={currentFlyerState.flyerDesign.colorPalette.primary} onChange={e => handleColorChange('primary', e.target.value)} className="w-full h-10 p-1 bg-white border border-gray-300 rounded-lg cursor-pointer" /></div>
                    <div className="space-y-1"><label className="text-sm font-medium text-gray-600">Secondary</label><input type="color" value={currentFlyerState.flyerDesign.colorPalette.secondary} onChange={e => handleColorChange('secondary', e.target.value)} className="w-full h-10 p-1 bg-white border border-gray-300 rounded-lg cursor-pointer" /></div>
                    <div className="space-y-1"><label className="text-sm font-medium text-gray-600">Accent</label><input type="color" value={currentFlyerState.flyerDesign.colorPalette.accent} onChange={e => handleColorChange('accent', e.target.value)} className="w-full h-10 p-1 bg-white border border-gray-300 rounded-lg cursor-pointer" /></div>
                    <div className="space-y-1"><label className="text-sm font-medium text-gray-600">Text Light</label><input type="color" value={currentFlyerState.flyerDesign.colorPalette.textLight} onChange={e => handleColorChange('textLight', e.target.value)} className="w-full h-10 p-1 bg-white border border-gray-300 rounded-lg cursor-pointer" /></div>
                    <div className="space-y-1"><label className="text-sm font-medium text-gray-600">Bg From</label><input type="color" value={currentFlyerState.flyerDesign.colorPalette.backgroundFrom} onChange={e => handleColorChange('backgroundFrom', e.target.value)} className="w-full h-10 p-1 bg-white border border-gray-300 rounded-lg cursor-pointer" /></div>
                    <div className="space-y-1"><label className="text-sm font-medium text-gray-600">Bg To</label><input type="color" value={currentFlyerState.flyerDesign.colorPalette.backgroundTo} onChange={e => handleColorChange('backgroundTo', e.target.value)} className="w-full h-10 p-1 bg-white border border-gray-300 rounded-lg cursor-pointer" /></div>
                    <div className="space-y-1"><label className="text-sm font-medium text-gray-600">Overlay</label><input type="color" value={currentFlyerState.flyerDesign.colorPalette.overlayColor} onChange={e => handleColorChange('overlayColor', e.target.value)} className="w-full h-10 p-1 bg-white border border-gray-300 rounded-lg cursor-pointer" /></div>
                </div>
                 <div className="mt-4">
                    <label htmlFor="opacity" className="block text-sm font-medium text-gray-600 mb-1.5">Overlay Opacity: {currentFlyerState.flyerDesign.colorPalette.overlayOpacity}</label>
                    <input id="opacity" type="range" min="0" max="1" step="0.05" value={currentFlyerState.flyerDesign.colorPalette.overlayOpacity} onChange={e => handleColorChange('overlayOpacity', parseFloat(e.target.value))} className="w-full" />
                 </div>
            </DetailSection>
            
            <DetailSection title="Background Image" isOpen={!!openSections['Background Image']} onToggle={() => handleToggleSection('Background Image')} icon={<BackgroundImageIcon className="h-5 w-5 text-blue-600" />}>
                 <button
                    onClick={triggerImageUpload}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition border border-gray-300"
                >
                    <UploadIcon className="h-5 w-5" />
                    <span>Upload Image</span>
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                    aria-hidden="true"
                />
            </DetailSection>

            <div className="mt-4">
              <button onClick={handleDownload} disabled={isDownloadingPng} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition disabled:bg-red-400 disabled:cursor-not-allowed">
                  <DownloadIcon className="h-5 w-5" />
                  <span>{isDownloadingPng ? 'Downloading...' : 'Download as PNG'}</span>
              </button>
            </div>

           <AdSenseBanner
              className="mt-6 w-full"
              style={{ minHeight: '250px' }}
              data-ad-client="ca-pub-1234567890123456" // REPLACE WITH YOUR AdSense CLIENT ID
              data-ad-slot="1111111111" // REPLACE WITH YOUR AdSense SLOT ID
            />
        </aside>

        {/* Right Panel: Preview */}
        <section className="lg:w-2/3 w-full flex flex-col items-center gap-4 lg:gap-6">
            <div className="w-full bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-2 sm:p-3 shadow-lg flex flex-wrap justify-center items-center gap-2">
                <h3 className="font-bold text-gray-700 mr-4">Formats</h3>
                {(['1:1', '9:16', '16:9'] as AspectRatio[]).map((ratio) => (
                    <button
                        key={ratio}
                        onClick={() => handleAspectRatioChange(ratio)}
                        className={`px-4 py-2 text-sm font-bold rounded-lg transition ${ activeAspectRatio === ratio ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}
                        aria-pressed={activeAspectRatio === ratio}
                    >
                        {formatLabels[ratio]}
                    </button>
                ))}
            </div>

            <div className="w-full flex justify-center items-start pt-4">
                <Flyer ref={flyerRef} aspectRatio={currentFlyerState.aspectRatio} backgroundMedia={currentFlyerState.backgroundMedia} content={currentFlyerState.flyerContent} design={currentFlyerState.flyerDesign} />
            </div>
            
            <div className="w-full max-w-2xl mt-6">
                <AdSenseBanner
                    style={{ minHeight: '250px' }}
                    data-ad-client="ca-pub-1234567890123456" // REPLACE WITH YOUR AdSense CLIENT ID
                    data-ad-slot="2222222222" // REPLACE WITH YOUR AdSense SLOT ID
                />
            </div>
        </section>
      </main>

      {/* --- Pre-Footer Ad Slot --- */}
      <div className="w-full max-w-7xl mx-auto mt-8">
        <AdSenseBanner
            style={{ minHeight: '100px' }}
            data-ad-client="ca-pub-1234567890123456" // REPLACE WITH YOUR AdSense CLIENT ID
            data-ad-slot="3333333333" // REPLACE WITH YOUR AdSense SLOT ID
        />
      </div>

      <footer className="w-full max-w-7xl mx-auto mt-8 text-center text-gray-600 text-sm py-4">
        <div className="flex justify-center items-center gap-4 sm:gap-6 flex-wrap">
            <button onClick={() => setIsAboutModalOpen(true)} className="hover:text-blue-600 underline">About</button>
            <a href="https://www.achdouzcompanyllc.com/support" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 underline">Support</a>
            <button onClick={() => setIsPrivacyModalOpen(true)} className="hover:text-blue-600 underline">Privacy Policy</button>
            <button onClick={() => setIsTermsModalOpen(true)} className="hover:text-blue-600 underline">Terms and Conditions</button>
        </div>
        <p className="mt-4">&copy; 2025 Pro Flyer Generator. All Rights Reserved.</p>
        <p className="mt-1">Developed by Achdouz Company LLC.</p>
      </footer>
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
      <PrivacyPolicyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
      <TermsAndConditionsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
    </div>
  );
};

export default App;