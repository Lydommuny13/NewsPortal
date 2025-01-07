import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Article } from '../../types';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { formatDate } from '../../utils/date';

interface FeaturedArticleProps {
  article: Article;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const { language } = useLanguageStore();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-[500px] rounded-xl overflow-hidden"
    >
      <img
        src={article.featured_image || `https://source.unsplash.com/random/1920x1080?news&sig=${article.id}`}
        alt={language === 'km' ? article.title_km : article.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      
      <Link 
        to={`/articles/${article.slug}`}
        className="absolute inset-0 p-8 flex flex-col justify-end text-white"
      >
        {article.category && (
          <span className="absolute top-8 left-8 bg-blue-600 px-4 py-1 rounded-full text-sm font-medium">
            {language === 'km' ? article.category.name_km : article.category.name}
          </span>
        )}
        
        {article.is_breaking && (
          <span className="absolute top-8 right-8 bg-red-600 px-4 py-1 rounded-full text-sm font-medium">
            {language === 'km' ? 'ព័ត៌មានក្តៅៗ' : 'Breaking'}
          </span>
        )}
        
        <h2 className="text-4xl font-bold mb-4">
          {language === 'km' ? article.title_km : article.title}
        </h2>
        
        <p className="text-gray-200 line-clamp-2 mb-4">
          {language === 'km' ? article.excerpt_km : article.excerpt}
        </p>
        
        <div className="flex items-center gap-4 text-gray-300">
          <div className="flex items-center gap-2">
            {article.author?.avatar_url ? (
              <img
                src={article.author.avatar_url}
                alt={article.author.full_name || article.author.username}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-600" />
            )}
            <span>{article.author?.full_name || article.author?.username}</span>
          </div>
          <time>{formatDate(article.created_at, language)}</time>
        </div>
      </Link>
    </motion.div>
  );
}