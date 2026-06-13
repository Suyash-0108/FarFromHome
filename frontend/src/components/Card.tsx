import React from 'react';
import { cn } from '../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glowEffect = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'glass-panel rounded-xl p-6 transition-all duration-300',
          glowEffect && 'hover:glow-primary',
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';
