import React, { useState, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';

export default function VideoReview() {
  const { share_token } = useParams();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [playheadPosition, setPlayheadPosition] = useState(33.33); // Starting at 1/3 (33.33%)
  const timelineRef = useRef<HTMLDivElement>(null);

  // Memoize the random waveform data so it doesn't change on every render (e.g., when the playhead moves)
  const waveformData = useMemo(() => {
    return Array.from({ length: 100 }).map(() => Math.random() * 80 + 20);
  }, []);

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    setPlayheadPosition(percentage);
    setShowCommentInput(true);
  };

  return (
    <div className="flex h-screen w-full bg-base text-white font-body overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Header */}
        <header className="h-16 flex items-center px-6 shrink-0 border-b border-neutral">
          <h1 className="text-lg font-heading text-white">Review: {share_token}</h1>
        </header>

        {/* Video Canvas Container */}
        <div className="flex-1 relative bg-black flex items-center justify-center p-8 overflow-hidden min-h-0">
          <div className="w-full h-full max-w-5xl aspect-video bg-neutral/30 rounded-lg flex items-center justify-center border border-neutral">
            <span className="text-white/50 font-heading">Video Canvas Placeholder</span>
          </div>
        </div>

        {/* Timeline Scrubber Container */}
        <div className="h-32 bg-base border-t border-neutral shrink-0 flex flex-col justify-center px-6">
          <div className="flex items-center justify-between text-xs font-heading text-secondary mb-2 relative">
            <span>00:00:00</span>
            {/* Floating Comment Input */}
            {showCommentInput && (
              <div 
                className="absolute bottom-6 -translate-x-1/2 bg-neutral border border-primary p-2 rounded shadow-lg z-30 w-64 flex flex-col gap-2"
                style={{ left: `${playheadPosition}%` }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-xs font-heading text-white">Add Comment at {(playheadPosition * 42 / 100).toFixed(2)}s</span>
                </div>
                <textarea 
                  autoFocus
                  className="w-full bg-base text-white text-sm p-2 rounded border border-white/10 focus:border-primary focus:outline-none resize-none font-body"
                  placeholder="Type your feedback..."
                  rows={2}
                />
                <div className="flex justify-end gap-2 mt-1">
                  <button 
                    onClick={() => setShowCommentInput(false)}
                    className="text-xs text-white/60 hover:text-white px-2 py-1"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setShowCommentInput(false)}
                    className="bg-primary text-base font-semibold text-xs px-3 py-1 rounded hover:bg-primary/90 transition-colors"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
            <span>00:00:42</span>
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
            <div className="absolute top-0 left-[15%] h-full w-[2px] bg-secondary z-10 shadow-[0_0_4px_rgba(0,229,255,0.8)] cursor-pointer hover:bg-white transition-colors"></div>
            <div className="absolute top-0 left-[45%] h-full w-[2px] bg-secondary z-10 shadow-[0_0_4px_rgba(0,229,255,0.8)] cursor-pointer hover:bg-white transition-colors"></div>
            <div className="absolute top-0 left-[82%] h-full w-[2px] bg-secondary z-10 shadow-[0_0_4px_rgba(0,229,255,0.8)] cursor-pointer hover:bg-white transition-colors"></div>

            <div 
              className="absolute top-0 left-0 h-full bg-white/20 pointer-events-none"
              style={{ width: `${playheadPosition}%` }}
            ></div>
            <div 
              className="absolute top-0 h-full w-0.5 bg-primary group-hover:bg-primary/80 transition-colors z-20 pointer-events-none"
              style={{ left: `${playheadPosition}%` }}
            >
              <div className="absolute -top-1 -translate-x-1/2 w-3 h-3 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar / Comments Container */}
      <aside className="w-80 bg-base border-l border-neutral flex flex-col shrink-0 h-full overflow-hidden">
        <header className="h-16 flex items-center px-6 border-b border-neutral shrink-0">
          <h2 className="text-sm font-heading text-white uppercase tracking-wider">Comments</h2>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-neutral p-3 rounded-lg border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm">Client Dave</span>
              <span className="text-xs font-heading text-secondary">14.50</span>
            </div>
            <p className="text-sm text-white/80">Make it pop more here!</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
