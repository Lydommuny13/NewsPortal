import { useLanguageStore } from '../../stores/useLanguageStore';
import { BackButton } from '../../components/ui/BackButton';

export function CommentList() {
  const { language } = useLanguageStore();

  return (
    <div className="space-y-6">
      <div className="border-b dark:border-gray-700 pb-4">
        <BackButton to="/dashboard" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'km' ? 'មតិយោបល់' : 'Comments'}
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'km' 
              ? 'មុខងារមតិយោបល់នឹងមានក្នុងពេលឆាប់ៗនេះ' 
              : 'Comments feature coming soon'}
          </p>
        </div>
      </div>
    </div>
  );
}