import React from 'react';
import { CloseIcon } from './Icons';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PrivacyPolicyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-policy-title"
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
                <div className="prose prose-sm sm:prose-base max-w-none space-y-4">
                    <h2 id="privacy-policy-title" className="text-2xl sm:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-3 mb-4">
                        Privacy Policy
                    </h2>
                    <p><strong>Last Updated:</strong> October 26, 2025</p>

                    <h3 className="text-xl font-bold text-gray-800">1. Introduction</h3>
                    <p>Welcome to Pro Flyer Generator. This Privacy Policy explains how we handle your information. Our service is designed to operate primarily on your local device, minimizing data collection.</p>

                    <h3 className="text-xl font-bold text-gray-800">2. Information We Collect</h3>
                    <p>Because Pro Flyer Generator runs in your browser, your data is stored locally:</p>
                    <ul>
                        <li><strong>Content You Provide:</strong> All text, images, and design choices you input into the flyer are stored in your browser's <strong>localStorage</strong> and <strong>IndexedDB</strong>. This data does not leave your computer. We do not have access to it.</li>
                        <li><strong>Usage Data:</strong> We do not collect analytics or personal usage data.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-800">3. How We Use Your Information</h3>
                    <p>The information stored locally is used solely to provide the application's functionality, such as saving your work between sessions so you don't lose progress.</p>
                    
                    <h3 className="text-xl font-bold text-gray-800">4. Third-Party Services</h3>
                    <p>We use third-party services that may collect information:</p>
                    <ul>
                        <li><strong>Google AdSense:</strong> We use Google AdSense to display ads. Google may use cookies to serve ads based on a user's prior visits to this and other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google's Ads Settings</a>.</li>
                        <li><strong>Google Fonts:</strong> We use Google Fonts to display typefaces. Google may collect usage data as described in their privacy policy.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-800">5. Data Security</h3>
                    <p>Your flyer data is as secure as your own computer because it is stored locally. We have no access to it, and it is not transmitted to our servers.</p>

                    <h3 className="text-xl font-bold text-gray-800">6. Your Rights</h3>
                    <p>You have full control over your data. You can clear your browser's cache, localStorage, and IndexedDB at any time to permanently delete all your saved flyer data.</p>
                    
                    <h3 className="text-xl font-bold text-gray-800">7. Changes to This Policy</h3>
                    <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                    
                    <h3 className="text-xl font-bold text-gray-800">8. Contact Us</h3>
                    <p>If you have any questions about this Privacy Policy, please contact us via our <a href="https://www.achdouzcompanyllc.com/support" target="_blank" rel="noopener noreferrer">Support page</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyModal;