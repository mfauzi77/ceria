import React, { useState, useMemo } from 'react';
import { ArrowPathIcon, HandThumbUpIcon, HandThumbDownIcon } from '../icons/Icons';
import FeedbackModal from './FeedbackModal';

interface InsightContainerProps {
    title: string;
    icon: React.ReactNode;
    isLoading: boolean;
    content: string | null;
    error: string | null;
    onRegenerate: (feedback?: string) => void;
    loadingText?: string;
}

const InsightContainer: React.FC<InsightContainerProps> = ({
    title,
    icon,
    isLoading,
    content,
    error,
    onRegenerate,
    loadingText = "Generating insight...",
}) => {

    const [feedback, setFeedback] = useState<'good' | 'bad' | null>(null);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

    const parsedContent = useMemo(() => {
        if (!content) return { insight: '', justification: '' };
        const parts = content.split('### Dasar Analisis');
        return {
            insight: parts[0] || '',
            justification: parts[1] || '',
        };
    }, [content]);

    const handleFeedbackSubmit = (feedbackText: string) => {
        // In a real app, this feedbackText would be passed to the onRegenerate function
        console.log("Regenerating with feedback:", feedbackText);
        onRegenerate(feedbackText);
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-full w-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mr-4"></div>
                    <p className="text-gray-600 text-sm">{loadingText}</p>
                </div>
            );
        }

        if (error) {
            return <p className="text-red-500 text-center">{error}</p>;
        }

        if (parsedContent.insight) {
            return (
                 <div className="w-full">
                    <div 
                        className="prose prose-sm max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ __html: parsedContent.insight.replace(/\n/g, '<br />') }} 
                    />
                    {parsedContent.justification && (
                        <div className="mt-4 pt-4 border-t border-dashed border-slate-300">
                             <h4 className="font-bold text-sm text-slate-600 mb-2">Dasar Analisis</h4>
                             <div 
                                className="prose prose-sm max-w-none text-slate-600"
                                dangerouslySetInnerHTML={{ __html: parsedContent.justification.replace(/\n/g, '<br />') }} 
                            />
                        </div>
                    )}
                </div>
            );
        }

        return null;
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center">
                    {icon}
                    {title}
                </h3>
                <button 
                    onClick={() => onRegenerate()}
                    disabled={isLoading}
                    className="flex items-center px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Regenerate insight"
                >
                    <ArrowPathIcon className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Regenerate
                </button>
            </div>
            <div className="p-4 bg-slate-50 rounded-md min-h-[10rem] flex">
                {renderContent()}
            </div>
            {!isLoading && !error && content && (
                 <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-end gap-4">
                    <span className="text-sm text-slate-600">Apakah ini membantu?</span>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setFeedback('good')} 
                            className={`p-2 rounded-full transition-colors ${feedback === 'good' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                            aria-label="Insight was helpful"
                        >
                            <HandThumbUpIcon className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => { setFeedback('bad'); setIsFeedbackModalOpen(true); }}
                            className={`p-2 rounded-full transition-colors ${feedback === 'bad' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                             aria-label="Insight was not helpful"
                        >
                            <HandThumbDownIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
            <FeedbackModal
                isOpen={isFeedbackModalOpen}
                onClose={() => setIsFeedbackModalOpen(false)}
                onSubmit={handleFeedbackSubmit}
            />
        </div>
    );
};

export default InsightContainer;