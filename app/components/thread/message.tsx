import React from 'react';
import classNames from 'classnames';
import { formatDistance } from 'date-fns';

export interface MessageProps {
  id: string;
  content: string;
  author: {
    id: string;
    isAI?: boolean;
  };
  timestamp: Date;
  isHighlighted?: boolean;
  className?: string;
}

export const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ 
    content,
    author,
    timestamp,
    isHighlighted = false,
    className
  }, ref) => {
    const messageClasses = classNames(
      'flex gap-4 p-4 transition-colors',
      isHighlighted ? 'bg-blue-50' : 'hover:bg-gray-50',
      className
    );

    return (
      <div ref={ref} className={messageClasses}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-gray-900">
              {author.isAI ? 'KitchenCraft' : 'You'}
            </span>
            <span className="text-sm text-gray-500">
              {formatDistance(timestamp, new Date(), { addSuffix: true })}
            </span>
          </div>

          <div className="mt-1 text-gray-900 whitespace-pre-wrap break-words">
            {content}
          </div>
        </div>
      </div>
    );
  }
);

Message.displayName = 'Message';