import { Link } from 'react-router-dom';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { useMyArticles } from '../../hooks/useMyArticles';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Article } from '../../types';
import { formatDate } from '../../utils/date';

export function MyArticles() {
  const { language } = useLanguageStore();
  const { data: articles, isLoading } = useMyArticles();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!articles?.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          {language === 'km' ? 'អត្ថបទរបស់ខ្ញុំ' : 'My Articles'}
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'km' 
              ? 'អ្នកមិនទាន់មានអត្ថបទនៅឡើយទេ' 
              : 'You have no articles yet'}
          </p>
          <Link
            to="/dashboard/articles/new"
            className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            {language === 'km' ? 'បង្កើតអត្ថបទថ្មី' : 'Create your first article'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-6 border-b dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {language === 'km' ? 'អត្ថបទរបស់ខ្ញុំ' : 'My Articles'}
        </h2>
        <Link
          to="/dashboard/articles/new"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
        >
          {language === 'km' ? 'បង្កើតអត្ថបទថ្មី' : 'New Article'}
        </Link>
      </div>

      <div className="divide-y dark:divide-gray-700">
        {articles.map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

function ArticleItem({ article }: { article: Article }) {
  const { language } = useLanguageStore();
  const statusColors = {
    published: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400',
    draft: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
  };

  return (
    <div className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50">
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 dark:text-white">
          {language === 'km' ? article.title_km : article.title}
        </h3>
        <div className="flex items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
          <span className={`px-2 py-0.5 rounded-full ${statusColors[article.status]}`}>
            {article.status === 'published' 
              ? (language === 'km' ? 'បានផ្សព្វផ្សាយ' : 'Published')
              : (language === 'km' ? 'សេចក្តីព្រាង' : 'Draft')}
          </span>
          <time>{formatDate(article.created_at, language)}</time>
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