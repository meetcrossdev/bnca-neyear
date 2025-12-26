
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 w-full py-6 px-4 text-center z-50">
      <div className="text-slate-400 text-sm md:text-base font-inter">
        © {currentYear} | Design and Developed by{" "}
        <a 
          href="https://meetcross.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-amber-500 hover:text-amber-400 transition-colors font-bold"
        >
          Meetcross
        </a>
      </div>
    </footer>
  );
};

export default Footer;
