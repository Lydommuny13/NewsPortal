import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { useDraftArticles } from '../../hooks/useDraftArticles';
import { Article } from '../../types';

export function DraftArticles() {
  const { language } = useLanguageStore();
  const { data: drafts, isLoading } = useDraftArticles();

  if (isLoading) {
    return <div className="h-64 bg-white dark:bg-gray-800 rounded-lg animate-pulse" />;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-6 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {language === 'km' ? 'សេចក្តីព្រាង' : 'Draft Articles'}
        </h2>
      </div>

      <div className="divide-y dark:divide-gray-700">
        {drafts?.map((draft: Article) => (
          <DraftItem key={draft.id} draft={draft} />
        ))}
      </div>
    </div>
  );
}

function DraftItem({ draft }: { draft: Article }) {
  const { language } = useLanguageStore();

  return (
    <div className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50">
      <div>
        <h3 className="font-medium text-gray-900 dark:text-white">
          {language === 'km' ? draft.title_km : draft.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {format(new Date(draft.created_at), 'PPP')}
        </p>
      </div>
      <Link
        to={`/dashboard/articles/${draft.id}/edit`}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
      >
        {language === 'km' ? 'បន្តកែសម្រួល' : 'Continue Editing'}
      </Link>
    </div>
  );
}