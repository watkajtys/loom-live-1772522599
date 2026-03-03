import React from 'react';
import { useParams } from 'react-router-dom';
import VideoCanvas from './components/VideoCanvas';
import Timeline from './components/Timeline';
import CommentList from './components/CommentList';
import { VideoProvider } from './context/VideoContext';

export default function VideoReview() {
  const { share_token } = useParams();

  return (
    <VideoProvider>
      <div className="flex h-screen w-full bg-base text-white font-body overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full">
          {/* Header */}
          <header className="h-16 flex items-center px-6 shrink-0 border-b border-neutral">
            <h1 className="text-lg font-heading text-white">Review: {share_token}</h1>
          </header>

          <VideoCanvas />
          <Timeline />
        </div>

        <CommentList />
      </div>
    </VideoProvider>
  );
}
