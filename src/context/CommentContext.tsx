import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Comment {
  id: string;
  timestamp: number;
  author_name: string;
  body: string;
  is_resolved: boolean;
}

interface CommentContextType {
  comments: Comment[];
  addComment: (comment: Omit<Comment, 'id' | 'is_resolved'>) => void;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export function CommentProvider({ children }: { children: ReactNode }) {
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
        id: crypto.randomUUID(),
        is_resolved: false,
      }
    ]);
  };

  return (
    <CommentContext.Provider value={{
      comments,
      addComment
    }}>
      {children}
    </CommentContext.Provider>
  );
}

export function useComment() {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useComment must be used within a CommentProvider');
  }
  return context;
}
