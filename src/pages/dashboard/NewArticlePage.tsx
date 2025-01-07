import { useLanguageStore } from '../../stores/useLanguageStore';
import { ArticleForm } from '../../components/articles/ArticleForm';
import { useCreateArticle } from '../../hooks/useCreateArticle';
import { BackButton } from '../../components/ui/BackButton';

export function NewArticlePage() {
  const { language } = useLanguageStore();
  const { mutate: createArticle, isLoading } = useCreateArticle();

  return (
    <div className="space-y-6">
      <div className="border-b dark:border-gray-700 pb-4">
        <BackButton to="/dashboard/articles" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'km' ? 'បង្កើតអត្ថបទថ្មី' : 'Create New Article'}
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <ArticleForm onSubmit={createArticle} isLoading={isLoading} />
      </div>
    </div>
  );
}