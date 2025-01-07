import { Article } from '../../types';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { formatDate } from '../../utils/date';

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const { language } = useLanguageStore();

  return (
    <header className="space-y-4 mb-8">
      {article.category && (
        <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
          {language === 'km' ? article.category.name_km : article.category.name}
        </div>
      )}
      
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        {language === 'km' ? article.title_km : article.title}
      </h1>
      
      <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
        {article.author && (
          <div className="flex items-center gap-2">
            {article.author.avatar_url ? (
              <img
                src={article.author.avatar_url}
                alt={article.author.full_name || article.author.username}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
            )}
            <span>
              {article.author.full_name || article.author.username}
            </span>
          </div>
        )}
        <time>{formatDate(article.created_at, language)}</time>
      </div>
    </header>
  );
}