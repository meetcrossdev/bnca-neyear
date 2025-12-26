
import { TimeRemaining } from '../types';

/**
 * Calculates time remaining until New Year in a specific timezone.
 */
export const getTimeRemaining = (timezone: string): TimeRemaining => {
  const now = new Date();
  
  // Get current date/time components in the target timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  });
  
  const parts = formatter.formatToParts(now);
  const getPart = (type: string) => parseInt(parts.find(p => p.type === type)?.value || "0");
  
  const year = getPart('year');
  const month = getPart('month');
  const day = getPart('day');
  const hour = getPart('hour');
  const minute = getPart('minute');
  const second = getPart('second');

  // We treat these components as if they were a local date to calculate the delta
  // until the next Jan 1st at 00:00:00
  const currentInZone = new Date(year, month - 1, day, hour, minute, second);
  const targetInZone = new Date(year + 1, 0, 1, 0, 0, 0);
  
  const total = targetInZone.getTime() - currentInZone.getTime();

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, total };
};

// Kept for backward compatibility if needed, but App.tsx will now use the timezone version
export const getNextNewYear = (): Date => {
  const now = new Date();
  const nextYear = now.getFullYear() + 1;
  return new Date(`January 1, ${nextYear} 00:00:00`);
};
