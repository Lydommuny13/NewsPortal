import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'className'> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  multiline?: boolean;
  rows?: number;
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ label, error, icon, multiline, rows = 3, ...props }, ref) => {
    const inputClasses = clsx(
      'w-full border rounded-md shadow-sm',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
      'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
      'border-gray-300 dark:border-gray-700',
      'placeholder-gray-500 dark:placeholder-gray-400',
      icon ? 'pl-10 pr-3' : 'px-3',
      'py-2',
      error && 'border-red-500 dark:border-red-500'
    );

    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          {multiline ? (
            <textarea
              {...(props as InputHTMLAttributes<HTMLTextAreaElement>)}
              ref={ref as any}
              rows={rows}
              className={inputClasses}
            />
          ) : (
            <input
              {...(props as InputHTMLAttributes<HTMLInputElement>)}
              ref={ref as any}
              className={inputClasses}
            />
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';