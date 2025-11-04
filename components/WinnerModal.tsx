
import React, { useState, useEffect } from 'react';
// @ts-ignore - Assuming react-confetti is available
import Confetti from 'react-confetti';
import { TrophyIcon } from './icons/TrophyIcon';
import { XIcon } from './icons/XIcon';

interface WinnerModalProps {
  winner: string;
  onClose: () => void;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};


export const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onClose }) => {
  const { width, height } = useWindowSize();
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={400}
        gravity={0.1}
      />
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl text-center p-8 max-w-md w-full relative transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition">
          <XIcon className="h-6 w-6" />
        </button>
        
        <div className="flex justify-center mb-4">
          <TrophyIcon className="h-20 w-20 text-amber-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-600 dark:text-slate-300">The winner is...</h2>
        <p className="text-5xl font-extrabold my-6 text-indigo-600 dark:text-indigo-400 break-words">
          {winner}
        </p>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Congratulations!
        </p>

        <button
          onClick={onClose}
          className="mt-8 w-full px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition duration-200"
        >
          Pick Another
        </button>
      </div>
    </div>
  );
};
