import React from 'react';
import VideoCanvas from './components/VideoCanvas';
import Timeline from './components/Timeline';
import CommentList from './components/CommentList';

interface ReviewLayoutProps {
  share_token?: string;
}

export default function ReviewLayout({ share_token }: ReviewLayoutProps) {
  return (
    <div className="relative h-screen w-full bg-base text-white font-body overflow-hidden flex flex-col">
      {/* Absolute Background Video Canvas */}
      <div className="absolute inset-0 z-0">
        <VideoCanvas />
      </div>

      {/* Floating Header */}
      <header className="relative z-10 flex items-center justify-between p-6 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-heading font-bold text-base pointer-events-auto shadow-lg">
            C
          </div>
          <h1 className="text-xl font-heading font-semibold text-white tracking-wide drop-shadow-md pointer-events-auto">
            The Clean Cut
          </h1>
        </div>
        <div className="text-sm font-heading text-white/80 pointer-events-auto drop-shadow-md bg-black/40 px-3 py-1 rounded-full border border-white/10">
          Review: <span className="text-secondary">{share_token}</span>
        </div>
      </header>

      {/* Floating UI Container */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pointer-events-none pb-6">
        <div className="flex flex-row w-full px-6 gap-6 h-full items-end">
          
          {/* Timeline Area (Bottom Left) */}
          <div className="flex-1 flex flex-col justify-end pointer-events-auto">
            <div className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 overflow-visible shadow-2xl p-4">
              <Timeline />
            </div>
          </div>

          {/* Comments Area (Right Sidebar) */}
          <div className="w-[340px] h-[calc(100vh-120px)] flex flex-col pointer-events-auto bg-black/60 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-2xl">
            <CommentList />
          </div>
          
        </div>
      </div>
    </div>
  );
}
