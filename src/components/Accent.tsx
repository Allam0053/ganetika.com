import clsx from 'clsx';
import * as React from 'react';

type AccentType = React.ComponentPropsWithoutRef<'span'>;

export default function Accent({ children, className }: AccentType) {
  return (
    <span
      className={clsx(
        className,
        'transition-colors',
        'bg-gradient-to-tr from-yellow-300/40 via-yellow-300/40 to-yellow-400/40',
        'dark:from-yellow-400 dark:to-yellow-500 dark:bg-clip-text dark:text-transparent'
      )}
    >
      {children}
    </span>
  );
}
