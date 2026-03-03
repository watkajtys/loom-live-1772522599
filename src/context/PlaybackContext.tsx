import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PlaybackContextType {
  currentTime: number;
  setCurrentTime: (time: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
}

const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

export function PlaybackProvider({ children }: { children: ReactNode }) {
  const [currentTime, setCurrentTime] = useState(14.0);
  const [duration, setDuration] = useState(42.0);

  return (
    <PlaybackContext.Provider value={{
      currentTime,
      setCurrentTime,
      duration,
      setDuration,
    }}>
      {children}
    </PlaybackContext.Provider>
  );
}

export function usePlayback() {
  const context = useContext(PlaybackContext);
  if (!context) {
    throw new Error('usePlayback must be used within a PlaybackProvider');
  }
  return context;
}
