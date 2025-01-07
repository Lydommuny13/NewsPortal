import { motion } from 'framer-motion';
import { Article } from '../../types';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { ArticleCard } from '../home/ArticleCard';

interface SearchResultsProps {
  results: Article[];
  query: string;
  isLoading: boolean;
}

export function SearchResults({ results, query, isLoading }: SearchResultsProps) {
  const { language } = useLanguageStore();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
          >
            <div className="aspect-video bg-gray-200" />
            <div className="p-6 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (query && !results.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <p className="text-gray-600">
          {language === 'km' 
            ? `មិនមានលទ្ធផលសម្រាប់ "${query}"` 
            : `No results found for "${query}"`}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((article, index) => (
        <ArticleCard 
          key={article.id} 
          article={article}
          index={index}
        />
      ))}
    </div>
  );
}