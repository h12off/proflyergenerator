import React from 'react';
import { CloseIcon, CheckIcon, CrownIcon } from './Icons';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FeatureListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-center gap-3">
        <CheckIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
        <span className="text-gray-300">{children}</span>
    </li>
);

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="upgrade-modal-title"
        >
            <div
                className="bg-gray-800 border border-yellow-500/50 text-gray-300 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 sm:p-8 m-4 relative transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition"
                    aria-label="Close modal"
                >
                    <CloseIcon className="h-6 w-6" />
                </button>

                <div className="text-center">
                    <CrownIcon className="mx-auto h-12 w-12 text-yellow-400" />
                    <h2 id="upgrade-modal-title" className="mt-4 text-2xl sm:text-3xl font-bold text-white">
                        Upgrade to Pro
                    </h2>
                    <p className="mt-2 text-gray-400">Unlock all features and create without limits.</p>
                </div>

                <ul className="space-y-4 my-8 text-left">
                    <FeatureListItem><strong>Unlimited</strong> High-Resolution PNG Downloads</FeatureListItem>
                    <FeatureListItem><strong>No Watermark</strong> on Your Designs</FeatureListItem>
                    <FeatureListItem>Access to <strong>Exclusive Pro Templates</strong></FeatureListItem>
                    <FeatureListItem><strong>Priority Support</strong> from our Team</FeatureListItem>
                </ul>

                <button
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition shadow-lg text-lg transform hover:scale-105"
                >
                    Upgrade Now - $22/mo
                </button>
            </div>
        </div>
    );
};

export default UpgradeModal;
