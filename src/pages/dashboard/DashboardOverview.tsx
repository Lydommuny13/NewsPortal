import { useLanguageStore } from '../../stores/useLanguageStore';
import { QuickStats } from '../../components/dashboard/QuickStats';
import { DraftArticles } from '../../components/dashboard/DraftArticles';
import { MyArticles } from '../../components/dashboard/MyArticles';

export function DashboardOverview() {
  const { language } = useLanguageStore();

  return (
    <div className="space-y-6">
      <div className="border-b dark:border-gray-700 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'km' ? 'ទិដ្ឋភាពទូទៅ' : 'Overview'}
        </h1>
      </div>
      
      <QuickStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MyArticles />
        <DraftArticles />
      </div>
    </div>
  );
}