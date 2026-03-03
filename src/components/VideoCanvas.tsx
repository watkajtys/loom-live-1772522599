import React from 'react';

export default function VideoCanvas() {
  return (
    <div className="w-full h-full bg-[#121417] flex items-center justify-center overflow-hidden">
      {/* Sleek full-screen placeholder instead of boxed aspect-video */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1A1C20] to-[#0A0B0D]">
         <div className="flex flex-col items-center justify-center">
            <div className="w-24 h-24 mb-6 rounded-full border-4 border-primary/20 flex items-center justify-center bg-primary/5 shadow-[0_0_30px_rgba(255,177,0,0.1)]">
              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-primary/60 border-b-[12px] border-b-transparent ml-2"></div>
            </div>
            <span className="text-white/30 font-heading text-lg tracking-[0.2em] uppercase">Video Canvas Placeholder</span>
         </div>
      </div>
    </div>
  );
}
