import React, { useRef, useMemo, useState } from 'react';
import { usePlayback } from '../context/PlaybackContext';
import { useComment } from '../context/CommentContext';
import CommentInput from './CommentInput';
import { formatTimestamp, calculateTimeFromClick } from '../utils/time';

export default function Timeline() {
  const { currentTime, setCurrentTime, duration } = usePlayback();
  const { comments } = useComment();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [draftTime, setDraftTime] = useState(0);

  const waveformData = useMemo(() => {
    return Array.from({ length: 100 }).map(() => Math.random() * 80 + 20);
  }, []);

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    
    const newTime = calculateTimeFromClick(
      e.clientX,
      timelineRef.current.getBoundingClientRect(),
      duration
    );
    
    setCurrentTime(newTime);
    setDraftTime(newTime);
    setShowCommentInput(true);
  };

  const playheadPositionPercentage = (currentTime / duration) * 100;
  const draftPositionPercentage = (draftTime / duration) * 100;

  return (
    <div className="relative shrink-0 flex flex-col justify-center w-full">
      <div className="flex items-center justify-between text-xs font-heading text-secondary mb-2 relative">
        <span>00:00:00</span>
        {showCommentInput && (
          <CommentInput 
            time={draftTime} 
            positionPercentage={draftPositionPercentage}
            onClose={() => setShowCommentInput(false)}
          />
        )}
        <span>{formatTimestamp(duration)}</span>
      </div>
      <div 
        ref={timelineRef}
        onClick={handleTimelineClick}
        className="h-16 bg-neutral/50 rounded-md relative overflow-hidden group cursor-pointer"
      >
        {/* Audio Waveform - variable width bars */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-2 space-x-0.5 opacity-60 pointer-events-none">
          {waveformData.map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-white/80 rounded-full transition-all duration-300"
              style={{ height: `${height}%`, minWidth: '1px', maxWidth: '3px' }}
            ></div>
          ))}
        </div>
        
        {/* Comment Ticks */}
        {comments.map((comment) => {
          const tickPosition = (comment.timestamp / duration) * 100;
          return (
            <div 
              key={comment.id}
              className="absolute top-0 h-full w-[2px] bg-secondary z-10 shadow-[0_0_6px_rgba(0,229,255,1)] cursor-pointer hover:bg-white transition-colors hover:w-[3px] -translate-x-[1px]"
              style={{ left: `${tickPosition}%` }}
            ></div>
          );
        })}

        {/* Playhead Progress Overlay */}
        <div 
          className="absolute top-0 left-0 h-full bg-primary/10 pointer-events-none"
          style={{ width: `${playheadPositionPercentage}%` }}
        ></div>
        
        {/* Playhead */}
        <div 
          className="absolute top-0 h-full w-0.5 bg-primary group-hover:bg-primary/80 transition-colors z-20 pointer-events-none shadow-[0_0_8px_rgba(255,177,0,0.8)] -translate-x-[1px]"
          style={{ left: `${playheadPositionPercentage}%` }}
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-primary rounded-full border-2 border-base"></div>
        </div>
      </div>
    </div>
  );
}
