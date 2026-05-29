import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white text-charcoal px-8 py-24">
      <div className="max-w-2xl w-full text-center flex flex-col items-center space-y-8 md:space-y-10">
        
        {/* Expanded 404 Header */}
        <h1 className="text-8xl sm:text-9xl md:text-[10rem] font-black tracking-tighter text-charcoal leading-none select-none">
          404
        </h1>

        {/* Large Bold Subtle Accent Label */}
        <h2 className="text-base sm:text-lg md:text-xl font-black uppercase tracking-[0.3em] text-primary-red">
          Page Not Found
        </h2>

        {/* Scaled Plain Description */}
        <p className="text-gray-500 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl">
          The requested URL does not exist or has been permanently moved to another section.
        </p>

        {/* Scaled Minimalist Button */}
        <button
          onClick={() => navigate('/', { replace: true })}
          className="bg-charcoal hover:bg-primary-red text-white font-bold text-xs sm:text-sm uppercase tracking-[0.25em] px-12 py-5 transition-colors duration-200 border border-charcoal hover:border-primary-red shadow-sm"
        >
          Return to Home
        </button>

      </div>
    </div>
  );
}
