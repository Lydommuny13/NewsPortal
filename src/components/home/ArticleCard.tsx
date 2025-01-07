import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Article } from '../../types';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { formatDate } from '../../utils/date';

interface ArticleCardProps {
  article: Article;
  index: number;
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  const { language } = useLanguageStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/articles/${article.slug}`}>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="aspect-video relative overflow-hidden">
            <img
              src={article.featured_image || `https://source.unsplash.com/random/800x600?news&sig=${article.id}`}
              alt={language === 'km' ? article.title_km : article.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {article.category && (
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 text-sm font-medium rounded-full">
                {language === 'km' ? article.category.name_km : article.category.name}
              </div>
            )}
            {article.is_breaking && (
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 text-sm font-medium rounded-full">
                {language === 'km' ? 'ព័ត៌មានក្តៅៗ' : 'Breaking'}
              </div>
            )}
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 line-clamp-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {language === 'km' ? article.title_km : article.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {language === 'km' ? article.excerpt_km : article.excerpt}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                {article.author?.avatar_url ? (
                  <img 
                    src={article.author.avatar_url} 
                    alt={article.author.full_name || article.author.username}
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700" />
                )}
                <span>{article.author?.full_name || article.author?.username}</span>
              </div>
              <time>{formatDate(article.created_at, language)}</time>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}