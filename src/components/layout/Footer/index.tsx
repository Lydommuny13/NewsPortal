import { Newspaper } from 'lucide-react';
import { useLanguageStore } from '../../../stores/useLanguageStore';
import { FooterNewsletter } from './FooterNewsletter';
import { FooterLinks } from './FooterLinks';
import { FooterSocial } from './FooterSocial';
import { FooterThemeToggle } from './FooterThemeToggle';

export function Footer() {
  const { language } = useLanguageStore();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Brand and Newsletter */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Newspaper className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {language === 'km' ? 'ព័ត៌មាន' : 'News'}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'km'
                  ? 'ប្រភពព័ត៌មានដែលអាចជឿទុកចិត្តបាន និងទាន់ហេតុការណ៍'
                  : 'Your trusted source for reliable and timely news coverage'}
              </p>
            </div>
            <FooterNewsletter />
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <FooterLinks />
          </div>

          {/* Social Links and Theme Toggle */}
          <div className="lg:col-span-1 space-y-8">
            <FooterSocial />
            <FooterThemeToggle />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} {language === 'km' ? 'រក្សាសិទ្ធិគ្រប់យ៉ាងដោយ ថុល លីឧត្តមមុនី' : 'All rights reserved by Thol Lyudommuny​​​'}
          </p>
        </div>
      </div>
    </footer>
  );
}