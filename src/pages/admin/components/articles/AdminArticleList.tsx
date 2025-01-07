import { useLanguageStore } from '../../../../stores/useLanguageStore';
import { useAllArticles } from '../../../../hooks/admin/useAllArticles';
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner';
import { formatDate } from '../../../../utils/date';

export function AdminArticleList() {
  const { language } = useLanguageStore();
  const { data: articles, isLoading } = useAllArticles();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">
                {language === 'km' ? 'ចំណងជើង' : 'Title'}
              </th>
              <th className="text-left p-4">
                {language === 'km' ? 'អ្នកនិពន្ធ' : 'Author'}
              </th>
              <th className="text-left p-4">
                {language === 'km' ? 'ស្ថានភាព' : 'Status'}
              </th>
              <th className="text-left p-4">
                {language === 'km' ? 'កាលបរិច្ឆេទ' : 'Date'}
              </th>
              <th className="text-left p-4">
                {language === 'km' ? 'សកម្មភាព' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {articles?.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="p-4">
                  {language === 'km' ? article.title_km : article.title}
                </td>
                <td className="p-4">
                  {article.author?.username || article.author?.email}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    article.status === 'published' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {article.status === 'published' 
                      ? (language === 'km' ? 'បានផ្សព្វផ្សាយ' : 'Published')
                      : (language === 'km' ? 'សេចក្តីព្រាង' : 'Draft')}
                  </span>
                </td>
                <td className="p-4">
                  {formatDate(article.created_at, language)}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => window.location.href = `/dashboard/articles/${article.id}/edit`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    {language === 'km' ? 'កែសម្រួល' : 'Edit'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}