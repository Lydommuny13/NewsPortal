import { Link } from 'react-router-dom';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { Article } from '../../types';
import { formatDate } from '../../utils/date';

interface ArticleGridProps {
  articles: Article[];
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  const { language } = useLanguageStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Link
          key={article.id}
          to={`/articles/${article.slug}`}
          className="group"
        >
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={article.featuredImage || `https://images.unsplash.com/photo-${article.id}?q=80&w=800`}
                alt={language === 'km' ? article.title_km : article.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-xl mb-2 group-hover:text-blue-600 transition-colors">
                {language === 'km' ? article.title_km : article.title}
              </h3>
              <p className="text-gray-600 line-clamp-2 mb-4">
                {language === 'km' ? article.excerpt_km : article.excerpt}
              </p>
              <time className="text-sm text-gray-500">
                {formatDate(article.created_at, language)}
              </time>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}