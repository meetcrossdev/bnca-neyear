
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getTimeRemaining } from './utils/time';
import { TimeRemaining } from './types';
import CountdownDisplay from './components/CountdownDisplay';
import VerseSlider from './components/VerseSlider';
import Footer from './components/Footer';
import TimezoneSelector from './components/TimezoneSelector';
import Fireworks from './components/Fireworks';

const App: React.FC = () => {
  const [timezone, setTimezone] = useState('America/Chicago');
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() => getTimeRemaining(timezone));
  const [isFinished, setIsFinished] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const previewTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeRemaining(timezone);
      setTimeRemaining(remaining);
      if (remaining.total <= 0) {
        setIsFinished(true);
        setShowFireworks(true);
        setIsPreviewing(false); // Real finish takes priority over preview
        clearInterval(timer);
      } else {
        setIsFinished(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timezone]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  }, []);

  const triggerTestFireworks = () => {
    if (isFinished) return;
    
    setIsPreviewing(true);
    setShowFireworks(true);

    // Clear existing timeout if any
    if (previewTimeoutRef.current) {
      window.clearTimeout(previewTimeoutRef.current);
    }

    // Automatically turn off after 15 seconds if it's just a test
    previewTimeoutRef.current = window.setTimeout(() => {
      setIsPreviewing(false);
      setShowFireworks(false);
    }, 15000);
  };

  const stopPreview = () => {
    setIsPreviewing(false);
    setShowFireworks(false);
    if (previewTimeoutRef.current) {
      window.clearTimeout(previewTimeoutRef.current);
    }
  };

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-4 px-6 sm:px-10 md:px-16 transition-all duration-1000">
      <Fireworks active={showFireworks} />
      
      {/* Header */}
      <header className="fixed top-6 md:top-10 left-0 w-full px-6 md:px-10 flex justify-between items-center z-50">
        <h1 className="text-xl md:text-4xl font-black font-inter tracking-tighter text-white">
          BNCA <span className="text-amber-400">USA</span>
        </h1>

        <div className="flex items-center gap-3">
          <button 
            onClick={triggerTestFireworks}
            title="Test Celebration"
            className="bg-white/5 p-2.5 md:p-3 rounded-full hover:bg-white/10 transition-all border border-white/5 active:scale-95 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-amber-400 group-hover:scale-110 transition-transform ${showFireworks ? 'animate-pulse' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </button>
          <button 
            onClick={toggleFullscreen}
            className="bg-white/5 p-2.5 md:p-3 rounded-full hover:bg-white/10 transition-all border border-white/5 active:scale-95"
          >
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0l5 5m-5-5h5m-5 5v-5m11 11l5 5m0 0l-5-5m5 5h-5m5-5v5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 flex flex-col items-center justify-center w-full max-w-6xl mt-12 md:mt-0">
        {(!isFinished && !isPreviewing) ? (
          <CountdownDisplay time={timeRemaining} />
        ) : (
          <div className="flex flex-col items-center animate-in zoom-in duration-1000">
            <span className="bg-gradient-to-br from-red-500 via-white to-blue-500 bg-clip-text text-transparent font-black text-6xl md:text-9xl uppercase tracking-tighter mb-4 text-center leading-none drop-shadow-[0_5px_15px_rgba(255,255,255,0.1)]">
              Happy<br/>New Year 2026!
            </span>
            {isPreviewing && !isFinished && (
              <button 
                onClick={stopPreview}
                className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-white transition-all active:scale-95"
              >
                Close Preview
              </button>
            )}
          </div>
        )}
        <VerseSlider />
      </main>

      <TimezoneSelector selected={timezone} onChange={setTimezone} />
      <Footer />
    </div>
  );
};

export default App;
