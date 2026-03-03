import React from 'react';
import { useParams } from 'react-router-dom';

export default function VideoReview() {
  const { share_token } = useParams();

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
        <div className="h-24 bg-base border-t border-neutral shrink-0 flex flex-col justify-center px-6">
          <div className="flex items-center justify-between text-xs font-heading text-secondary mb-2">
            <span>00:00:00</span>
            <span>00:00:42</span>
          </div>
          <div className="h-4 bg-neutral rounded-full relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-white/20"></div>
            <div className="absolute top-0 left-1/3 h-full w-2 bg-primary group-hover:bg-primary/80 transition-colors"></div>
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
