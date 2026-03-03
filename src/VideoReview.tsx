import React from 'react';
import { useParams } from 'react-router-dom';
import { PlaybackProvider } from './context/PlaybackContext';
import { CommentProvider } from './context/CommentContext';
import ReviewLayout from './ReviewLayout';

export default function VideoReview() {
  const { share_token } = useParams();

  return (
    <PlaybackProvider>
      <CommentProvider>
        <ReviewLayout share_token={share_token} />
      </CommentProvider>
    </PlaybackProvider>
  );
}
