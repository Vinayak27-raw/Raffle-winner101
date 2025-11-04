
import React, { useState, useMemo, useCallback, useRef } from 'react';
import { WinnerModal } from './components/WinnerModal';
import { TrophyIcon } from './components/icons/TrophyIcon';

const App: React.FC = () => {
  const [participants, setParticipants] = useState('');
  const [winner, setWinner] = useState<string | null>(null);
  const [isPicking, setIsPicking] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [pickingName, setPickingName] = useState<string | null>(null);

  const intervalRef = useRef<number | null>(null);

  const participantsList = useMemo(() => {
    return participants
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);
  }, [participants]);

  const handlePickWinner = useCallback(() => {
    if (participantsList.length < 2) {
      // Simple validation feedback could be added here
      return;
    }

    setIsPicking(true);
    setWinner(null);
    setPickingName(null);

    // Slot machine effect
    intervalRef.current = window.setInterval(() => {
      const randomIndex = Math.floor(Math.random() * participantsList.length);
      setPickingName(participantsList[randomIndex]);
    }, 100);

    // Announce winner after a delay
    setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      const randomIndex = Math.floor(Math.random() * participantsList.length);
      const finalWinner = participantsList[randomIndex];
      setWinner(finalWinner);
      setIsPicking(false);
      setShowWinnerModal(true);
    }, 3000); // 3 seconds of suspense

  }, [participantsList]);
  
  const handleCloseModal = () => {
    setShowWinnerModal(false);
    setPickingName(null);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-900 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-2xl p-6 sm:p-10 text-center">
          <div className="flex justify-center items-center mb-6">
            <TrophyIcon className="h-10 w-10 text-amber-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white ml-3">
              Raffle Winner Picker
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Enter participant names below, one per line.
          </p>

          <div className="mb-6">
            <textarea
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              placeholder="Alice&#10;Bob&#10;Charlie&#10;David"
              rows={10}
              className="w-full p-4 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 resize-none"
              disabled={isPicking}
            />
            <p className="text-right text-sm text-slate-500 dark:text-slate-400 mt-2 pr-1">
              {participantsList.length} participant{participantsList.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="h-16 flex items-center justify-center mb-6">
            {isPicking && pickingName && (
               <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 p-4 bg-indigo-50 dark:bg-slate-700 rounded-lg transition-all duration-100 ease-in-out">
                {pickingName}
              </div>
            )}
          </div>
          
          <button
            onClick={handlePickWinner}
            disabled={participantsList.length < 2 || isPicking}
            className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {isPicking ? 'Picking...' : 'Pick a Winner'}
          </button>
        </div>
      </div>
      {showWinnerModal && winner && (
        <WinnerModal winner={winner} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
