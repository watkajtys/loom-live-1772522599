import React, { useState } from 'react';
import { useVideo } from '../context/VideoContext';

interface CommentInputProps {
  time: number;
  positionPercentage: number;
  onClose: () => void;
}

export default function CommentInput({ time, positionPercentage, onClose }: CommentInputProps) {
  const { addComment } = useVideo();
  const [body, setBody] = useState('');

  const handlePost = () => {
    if (!body.trim()) return;
    
    addComment({
      timestamp: time,
      author_name: 'Guest',
      body: body.trim(),
    });
    
    onClose();
  };

  return (
    <div 
      className="absolute bottom-6 -translate-x-1/2 bg-neutral border border-primary p-2 rounded shadow-lg z-30 w-64 flex flex-col gap-2"
      style={{ left: `${positionPercentage}%` }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        <span className="text-xs font-heading text-white">Add Comment at {time.toFixed(2)}s</span>
      </div>
      <textarea 
        autoFocus
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handlePost();
          }
        }}
        className="w-full bg-base text-white text-sm p-2 rounded border border-white/10 focus:border-primary focus:outline-none resize-none font-body"
        placeholder="Type your feedback..."
        rows={2}
      />
      <div className="flex justify-end gap-2 mt-1">
        <button 
          onClick={onClose}
          className="text-xs text-white/60 hover:text-white px-2 py-1"
        >
          Cancel
        </button>
        <button 
          onClick={handlePost}
          className="bg-primary text-base font-semibold text-xs px-3 py-1 rounded hover:bg-primary/90 transition-colors text-base"
        >
          Post
        </button>
      </div>
    </div>
  );
}
