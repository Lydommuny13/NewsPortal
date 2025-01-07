import { useLanguageStore } from '../../stores/useLanguageStore';
import { AdminNav } from './components/AdminNav';
import { AdminStats } from './components/AdminStats';
import { RecentArticles } from './components/RecentArticles';

export function AdminDashboardPage() {
  const { language } = useLanguageStore();
  
  return (
    <div className="space-y-6">
      <div className="border-b dark:border-gray-700 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'km' ? 'ផ្ទាំងគ្រប់គ្រងអ្នកគ្រប់គ្រង' : 'Admin Dashboard'}
        </h1>
      </div>
      
      <AdminNav />
      <AdminStats />
      <RecentArticles />
    </div>
  );
}