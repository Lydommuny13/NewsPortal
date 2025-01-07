import { TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Article } from '../../../types';
import { useLanguageStore } from '../../../stores/useLanguageStore';
import { motion } from 'framer-motion';

interface TrendingSectionProps {
  articles: Article[];
}

export function TrendingSection({ articles }: TrendingSectionProps) {
  const { language } = useLanguageStore();
  const trendingArticles = articles
    .sort((a, b) => (b.trending_score || 0) - (a.trending_score || 0))
    .slice(0, 4);

  if (!trendingArticles.length) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'km' ? 'កំពុងពេញនិយម' : 'Trending'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingArticles.map((article, index) => (
          <TrendingCard key={article.id} article={article} index={index} />
        ))}
      </div>
    </section>
  );
}

function TrendingCard({ article, index }: { article: Article; index: number }) {
  const { language } = useLanguageStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/articles/${article.slug}`} className="group">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="aspect-video relative">
            <img
              src={article.featured_image || `https://source.unsplash.com/random/400x300?news&sig=${article.id}`}
              alt={language === 'km' ? article.title_km : article.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-0.5 text-sm rounded-full">
              #{index + 1}
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {language === 'km' ? article.title_km : article.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {language === 'km' ? article.excerpt_km : article.excerpt}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}