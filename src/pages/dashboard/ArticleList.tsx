import { useLanguageStore } from '../../stores/useLanguageStore';
import { useMyArticles } from '../../hooks/useMyArticles';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/date';
import { Button } from '../../components/ui/Button';
import { PlusCircle } from 'lucide-react';

export function ArticleList() {
  const { language } = useLanguageStore();
  const { data: articles, isLoading } = useMyArticles();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b dark:border-gray-700 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'km' ? 'អត្ថបទរបស់ខ្ញុំ' : 'My Articles'}
        </h1>
        <Link to="/dashboard/articles/new">
          <Button>
            <PlusCircle className="w-4 h-4 mr-2" />
            {language === 'km' ? 'បង្កើតអត្ថបទថ្មី' : 'New Article'}
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left p-4 text-gray-900 dark:text-white">
                  {language === 'km' ? 'ចំណងជើង' : 'Title'}
                </th>
                <th className="text-left p-4 text-gray-900 dark:text-white">
                  {language === 'km' ? 'ស្ថានភាព' : 'Status'}
                </th>
                <th className="text-left p-4 text-gray-900 dark:text-white">
                  {language === 'km' ? 'កាលបរិច្ឆេទ' : 'Date'}
                </th>
                <th className="text-left p-4 text-gray-900 dark:text-white">
                  {language === 'km' ? 'សកម្មភាព' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {articles?.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="p-4 text-gray-900 dark:text-white">
                    {language === 'km' ? article.title_km : article.title}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      article.status === 'published' 
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                    }`}>
                      {article.status === 'published' 
                        ? (language === 'km' ? 'បានផ្សព្វផ្សាយ' : 'Published')
                        : (language === 'km' ? 'សេចក្តីព្រាង' : 'Draft')}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">
                    {formatDate(article.created_at, language)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/dashboard/articles/${article.id}/edit`}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                      >
                        {language === 'km' ? 'កែសម្រួល' : 'Edit'}
                      </Link>
                      {article.status === 'published' && (
                        <>
                          <span className="text-gray-300 dark:text-gray-600">|</span>
                          <Link
                            to={`/articles/${article.slug}`}
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm font-medium"
                          >
                            {language === 'km' ? 'មើល' : 'View'}
                          </Link>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}