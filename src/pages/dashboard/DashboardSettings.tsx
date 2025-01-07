import { useLanguageStore } from '../../stores/useLanguageStore';
import { useThemeStore } from '../../stores/useThemeStore';
import { BackButton } from '../../components/ui/BackButton';
import { Moon, Sun } from 'lucide-react';

export function DashboardSettings() {
  const { language } = useLanguageStore();
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="space-y-6">
      <div className="border-b dark:border-gray-700 pb-4">
        <BackButton to="/dashboard" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'km' ? 'ការកំណត់' : 'Settings'}
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            {language === 'km' ? 'រូបរាង' : 'Appearance'}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-lg border-2 transition-all ${
                theme === 'light'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-600/50'
              }`}
            >
              <div className="flex items-center justify-center mb-3">
                <Sun className="w-8 h-8 text-orange-400" />
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {language === 'km' ? 'ភ្លឺ' : 'Light'}
              </p>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-lg border-2 transition-all ${
                theme === 'dark'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-600/50'
              }`}
            >
              <div className="flex items-center justify-center mb-3">
                <Moon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {language === 'km' ? 'ងងឹត' : 'Dark'}
              </p>
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {language === 'km' 
              ? 'ជ្រើសរើសរូបរាងដែលអ្នកចូលចិត្ត។'
              : 'Choose your preferred appearance.'}
          </p>
        </div>
      </div>
    </div>
  );
}