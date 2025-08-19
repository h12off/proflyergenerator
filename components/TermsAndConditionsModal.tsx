import React from 'react';
import { CloseIcon } from './Icons';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TermsAndConditionsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="terms-and-conditions-title"
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
                    <h2 id="terms-and-conditions-title" className="text-2xl sm:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-3 mb-4">
                        Terms and Conditions
                    </h2>
                    <p><strong>Last Updated:</strong> October 26, 2025</p>

                    <h3 className="text-xl font-bold text-gray-800">1. Agreement to Terms</h3>
                    <p>By using the Pro Flyer Generator ("Service"), you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access the Service.</p>

                    <h3 className="text-xl font-bold text-gray-800">2. Use of the Service</h3>
                    <p>You agree to use the Service only for lawful purposes. You are responsible for all content you create, including text and images you upload. You must ensure you have the necessary rights and permissions for any content you use.</p>
                    <p>You agree not to use the Service to create content that is:</p>
                    <ul>
                        <li>Illegal, harmful, threatening, or defamatory.</li>
                        <li>Infringing on intellectual property rights.</li>
                        <li>Otherwise objectionable.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-800">3. User-Generated Content</h3>
                    <p>You retain full ownership of the content you create with the Service ("User Content"). By using the Service, you grant us no rights to your User Content. All processing and storage occur on your local device.</p>

                    <h3 className="text-xl font-bold text-gray-800">4. Intellectual Property</h3>
                    <p>The Service and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of Achdouz Company LLC and its licensors. The Service is protected by copyright, trademark, and other laws.</p>

                    <h3 className="text-xl font-bold text-gray-800">5. Disclaimer</h3>
                    <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We do not warrant that the Service will be uninterrupted, secure, or error-free.</p>

                    <h3 className="text-xl font-bold text-gray-800">6. Limitation of Liability</h3>
                    <p>In no event shall Achdouz Company LLC, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

                    <h3 className="text-xl font-bold text-gray-800">7. Changes to Terms</h3>
                    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms and Conditions on this page.</p>

                    <h3 className="text-xl font-bold text-gray-800">8. Contact Us</h3>
                    <p>If you have any questions about these Terms, please contact us via our <a href="https://www.achdouzcompanyllc.com/support" target="_blank" rel="noopener noreferrer">Support page</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditionsModal;
