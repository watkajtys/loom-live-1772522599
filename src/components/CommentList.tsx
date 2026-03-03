import React from 'react';
import { useComment } from '../context/CommentContext';
import { formatTimestamp } from '../utils/time';

export default function CommentList() {
  const { comments } = useComment();

  return (
    <aside className="w-80 bg-base border-l border-neutral flex flex-col shrink-0 h-full overflow-hidden">
      <header className="h-16 flex items-center px-6 border-b border-neutral shrink-0">
        <h2 className="text-sm font-heading text-white uppercase tracking-wider">Comments</h2>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-neutral p-3 rounded-lg border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm">{comment.author_name}</span>
              <span className="text-xs font-heading text-secondary">{formatTimestamp(comment.timestamp)}</span>
            </div>
            <p className="text-sm text-white/80">{comment.body}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
