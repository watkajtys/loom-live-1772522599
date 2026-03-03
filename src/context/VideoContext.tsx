import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';

export interface Comment {
  id: string;
  timestamp: number;
  author_name: string;
  body: string;
  is_resolved: boolean;
}

interface VideoContextType {
  currentTime: number;
  setCurrentTime: (time: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  comments: Comment[];
  addComment: (comment: Omit<Comment, 'id' | 'is_resolved'>) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: ReactNode }) {
  const [currentTime, setCurrentTime] = useState(14.0); // 33.33% of 42
  const [duration, setDuration] = useState(42.0);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      timestamp: 14.50,
      author_name: 'Client Dave',
      body: 'Make it pop more here!',
      is_resolved: false,
    }
  ]);

  const addComment = (comment: Omit<Comment, 'id' | 'is_resolved'>) => {
    setComments(prev => [
      ...prev,
      {
        ...comment,
        id: Math.random().toString(36).substr(2, 9),
        is_resolved: false,
      }
    ]);
  };

  return (
    <VideoContext.Provider value={{
      currentTime,
      setCurrentTime,
      duration,
      setDuration,
      comments,
      addComment
    }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
}
