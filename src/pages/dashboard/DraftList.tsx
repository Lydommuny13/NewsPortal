import { useLanguageStore } from '../../stores/useLanguageStore';
import { useDraftArticles } from '../../hooks/useDraftArticles';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/date';
import { BackButton } from '../../components/ui/BackButton';

export function DraftList() {
  const { language } = useLanguageStore();
  const { data: drafts, isLoading } = useDraftArticles();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="border-b dark:border-gray-700 pb-4">
        <BackButton to="/dashboard" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'km' ? 'សេចក្តីព្រាង' : 'Draft Articles'}
        </h1>
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
                  {language === 'km' ? 'កាលបរិច្ឆេទ' : 'Date'}
                </th>
                <th className="text-left p-4 text-gray-900 dark:text-white">
                  {language === 'km' ? 'សកម្មភាព' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {drafts?.map((draft) => (
                <tr key={draft.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="p-4 text-gray-900 dark:text-white">
                    {language === 'km' ? draft.title_km : draft.title}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">
                    {formatDate(draft.created_at, language)}
                  </td>
                  <td className="p-4">
                    <Link
                      to={`/dashboard/articles/${draft.id}/edit`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      {language === 'km' ? 'បន្តកែសម្រួល' : 'Continue Editing'}
                    </Link>
                  </td>
                </tr>
              ))}

              {drafts?.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-600 dark:text-gray-400">
                    {language === 'km' 
                      ? 'មិនមានសេចក្តីព្រាងនៅឡើយទេ' 
                      : 'No drafts found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}