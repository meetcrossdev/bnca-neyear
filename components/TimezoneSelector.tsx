
import React, { useMemo } from 'react';

interface TimezoneSelectorProps {
  selected: string;
  onChange: (tz: string) => void;
}

const TimezoneSelector: React.FC<TimezoneSelectorProps> = ({ selected, onChange }) => {
  // Generate a comprehensive list of all supported timezones from the browser
  const allTimezones = useMemo(() => {
    try {
      // Use the modern Intl.supportedValuesOf API to get all TZ database names
      const timeZones = (Intl as any).supportedValuesOf('timeZone') as string[];
      return timeZones.map(tz => ({
        value: tz,
        label: tz.replace(/_/g, ' ') // Make it readable
      })).sort((a, b) => a.label.localeCompare(b.label));
    } catch (e) {
      // Fallback if browser doesn't support supportedValuesOf
      return [
        { label: 'USA Eastern (EST)', value: 'America/New_York' },
        { label: 'USA Central (CST)', value: 'America/Chicago' },
        { label: 'USA Mountain (MST)', value: 'America/Denver' },
        { label: 'USA Pacific (PST)', value: 'America/Los_Angeles' },
        { label: 'London (GMT)', value: 'Europe/London' },
        { label: 'Paris (CET)', value: 'Europe/Paris' },
        { label: 'India (IST)', value: 'Asia/Kolkata' },
        { label: 'Tokyo (JST)', value: 'Asia/Tokyo' },
        { label: 'Sydney (AEDT)', value: 'Australia/Sydney' },
      ];
    }
  }, []);

  return (
    <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-4 animate-in fade-in duration-1000 delay-300">
      <label 
        htmlFor="tz-select" 
        className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] whitespace-nowrap"
      >
        Select Timezone:
      </label>
      <div className="relative group min-w-[240px]">
        <select
          id="tz-select"
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white/5 border border-white/10 rounded-full px-6 py-2.5 text-xs md:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer outline-none focus:ring-2 focus:ring-amber-500/50 pr-10"
        >
          {allTimezones.map((tz) => (
            <option key={tz.value} value={tz.value} className="bg-slate-900 text-white">
              {tz.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TimezoneSelector;
