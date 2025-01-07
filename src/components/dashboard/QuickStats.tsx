import { useLanguageStore } from '../../stores/useLanguageStore';
import { useUserStats } from '../../hooks/useUserStats';

export function QuickStats() {
  const { language } = useLanguageStore();
  const { data: stats, isLoading } = useUserStats();

  if (isLoading) {
    return <div className="h-24 bg-white dark:bg-gray-800 rounded-lg animate-pulse" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        label={language === 'km' ? 'អត្ថបទសរុប' : 'Total Articles'}
        value={stats?.totalArticles || 0}
      />
      <StatCard
        label={language === 'km' ? 'អត្ថបទបានផ្សព្វផ្សាយ' : 'Published'}
        value={stats?.publishedArticles || 0}
      />
      <StatCard
        label={language === 'km' ? 'មតិយោបល់' : 'Comments'}
        value={stats?.totalComments || 0}
      />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
        {value.toLocaleString()}
      </p>
    </div>
  );
}