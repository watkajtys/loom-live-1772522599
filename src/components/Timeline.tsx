import React, { useRef, useMemo, useState } from 'react';
import { useVideo } from '../context/VideoContext';
import CommentInput from './CommentInput';

export default function Timeline() {
  const { currentTime, setCurrentTime, duration, comments } = useVideo();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [draftTime, setDraftTime] = useState(0);

  const waveformData = useMemo(() => {
    return Array.from({ length: 100 }).map(() => Math.random() * 80 + 20);
  }, []);

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width);
    
    const newTime = percentage * duration;
    setCurrentTime(newTime);
    setDraftTime(newTime);
    setShowCommentInput(true);
  };

  const playheadPositionPercentage = (currentTime / duration) * 100;
  const draftPositionPercentage = (draftTime / duration) * 100;

  return (
    <div className="h-32 bg-base border-t border-neutral shrink-0 flex flex-col justify-center px-6">
      <div className="flex items-center justify-between text-xs font-heading text-secondary mb-2 relative">
        <span>00:00:00</span>
        {showCommentInput && (
          <CommentInput 
            time={draftTime} 
            positionPercentage={draftPositionPercentage}
            onClose={() => setShowCommentInput(false)}
          />
        )}
        <span>00:00:{Math.floor(duration).toString().padStart(2, '0')}</span>
      </div>
      <div 
        ref={timelineRef}
        onClick={handleTimelineClick}
        className="h-16 bg-neutral rounded-md relative overflow-hidden group cursor-pointer"
      >
        {/* Audio Waveform */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-1 space-x-[1px] opacity-40 pointer-events-none">
          {waveformData.map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-white rounded-full"
              style={{ height: `${height}%` }}
            ></div>
          ))}
        </div>
        
        {/* Comment Ticks */}
        {comments.map((comment) => {
          const tickPosition = (comment.timestamp / duration) * 100;
          return (
            <div 
              key={comment.id}
              className="absolute top-0 h-full w-[2px] bg-secondary z-10 shadow-[0_0_4px_rgba(0,229,255,0.8)] cursor-pointer hover:bg-white transition-colors"
              style={{ left: `${tickPosition}%` }}
            ></div>
          );
        })}

        <div 
          className="absolute top-0 left-0 h-full bg-white/20 pointer-events-none"
          style={{ width: `${playheadPositionPercentage}%` }}
        ></div>
        
        <div 
          className="absolute top-0 h-full w-0.5 bg-primary group-hover:bg-primary/80 transition-colors z-20 pointer-events-none"
          style={{ left: `${playheadPositionPercentage}%` }}
        >
          <div className="absolute -top-1 -translate-x-1/2 w-3 h-3 bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
