import { useState, useEffect } from 'react';
import { Search as SearchIcon, X, Loader2 } from 'lucide-react';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  className?: string;
  initialQuery?: string;
}

export function SearchBar({ 
  onSearch, 
  isLoading = false,
  className = '', 
  initialQuery = '' 
}: SearchBarProps) {
  const { language } = useLanguageStore();
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={`relative group ${className}`}>
      <motion.div
        initial={false}
        animate={{
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused 
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }}
        className="relative rounded-lg overflow-hidden bg-white/95 backdrop-blur-sm"
      >
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={
            language === 'km' 
              ? 'ស្វែងរកអត្ថបទ...' 
              : 'Search articles...'
          }
          className="w-full pl-10 pr-10 py-3 text-gray-900 placeholder-gray-500 bg-transparent border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg transition-colors"
        />
        
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
              </motion.div>
            ) : (
              <motion.div
                key="search"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <SearchIcon className="w-5 h-5 text-gray-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}