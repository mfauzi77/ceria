
import React, { useState, useEffect } from 'react';
import { ArrowRightIcon } from './icons/Icons';

interface WelcomeScreenProps {
    onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
    const [phase, setPhase] = useState('entering'); // 'entering', 'exiting', 'exited'

    useEffect(() => {
        // This effect only runs once on mount to trigger the entrance animations.
        const enterTimeout = requestAnimationFrame(() => setPhase('entered'));
        return () => cancelAnimationFrame(enterTimeout);
    }, []);
    
    const handleStartClick = () => {
        setPhase('exiting');
        // The onComplete callback is triggered after the fade-out animation duration.
        setTimeout(onComplete, 800); 
    };

    const isVisible = phase === 'entered' || phase === 'exiting';
    const isExiting = phase === 'exiting';

    return (
        <div 
            className={`fixed inset-0 bg-white flex flex-col items-center justify-center z-50 transition-opacity duration-700 ease-in-out ${isExiting ? 'opacity-0' : 'opacity-100'}`}
            aria-label="Welcome Screen"
            role="dialog"
        >
            <div 
                className={`transition-all duration-1000 ease-out delay-200 ${isVisible && !isExiting ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Seal_of_the_Coordinating_Ministry_of_Human_Developments_and_Culture_of_the_Republic_of_Indonesia.svg"
                    alt="Kemenko PMK Logo"
                    className="h-28 w-28 md:h-36 md:w-36 mb-6"
                />
            </div>

            <div 
                className={`text-center transition-all duration-1000 ease-out delay-500 ${isVisible && !isExiting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">CERIA</h1>
                <p className="mt-2 text-md md:text-lg text-slate-500 max-w-lg px-4">
                    Cerdas, Efektif, Responsif, Inovatif, Akurat 
              </p>
              <p className="mt-2 text-md md:text-lg text-slate-500 max-w-lg px-4">
                   Sistem Pendukung Keputusan Cerdas untuk Pemerataan Layanan PAUD HI
              </p>
            </div>

            <div 
                className={`mt-10 transition-all duration-700 ease-out delay-1000 ${isVisible && !isExiting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
                <button 
                    onClick={handleStartClick}
                    className="group flex items-center justify-center bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-800 font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-amber-300"
                    disabled={!isVisible || isExiting}
                    aria-label="Mulai menggunakan aplikasi"
                >
                    Mulai
                    <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
            </div>
        </div>
    );
};

export default WelcomeScreen;