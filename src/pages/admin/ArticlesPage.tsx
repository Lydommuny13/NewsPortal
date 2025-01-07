import { useLanguageStore } from '../../stores/useLanguageStore';
import { AdminArticleList } from './components/articles/AdminArticleList';

export function ArticlesPage() {
  const { language } = useLanguageStore();
  
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold">
          {language === 'km' ? 'គ្រប់គ្រងអត្ថបទ' : 'Manage Articles'}
        </h1>
      </div>
      <AdminArticleList />
    </div>
  );
}