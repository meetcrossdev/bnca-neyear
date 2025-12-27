
import React, { useState, useEffect } from 'react';
import { BIBLE_VERSES } from '../constants/verses';

const VerseSlider: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % BIBLE_VERSES.length);
        setIsVisible(true);
      }, 800); 
    }, 7000); 

    return () => clearInterval(interval);
  }, []);

  const verse = BIBLE_VERSES[index];

  return (
    <div className="w-full max-w-3xl px-6 mt-6 md:mt-10">
      <div className="glass-card rounded-2xl p-8 md:p-12 text-center transition-all duration-1000">
        <div className={`transition-all duration-800 ease-in-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          {/* Book Icon */}
          <div className="flex justify-center mb-6">
            <svg className="w-8 h-8 text-amber-500/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          
          <p className="text-xl md:text-2xl font-playfair italic leading-relaxed text-slate-200 mb-6 font-medium">
            "{verse.text}"
          </p>
          
          <p className="text-xs md:text-sm font-inter font-black text-amber-500 tracking-[0.2em] uppercase">
            {verse.reference}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerseSlider;
