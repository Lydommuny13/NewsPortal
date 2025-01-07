import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../../stores/useThemeStore';
import { useLanguageStore } from '../../../stores/useLanguageStore';

export function FooterThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const { language } = useLanguageStore();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      title={
        language === 'km'
          ? theme === 'light' ? 'បិទពន្លឺ' : 'បើកពន្លឺ'
          : theme === 'light' ? 'Dark mode' : 'Light mode'
      }
    >
      <div className="relative w-6 h-6">
        <motion.div
          initial={false}
          animate={{
            scale: theme === 'light' ? 1 : 0,
            opacity: theme === 'light' ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Sun className="w-6 h-6" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            scale: theme === 'dark' ? 1 : 0,
            opacity: theme === 'dark' ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Moon className="w-6 h-6" />
        </motion.div>
      </div>
      <span>
        {language === 'km' 
          ? theme === 'light' ? 'បិទពន្លឺ' : 'បើកពន្លឺ'
          : theme === 'light' ? 'Dark mode' : 'Light mode'}
      </span>
    </button>
  );
}