import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useLanguageStore } from '../../../stores/useLanguageStore';
import { useRecentArticles } from '../../../hooks/useRecentArticles';
import { Article } from '../../../types';

export function RecentArticles() {
  const { language } = useLanguageStore();
  const { data: articles, isLoading } = useRecentArticles();
  
  if (isLoading) {
    return <div className="h-64 bg-white dark:bg-gray-800 rounded-lg animate-pulse" />;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-6 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {language === 'km' ? 'អត្ថបទថ្មីៗ' : 'Recent Articles'}
        </h2>
      </div>
      
      <div className="divide-y dark:divide-gray-700">
        {articles?.map((article) => (
          <ArticleItem key={article.id} article={article} language={language} />
        ))}

        {articles?.length === 0 && (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            {language === 'km' 
              ? 'មិនមានអត្ថបទថ្មីៗនៅឡើយទេ' 
              : 'No recent articles'}
          </div>
        )}
      </div>
    </div>
  );
}

interface ArticleItemProps {
  article: Article;
  language: 'km' | 'en';
}

function ArticleItem({ article, language }: ArticleItemProps) {
  const statusColors = {
    published: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400',
    draft: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
  };

  return (
    <div className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50">
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 dark:text-white">
          {language === 'km' ? article.title_km : article.title}
        </h3>
        <div className="flex items-center gap-3 mt-2 text-sm">
          <span className={`px-2 py-0.5 rounded-full ${statusColors[article.status]}`}>
            {article.status === 'published' 
              ? (language === 'km' ? 'បានផ្សព្វផ្សាយ' : 'Published')
              : (language === 'km' ? 'សេចក្តីព្រាង' : 'Draft')}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {format(new Date(article.created_at), 'PPP')}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {article.status === 'published' && (
          <>
            <Link
              to={`/articles/${article.slug}`}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm font-medium"
            >
              {language === 'km' ? 'មើល' : 'View'}
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
          </>
        )}
        <Link
          to={`/dashboard/articles/${article.id}/edit`}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
        >
          {language === 'km' ? 'កែសម្រួល' : 'Edit'}
        </Link>
      </div>
    </div>
  );
}