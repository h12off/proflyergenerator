import React from 'react';
import { CloseIcon } from './Icons';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-modal-title"
        >
            <div
                className="bg-white text-gray-700 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 sm:p-8 m-4 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
                    aria-label="Close modal"
                >
                    <CloseIcon className="h-6 w-6" />
                </button>

                <div className="prose prose-sm sm:prose-base max-w-none space-y-6">
                    <h2 id="about-modal-title" className="text-2xl sm:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-3 mb-6">
                        What is Pro Flyer Generator?
                    </h2>
                    <p>
                        Pro Flyer Generator is an innovative design tool built to help businesses, entrepreneurs, and social media creators instantly create professional, eye-catching flyers in just minutes—no graphic design skills required.
                    </p>
                    <p>
                        Whether you’re promoting a new product, restaurant special, event, sale, or social media campaign, Pro Flyer Generator makes it easy to stand out and attract attention.
                    </p>

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 pt-4">Why Choose Pro Flyer Generator?</h3>
                    <ul className="space-y-2">
                        <li>✅ <strong>Time-Saving</strong> – Generate stunning flyers in minutes instead of hours.</li>
                        <li>✅ <strong>Professional Designs</strong> – Modern, high-quality templates tailored for every industry.</li>
                        <li>✅ <strong>Easy Customization</strong> – Add your own text, images, logos, and brand colors.</li>
                        <li>✅ <strong>Business & Social Media Ready</strong> – Export flyers in formats optimized for printing, Instagram, Facebook, TikTok, and more.</li>
                        <li>✅ <strong>Affordable & Accessible</strong> – Designed for small businesses, startups, and creators who want maximum impact without high design costs.</li>
                    </ul>

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 pt-4">Who Can Benefit?</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Small & Local Businesses</strong> – Restaurants, salons, gyms, shops, and more.</li>
                        <li><strong>Entrepreneurs & Startups</strong> – Quick promotions and launch campaigns.</li>
                        <li><strong>Social Media Influencers & Marketers</strong> – Engaging posts and stories that boost reach.</li>
                        <li><strong>Event Planners</strong> – Weddings, concerts, parties, and community events.</li>
                    </ul>

                    <div className="border-t border-gray-200 my-6"></div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 pt-4">Turn Flyers Into Clients</h2>
                     <p>
                        Pro Flyer Generator is more than a flyer maker—it’s a client generator.
                    </p>
                     <p>
                        With ready-to-use designs optimized for Facebook Ads, Instagram promotions, Google Ads, and print marketing, you can instantly create campaigns that attract attention, generate leads, and bring in real customers.
                    </p>

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 pt-4">Why Businesses Love It</h3>
                     <ul className="space-y-2">
                        <li>✅ <strong>Ad-Ready Flyers</strong> – Perfect sizes for Facebook, Instagram, TikTok, and more.</li>
                        <li>✅ <strong>Lead-Generating Designs</strong> – Flyers built to convert views into clients.</li>
                        <li>✅ <strong>Easy to Launch Ads</strong> – Export your flyer and upload it directly to your ad campaign.</li>
                        <li>✅ <strong>All-in-One Solution</strong> – One tool for social media, digital marketing, and print promotions.</li>
                    </ul>

                    <p className="text-center font-semibold text-lg pt-6">
                        ✨ With Pro Flyer Generator, every flyer becomes an opportunity to sell more, grow faster, and win new clients.
                    </p>
                    <p className="text-center font-semibold text-lg">
                        ✨ With Pro Flyer Generator, you don’t just create flyers—you create attention, growth, and results.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutModal;