
import { TimeRemaining } from '../types';

export const getNextNewYear = (): Date => {
  const now = new Date();
  const nextYear = now.getFullYear() + 1;
  return new Date(`January 1, ${nextYear} 00:00:00`);
};

export const getTimeRemaining = (targetDate: Date): TimeRemaining => {
  const total = targetDate.getTime() - new Date().getTime();
  
  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, total };
};
