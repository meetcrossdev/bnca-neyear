
import React from 'react';
import { TimeRemaining } from '../types';

interface CountdownDisplayProps {
  time: TimeRemaining;
}

const CountdownDisplay: React.FC<CountdownDisplayProps> = ({ time }) => {
  const format = (num: number) => num.toString().padStart(2, '0');

  const DigitGroup = ({ value, label, isLast = false }: { value: number; label: string; isLast?: boolean }) => (
    <div className="flex flex-col items-center">
      {/* Reduced font-weight from black (900) to bold (700) on mobile/tablet, keeping black for desktop */}
      <span className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold md:font-black tracking-tight timer-nums ${isLast ? 'text-amber-400 seconds-glow' : 'text-white'}`}>
        {format(value)}
      </span>
      <span className="mt-2 md:mt-4 text-[9px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-slate-500">
        {label}
      </span>
    </div>
  );

  const Separator = () => (
    <div className="flex flex-col gap-2 md:gap-4 mx-2 sm:mx-4 md:mx-8 mb-6 md:mb-12">
      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-slate-800"></div>
      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-slate-800"></div>
    </div>
  );

  return (
    <div className="flex items-center justify-center w-full px-4 sm:px-8 md:px-0">
      <DigitGroup value={time.days} label="Days" />
      <Separator />
      <DigitGroup value={time.hours} label="Hours" />
      <Separator />
      <DigitGroup value={time.minutes} label="Minutes" />
      <Separator />
      <DigitGroup value={time.seconds} label="Seconds" isLast />
    </div>
  );
};

export default CountdownDisplay;
