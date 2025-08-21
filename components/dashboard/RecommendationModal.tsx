
import React, { useState, useEffect } from 'react';
import { getSmartRecommendations } from '../../services/geminiService';
import { ActiveAlertData } from '../../types';
import { LightBulbIcon } from '../icons/Icons';

interface RecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  alert: ActiveAlertData;
  onCreatePlan: (alert: ActiveAlertData) => void;
}

const RecommendationModal: React.FC<RecommendationModalProps> = ({ isOpen, onClose, alert, onCreatePlan }) => {
  const [recommendations, setRecommendations] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const fetchRecommendations = async (feedback?: string) => {
      setIsLoading(true);
      setError(null);
      setRecommendations('');
      try {
          // In a real app, the 'alert' object would be augmented with the feedback string
          const result = await getSmartRecommendations(alert);
          setRecommendations(result);
      } catch (err) {
          setError('Gagal memuat rekomendasi. Silakan coba lagi.');
          console.error(err);
      } finally {
          setIsLoading(false);
      }
  };


  useEffect(() => {
    if (isOpen) {
      setShowFeedback(false);
      setFeedbackText('');
      fetchRecommendations();
    }
  }, [isOpen, alert]);

  if (!isOpen) {
    return null;
  }

  const handleCreatePlan = () => {
    onCreatePlan(alert);
    onClose();
  }

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedbackText); // In real app, send this to backend/AI
    setShowFeedback(false);
    // Optionally, refetch recommendations with new feedback context
    fetchRecommendations(feedbackText);
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 p-6 md:p-8 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
            <div className="flex items-center">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <LightBulbIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                    <h3 className="text-lg leading-6 font-bold text-gray-900" id="modal-title">
                        Rekomendasi Intervensi CERIA
                    </h3>
                     <p className="text-sm text-gray-500">{alert.title} - {alert.region}</p>
                </div>
            </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>

        <div className="mt-6">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-gray-600">Menganalisis data dan menghasilkan rekomendasi...</p>
            </div>
          )}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {recommendations && (
            <div className="prose prose-sm max-w-none text-gray-700 bg-slate-50 p-4 rounded-md">
              <div dangerouslySetInnerHTML={{ __html: recommendations.replace(/\n/g, '<br />') }} />
            </div>
          )}
        </div>

        <div className="mt-4">
            {!showFeedback ? (
                 <button onClick={() => setShowFeedback(true)} className="text-xs text-slate-500 hover:text-indigo-600 hover:underline">
                    Saran tidak sesuai? Berikan masukan untuk analisis ulang.
                </button>
            ) : (
                <form onSubmit={handleFeedbackSubmit} className="mt-2 p-3 bg-slate-100 rounded-md">
                    <label htmlFor="feedback" className="block text-sm font-medium text-slate-700">Apa yang membuat analisis ini kurang tepat?</label>
                    <textarea 
                        id="feedback"
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        rows={2}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                        placeholder="Contoh: Intervensi ini tidak cocok untuk daerah pesisir..."
                    />
                    <div className="flex justify-end gap-2 mt-2">
                         <button type="button" onClick={() => setShowFeedback(false)} className="px-3 py-1 text-xs font-semibold text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50">Batal</button>
                         <button type="submit" className="px-3 py-1 text-xs font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700">Kirim & Analisis Ulang</button>
                    </div>
                </form>
            )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row-reverse gap-3 sm:gap-0 sm:justify-start">
            <button
                type="button"
                onClick={handleCreatePlan}
                className="w-full sm:w-auto sm:ml-3 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Buat Rencana Intervensi
            </button>
            <button
                type="button"
                className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={onClose}
            >
                Tutup
            </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationModal;