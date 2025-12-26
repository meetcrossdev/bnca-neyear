
import React, { useState, useEffect, useCallback } from 'react';
import { getTimeRemaining } from './utils/time';
import { TimeRemaining } from './types';
import CountdownDisplay from './components/CountdownDisplay';
import VerseSlider from './components/VerseSlider';
import Footer from './components/Footer';
import TimezoneSelector from './components/TimezoneSelector';

const App: React.FC = () => {
  // Default to USA CST as requested
  const [timezone, setTimezone] = useState('America/Chicago');
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() => getTimeRemaining(timezone));
  const [isFinished, setIsFinished] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Update timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeRemaining(timezone);
      setTimeRemaining(remaining);
      if (remaining.total <= 0) {
        setIsFinished(true);
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

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-4 px-6 sm:px-10 md:px-16 transition-all duration-1000">
      {/* Header */}
      <header className="fixed top-6 md:top-10 left-0 w-full px-6 md:px-10 flex justify-between items-center z-50">
        <h1 className="text-xl md:text-4xl font-black font-inter tracking-tighter text-white">
          BNCA <span className="text-amber-400">USA</span>
        </h1>

        <button 
          onClick={toggleFullscreen}
          className="bg-white/5 p-2.5 md:p-3 rounded-full hover:bg-white/10 transition-all border border-white/5 active:scale-90"
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
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center w-full max-w-6xl mt-12 md:mt-0">
        {!isFinished ? (
          <>
            <CountdownDisplay time={timeRemaining} />
            <TimezoneSelector selected={timezone} onChange={setTimezone} />
          </>
        ) : (
          <div className="flex flex-col items-center animate-bounce-slow">
            <span className="text-amber-400 font-black text-4xl md:text-6xl uppercase tracking-tighter mb-4">
              Happy New Year!
            </span>
          </div>
        )}
        <VerseSlider />
      </main>

      <Footer />
    </div>
  );
};

export default App;
