import React from 'react';

export default function VideoCanvas() {
  return (
    <div className="flex-1 relative bg-black flex items-center justify-center p-8 overflow-hidden min-h-0">
      <div className="w-full h-full max-w-5xl aspect-video bg-neutral/30 rounded-lg flex items-center justify-center border border-neutral">
        <span className="text-white/50 font-heading">Video Canvas Placeholder</span>
      </div>
    </div>
  );
}
