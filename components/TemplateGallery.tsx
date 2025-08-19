import React from 'react';
import { Template } from '../templates';

interface TemplateGalleryProps {
    templates: Template[];
    onSelect: (template: Template) => void;
    isLoading: boolean;
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ templates, onSelect, isLoading }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {templates.map((template) => (
                <button
                    key={template.name}
                    onClick={() => onSelect(template)}
                    disabled={isLoading}
                    className="aspect-square bg-gray-100 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500 group transition disabled:opacity-50 disabled:cursor-wait"
                    aria-label={`Select ${template.name} template`}
                >
                    <img
                        src={template.thumbnailUrl}
                        alt={template.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </button>
            ))}
        </div>
    );
};

export default TemplateGallery;