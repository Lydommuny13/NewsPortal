import { useLanguageStore } from '../../../stores/useLanguageStore';
import { useStats } from '../../../hooks/useStats';
import { StatCard } from './StatCard';

export function AdminStats() {
  const { language } = useLanguageStore();
  const { data: stats, isLoading } = useStats();
  
  if (isLoading) {
    return <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-24 bg-white dark:bg-gray-800 rounded-lg animate-pulse" />
      ))}
    </div>;
  }

  const statItems = [
    {
      label: language === 'km' ? 'អ្នកប្រើប្រាស់សរុប' : 'Total Users',
      value: stats?.totalUsers || 0
    },
    {
      label: language === 'km' ? 'អត្ថបទសរុប' : 'Total Articles',
      value: stats?.totalArticles || 0
    },
    {
      label: language === 'km' ? 'មតិយោបល់សរុប' : 'Total Comments',
      value: stats?.totalComments || 0
    },
    {
      label: language === 'km' ? 'អត្ថបទថ្មី' : 'New Articles',
      value: stats?.newArticles || 0,
      subtitle: language === 'km' ? 'ក្នុងសប្តាហ៍នេះ' : 'This week'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statItems.map((stat, index) => (
        <StatCard
          key={index}
          label={stat.label}
          value={stat.value}
          subtitle={stat.subtitle}
        />
      ))}
    </div>
  );
}