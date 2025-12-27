
import React, { useMemo } from 'react';

interface TimezoneSelectorProps {
  selected: string;
  onChange: (tz: string) => void;
}

const TimezoneSelector: React.FC<TimezoneSelectorProps> = ({ selected, onChange }) => {
  const allTimezones = useMemo(() => {
    try {
      const timeZones = (Intl as any).supportedValuesOf('timeZone') as string[];
      return timeZones.map(tz => ({
        value: tz,
        label: tz.replace(/_/g, ' ')
      })).sort((a, b) => a.label.localeCompare(b.label));
    } catch (e) {
      return [
        { label: 'USA Eastern (EST)', value: 'America/New_York' },
        { label: 'USA Central (CST)', value: 'America/Chicago' },
        { label: 'USA Mountain (MST)', value: 'America/Denver' },
        { label: 'USA Pacific (PST)', value: 'America/Los_Angeles' },
        { label: 'London (GMT)', value: 'Europe/London' },
        { label: 'India (IST)', value: 'Asia/Kolkata' },
      ];
    }
  }, []);

  return (
    <div className="fixed bottom-20 right-6 md:right-10 flex flex-col items-end gap-2 z-50 animate-in fade-in slide-in-from-right-4 duration-700">
      <label 
        htmlFor="tz-select" 
        className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] whitespace-nowrap"
      >
        Timezone
      </label>
      <div className="relative group w-48 md:w-56">
        <select
          id="tz-select"
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-4 py-2 text-[10px] md:text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer outline-none focus:ring-1 focus:ring-amber-500/50 pr-8"
        >
          {allTimezones.map((tz) => (
            <option key={tz.value} value={tz.value} className="bg-slate-900 text-white">
              {tz.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TimezoneSelector;
