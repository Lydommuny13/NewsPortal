import { motion } from 'framer-motion';
import { Article } from '../../../types';
import { useLanguageStore } from '../../../stores/useLanguageStore';
import { formatDate } from '../../../utils/date';
import { AlertCircle } from 'lucide-react';

interface BreakingNewsSectionProps {
  articles: Article[];
}

export function BreakingNewsSection({ articles }: BreakingNewsSectionProps) {
  const { language } = useLanguageStore();
  const breakingNews = articles.filter(article => article.is_breaking);

  if (!breakingNews.length) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 animate-pulse" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'km' ? 'ព័ត៌មានក្តៅៗ' : 'Breaking News'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {breakingNews.slice(0, 2).map((article, index) => (
          <BreakingNewsCard key={article.id} article={article} index={index} />
        ))}
      </div>
    </section>
  );
}

function BreakingNewsCard({ article, index }: { article: Article; index: number }) {
  const { language } = useLanguageStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative h-[400px] rounded-xl overflow-hidden group"
    >
      <img
        src={article.featured_image || `https://source.unsplash.com/random/800x600?news&sig=${article.id}`}
        alt={language === 'km' ? article.title_km : article.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
        <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium w-fit mb-4">
          {language === 'km' ? 'ព័ត៌មានក្តៅៗ' : 'Breaking'}
        </div>
        
        <h3 className="text-2xl font-bold mb-2 line-clamp-2">
          {language === 'km' ? article.title_km : article.title}
        </h3>
        
        <p className="text-gray-200 line-clamp-2 mb-4">
          {language === 'km' ? article.excerpt_km : article.excerpt}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-gray-300">
          {article.author && (
            <div className="flex items-center gap-2">
              {article.author.avatar_url ? (
                <img
                  src={article.author.avatar_url}
                  alt={article.author.full_name || article.author.username}
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-600" />
              )}
              <span>{article.author.full_name || article.author.username}</span>
            </div>
          )}
          <time>{formatDate(article.created_at, language)}</time>
        </div>
      </div>
    </motion.div>
  );
}