import { useLanguageStore } from '../stores/useLanguageStore';
import { DashboardNav } from '../components/dashboard/DashboardNav';
import { MyArticles } from '../components/dashboard/MyArticles';
import { DraftArticles } from '../components/dashboard/DraftArticles';
import { QuickStats } from '../components/dashboard/QuickStats';

export function DashboardPage() {
  const { language } = useLanguageStore();

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold">
          {language === 'km' ? 'ផ្ទាំងគ្រប់គ្រង' : 'Dashboard'}
        </h1>
      </div>
      
      <DashboardNav />
      <QuickStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MyArticles />
        <DraftArticles />
      </div>
    </div>
  );
}