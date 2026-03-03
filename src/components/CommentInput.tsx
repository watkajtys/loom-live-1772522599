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
      className="absolute bottom-8 -translate-x-1/2 z-30 flex flex-col items-center"
      style={{ left: `${positionPercentage}%` }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Floating Comment Box */}
      <div className="bg-[#1A1C20] border border-primary/50 p-3 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.8)] w-64 flex flex-col gap-2 relative">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(255,177,0,0.8)]"></div>
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
          className="w-full bg-[#121417] text-white text-sm p-2 rounded border border-white/10 focus:border-primary/50 focus:outline-none resize-none font-body shadow-inner"
          placeholder="Type your feedback..."
          rows={2}
        />
        <div className="flex justify-end gap-2 mt-1">
          <button 
            onClick={onClose}
            className="text-xs font-body font-semibold text-white/60 hover:text-white px-2 py-1 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handlePost}
            className="bg-primary text-[#121417] font-body font-bold text-xs px-4 py-1.5 rounded hover:bg-primary/90 transition-colors shadow-md"
          >
            Post
          </button>
        </div>
      </div>
      
      {/* Visual Connector / Tail */}
      <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-primary/50 mt-[-1px]"></div>
      {/* Inner tail to match background */}
      <div className="absolute bottom-[2px] w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[9px] border-t-[#1A1C20]"></div>
      
      {/* Connecting dot to the timeline */}
      <div className="w-2 h-2 mt-1 rounded-full bg-primary border-2 border-[#121417] shadow-[0_0_6px_rgba(255,177,0,0.8)]"></div>
    </div>
  );
}
