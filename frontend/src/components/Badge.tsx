import React from 'react';
import { cn } from '../lib/utils';

export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  severity?: Severity;
  variant?: 'outline' | 'solid' | 'glow';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, severity = 'Low', variant = 'glow', ...props }, ref) => {
    
    const colors = {
      Critical: 'text-critical border-critical bg-critical/10',
      High: 'text-high border-high bg-high/10',
      Medium: 'text-medium border-medium bg-medium/10',
      Low: 'text-low border-low bg-low/10',
    };

    const glowColors = {
      Critical: 'glow-critical text-critical border-critical bg-critical/20',
      High: 'shadow-[0_0_15px_rgba(249,115,22,0.4)] text-high border-high bg-high/20',
      Medium: 'shadow-[0_0_15px_rgba(234,179,8,0.4)] text-medium border-medium bg-medium/20',
      Low: 'shadow-[0_0_15px_rgba(34,197,94,0.4)] text-low border-low bg-low/20',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-all duration-300',
          variant === 'glow' ? glowColors[severity] : colors[severity],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';
