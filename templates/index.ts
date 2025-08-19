import { FlyerContent, FlyerDesign } from '../components/Flyer';

export interface Template {
    name: string;
    thumbnailUrl: string;
    flyerContent: FlyerContent;
    flyerDesign: FlyerDesign;
    backgroundImageUrl?: string;
}

export const templates: Template[] = [
    {
        name: 'Corporate Tech',
        thumbnailUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
        backgroundImageUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        flyerContent: {
            hook: "FUTURE-PROOF YOUR BUSINESS",
            headline: "INNOVATE & ELEVATE",
            subheading: "Next-Gen Solutions for a Digital-First World",
            offer: "Schedule a free consultation to discover how our AI-driven strategies can boost your ROI by up to 300%.",
            callToAction: "BOOK A DEMO",
            websiteUrl: "https://example.com/tech",
        },
        flyerDesign: {
            themeName: "Corporate Tech",
            colorPalette: {
                backgroundFrom: '#010418',
                backgroundTo: '#0F172A',
                primary: '#38BDF8', // Sky Blue
                secondary: '#E2E8F0', // Slate
                accent: '#4F46E5', // Indigo
                textLight: '#FFFFFF',
                overlayColor: '#020617',
                overlayOpacity: 0.8,
            },
            fontPairing: {
                headlineFont: 'Poppins',
                bodyFont: 'Inter',
            },
            layoutStyle: 'headline-focus',
            badgeText: 'NEW',
            ctaAnimation: 'none',
        }
    },
    {
        name: 'Restaurant Special',
        thumbnailUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
        backgroundImageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        flyerContent: {
            hook: "A TASTE OF HEAVEN",
            headline: "GOURMET BURGER NIGHT",
            subheading: "Every Friday - All You Can Eat!",
            offer: "Featuring our signature Wagyu beef burger, truffle fries, and a craft beer. You don't want to miss this!",
            callToAction: "RESERVE YOUR TABLE",
            websiteUrl: "https://example.com/restaurant",
        },
        flyerDesign: {
            themeName: "Restaurant Special",
            colorPalette: {
                backgroundFrom: '#281A14',
                backgroundTo: '#4B3F38',
                primary: '#F59E0B', // Amber
                secondary: '#FFFFFF',
                accent: '#DC2626', // Red
                textLight: '#FFFFFF',
                overlayColor: '#000000',
                overlayOpacity: 0.65,
            },
            fontPairing: {
                headlineFont: 'Playfair Display',
                bodyFont: 'Lato',
            },
            layoutStyle: 'image-dominant-cta-bar',
            badgeText: "HOT DEAL",
            ctaAnimation: 'pulse',
        }
    },
    {
        name: 'Flash Sale',
        thumbnailUrl: 'https://images.pexels.com/photos/7130469/pexels-photo-7130469.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
        backgroundImageUrl: 'https://images.pexels.com/photos/7130469/pexels-photo-7130469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        flyerContent: {
            hook: "DON'T BLINK OR IT'S GONE",
            headline: "50% OFF FLASH SALE",
            subheading: "24 Hours Only! Everything Must Go!",
            offer: "Get half off our entire collection of summer fashion. The biggest sale of the year is here, but not for long.",
            callToAction: "SHOP NOW",
            websiteUrl: "https://example.com/sale",
        },
        flyerDesign: {
            themeName: "Flash Sale",
            colorPalette: {
                backgroundFrom: '#111827',
                backgroundTo: '#000000',
                primary: '#FBBF24', // Amber 400
                secondary: '#FFFFFF',
                accent: '#EF4444', // Red 500
                textLight: '#FFFFFF',
                overlayColor: '#111827',
                overlayOpacity: 0.4,
            },
            fontPairing: {
                headlineFont: 'Anton',
                bodyFont: 'Inter',
            },
            layoutStyle: 'urgent-offer-overlay',
            badgeText: 'ENDS SOON',
            ctaAnimation: 'pulse',
        }
    },
    {
        name: 'Fitness Challenge',
        thumbnailUrl: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
        backgroundImageUrl: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        flyerContent: {
            hook: "UNLEASH YOUR POTENTIAL",
            headline: "SUMMER SHRED",
            subheading: "Join Our 8-Week Transformation Challenge",
            offer: "Sign up now and get a personalized meal plan and weekly check-ins with our expert trainers for FREE.",
            callToAction: "JOIN THE CHALLENGE",
            websiteUrl: "https://example.com/fitness",
        },
        flyerDesign: {
            themeName: "Fitness Challenge",
            colorPalette: {
                backgroundFrom: '#000000',
                backgroundTo: '#1F2937',
                primary: '#FBBF24',
                secondary: '#FFFFFF',
                accent: '#BEF264',
                textLight: '#FFFFFF',
                overlayColor: '#000000',
                overlayOpacity: 0.7,
            },
            fontPairing: {
                headlineFont: 'Anton',
                bodyFont: 'Inter',
            },
            layoutStyle: 'headline-focus',
            badgeText: "LIMITED SPOTS",
            ctaAnimation: 'pulse',
        }
    },
    {
        name: 'Luxury Real Estate',
        thumbnailUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
        backgroundImageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        flyerContent: {
            hook: "YOUR FOREVER HOME AWAITS",
            headline: "LUXURY LIVING",
            subheading: "Stunning 4-Bed Villa with Ocean Views",
            offer: "Open house this Sunday from 2-4 PM. Experience elegance and comfort in the prestigious North Shore.",
            callToAction: "SCHEDULE A VIEWING",
            websiteUrl: "https://example.com/realestate",
        },
        flyerDesign: {
            themeName: "Luxury Real Estate",
            colorPalette: {
                backgroundFrom: '#262D3D',
                backgroundTo: '#4A5568',
                primary: '#D4AF37',
                secondary: '#F7FAFC',
                accent: '#2C5282',
                textLight: '#EDF2F7',
                overlayColor: '#1A202C',
                overlayOpacity: 0.5,
            },
            fontPairing: {
                headlineFont: 'Playfair Display',
                bodyFont: 'Lato',
            },
            layoutStyle: 'image-dominant-cta-bar',
            badgeText: 'JUST LISTED',
            ctaAnimation: 'none',
        }
    },
    {
        name: 'Elegant Skincare',
        thumbnailUrl: 'https://images.pexels.com/photos/3985353/pexels-photo-3985353.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
        backgroundImageUrl: 'https://images.pexels.com/photos/3985353/pexels-photo-3985353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        flyerContent: {
            hook: "PURE, RADIANT, YOU.",
            headline: "GLOW SERUM",
            subheading: "Hydrate and Rejuvenate with Hyaluronic Acid",
            offer: "Launch special! Get 20% off your first order and a free silk beauty mask. Your skin will thank you.",
            callToAction: "SHOP THE GLOW",
            websiteUrl: "https://example.com/beauty",
        },
        flyerDesign: {
            themeName: "Elegant Beauty",
            colorPalette: {
                backgroundFrom: '#2d2d2d',
                backgroundTo: '#1a1a1a',
                primary: '#EAD7D7',
                secondary: '#BDBDBD',
                accent: '#A98B8B',
                textLight: '#F5F5F5',
                overlayColor: '#000000',
                overlayOpacity: 0.5,
            },
            fontPairing: {
                headlineFont: 'Playfair Display',
                bodyFont: 'Lato',
            },
            layoutStyle: 'headline-focus',
            badgeText: 'ALL NATURAL',
            ctaAnimation: 'none',
        }
    },
    {
        name: 'Financial Advisor',
        thumbnailUrl: 'https://images.pexels.com/photos/8353802/pexels-photo-8353802.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
        backgroundImageUrl: 'https://images.pexels.com/photos/8353802/pexels-photo-8353802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        flyerContent: {
            hook: "BUILD YOUR WEALTH",
            headline: "EXPERT FINANCIAL PLANNING",
            subheading: "Secure Your Tomorrow, Today.",
            offer: "Book a complimentary consultation and receive a personalized investment strategy.",
            callToAction: "GET YOUR FREE PLAN",
            websiteUrl: "https://example.com/finance",
        },
        flyerDesign: {
            themeName: "Financial Advisor",
            colorPalette: {
                backgroundFrom: '#101827',
                backgroundTo: '#05070E',
                primary: '#D69E2E', // Gold/Brass
                secondary: '#E2E8F0',
                accent: '#2C5282', // Dark Blue
                textLight: '#FFFFFF',
                overlayColor: '#000000',
                overlayOpacity: 0.75,
            },
            fontPairing: {
                headlineFont: 'Playfair Display',
                bodyFont: 'Lato',
            },
            layoutStyle: 'headline-focus',
            badgeText: 'TRUSTED',
            ctaAnimation: 'none',
        }
    },
    {
        name: 'Healthcare Clinic',
        thumbnailUrl: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
        backgroundImageUrl: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        flyerContent: {
            hook: "YOUR HEALTH IS OUR PRIORITY",
            headline: "COMPASSIONATE CARE",
            subheading: "Modern Medicine, Timeless Compassion",
            offer: "Now accepting new patients. Book your annual check-up online and experience healthcare that cares.",
            callToAction: "BOOK APPOINTMENT",
            websiteUrl: "https://example.com/clinic",
        },
        flyerDesign: {
            themeName: "Healthcare Clinic",
            colorPalette: {
                backgroundFrom: '#0A1D37', // Deep blue
                backgroundTo: '#1C3A5E',
                primary: '#63B3ED', // Light Blue
                secondary: '#E2E8F0', // Light Gray/White
                accent: '#4FD1C5', // Teal
                textLight: '#FFFFFF',
                overlayColor: '#0A1D37',
                overlayOpacity: 0.7,
            },
            fontPairing: {
                headlineFont: 'Poppins',
                bodyFont: 'Inter',
            },
            layoutStyle: 'headline-focus',
            badgeText: 'NEW PATIENTS',
            ctaAnimation: 'none',
        }
    },
    {
        name: 'Podcast Launch',
        thumbnailUrl: 'https://images.pexels.com/photos/3756774/pexels-photo-3756774.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
        backgroundImageUrl: 'https://images.pexels.com/photos/3756774/pexels-photo-3756774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        flyerContent: {
            hook: "TUNE IN NOW",
            headline: "THE CREATIVE SPARK",
            subheading: "Episode 25: The Future of Digital Art",
            offer: "Join us as we talk with visionary artist @PixelPioneer about AI, NFTs, and the next wave of creativity.",
            callToAction: "LISTEN ON SPOTIFY",
            websiteUrl: "https://example.com/podcast",
        },
        flyerDesign: {
            themeName: "Podcast Launch",
            colorPalette: {
                backgroundFrom: '#000000',
                backgroundTo: '#120428', // Deep Purple
                primary: '#C026D3', // Fuchsia/Neon Pink
                secondary: '#FFFFFF',
                accent: '#4F46E5', // Indigo
                textLight: '#E5E7EB', // Gray 200
                overlayColor: '#000000',
                overlayOpacity: 0.6,
            },
            fontPairing: {
                headlineFont: 'Oswald',
                bodyFont: 'Inter',
            },
            layoutStyle: 'urgent-offer-overlay',
            badgeText: 'NEW EPISODE',
            ctaAnimation: 'pulse',
        }
    },
    {
        name: 'Digital Masterclass',
        thumbnailUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
        backgroundImageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        flyerContent: {
            hook: "UNLOCK YOUR POTENTIAL",
            headline: "FREE WEBINAR",
            subheading: "The Art of Digital Marketing in 2025",
            offer: "Join industry expert Jane Doe and learn the secrets to viral growth. Limited spots available!",
            callToAction: "SAVE MY SEAT",
            websiteUrl: "https://example.com/webinar",
        },
        flyerDesign: {
            themeName: "Digital Masterclass",
            colorPalette: {
                backgroundFrom: '#ffffff',
                backgroundTo: '#f0f4f8',
                primary: '#1E40AF', // Deep Blue
                secondary: '#334155', // Slate Gray
                accent: '#F59E0B', // Amber
                textLight: '#1E3A8A', // Using a dark text color for light background
                overlayColor: '#ffffff',
                overlayOpacity: 0.1,
            },
            fontPairing: {
                headlineFont: 'Poppins',
                bodyFont: 'Inter',
            },
            layoutStyle: 'headline-focus',
            badgeText: 'LIVE SOON',
            ctaAnimation: 'none',
        }
    },
    {
        name: 'Artisan Coffee',
        thumbnailUrl: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
        backgroundImageUrl: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        flyerContent: {
            hook: "YOUR DAILY RITUAL, PERFECTED",
            headline: "HAPPY HOUR COFFEE",
            subheading: "Buy One, Get One Free from 2-4 PM",
            offer: "Escape the afternoon slump with our expertly crafted espresso drinks and seasonal blends.",
            callToAction: "VISIT US TODAY",
            websiteUrl: "https://example.com/cafe",
        },
        flyerDesign: {
            themeName: "Artisan Coffee",
            colorPalette: {
                backgroundFrom: '#4E423A',
                backgroundTo: '#2B211C',
                primary: '#D1C0A8', // Light Beige
                secondary: '#FFFFFF',
                accent: '#A16207', // Darker Gold/Brown
                textLight: '#FFFFFF',
                overlayColor: '#000000',
                overlayOpacity: 0.6,
            },
            fontPairing: {
                headlineFont: 'Playfair Display',
                bodyFont: 'Lato',
            },
            layoutStyle: 'image-dominant-cta-bar',
            badgeText: 'DAILY DEAL',
            ctaAnimation: 'none',
        }
    },
    {
        name: "We're Hiring",
        thumbnailUrl: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
        backgroundImageUrl: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        flyerContent: {
            hook: "READY FOR YOUR NEXT CHALLENGE?",
            headline: "JOIN OUR TEAM",
            subheading: "Now Hiring: Senior UX Designer",
            offer: "We're looking for a passionate designer to help us build the future. Competitive salary, remote options, and great benefits.",
            callToAction: "APPLY NOW",
            websiteUrl: "https://example.com/careers",
        },
        flyerDesign: {
            themeName: "We're Hiring",
            colorPalette: {
                backgroundFrom: '#0A1D37',
                backgroundTo: '#1C3A5E',
                primary: '#FFFFFF',
                secondary: '#A0AEC0',
                accent: '#3182CE', // Blue
                textLight: '#FFFFFF',
                overlayColor: '#0A1D37',
                overlayOpacity: 0.85,
            },
            fontPairing: {
                headlineFont: 'Poppins',
                bodyFont: 'Inter',
            },
            layoutStyle: 'headline-focus',
            badgeText: 'REMOTE OK',
            ctaAnimation: 'none',
        }
    },
    {
        name: 'Yoga & Wellness',
        thumbnailUrl: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
        backgroundImageUrl: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        flyerContent: {
            hook: "FIND YOUR INNER PEACE",
            headline: "SUNRISE YOGA",
            subheading: "Reconnect with Your Mind & Body",
            offer: "Join our morning wellness sessions and start your day with intention. Your first class is on us!",
            callToAction: "BOOK MY FREE CLASS",
            websiteUrl: "https://example.com/yoga",
        },
        flyerDesign: {
            themeName: "Yoga & Wellness",
            colorPalette: {
                backgroundFrom: '#2d2d2d',
                backgroundTo: '#1a1a1a',
                primary: '#A7F3D0', // Mint Green
                secondary: '#E5E7EB',
                accent: '#FBCFE8', // Light Pink
                textLight: '#FFFFFF',
                overlayColor: '#1F2937',
                overlayOpacity: 0.7,
            },
            fontPairing: {
                headlineFont: 'Playfair Display',
                bodyFont: 'Lato',
            },
            layoutStyle: 'headline-focus',
            badgeText: 'NEW MEMBERS',
            ctaAnimation: 'none',
        }
    },
    {
        name: 'Black Friday Blowout',
        thumbnailUrl: 'https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
        backgroundImageUrl: 'https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        flyerContent: {
            hook: "THE SALE YOU'VE WAITED FOR",
            headline: "BLACK FRIDAY",
            subheading: "UP TO 75% OFF EVERYTHING!",
            offer: "This is our biggest sale of the year. Deals this good won't last long. Shop now before it's all gone!",
            callToAction: "SHOP THE SALE",
            websiteUrl: "https://example.com/blackfriday",
        },
        flyerDesign: {
            themeName: "Black Friday Blowout",
            colorPalette: {
                backgroundFrom: '#000000',
                backgroundTo: '#111111',
                primary: '#FDE047', // Yellow
                secondary: '#FFFFFF',
                accent: '#EC4899', // Pink
                textLight: '#FFFFFF',
                overlayColor: '#000000',
                overlayOpacity: 0.3,
            },
            fontPairing: {
                headlineFont: 'Anton',
                bodyFont: 'Inter',
            },
            layoutStyle: 'urgent-offer-overlay',
            badgeText: 'DOORBUSTER',
            ctaAnimation: 'pulse',
        }
    }
];