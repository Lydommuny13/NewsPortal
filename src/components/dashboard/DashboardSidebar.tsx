import { Link, useLocation } from 'react-router-dom';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  Settings,
  MessageSquare
} from 'lucide-react';
import { clsx } from 'clsx';

export function DashboardSidebar() {
  const { language } = useLanguageStore();
  const location = useLocation();

  const links = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: language === 'km' ? 'ទិដ្ឋភាពទូទៅ' : 'Overview',
      href: '/dashboard'
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: language === 'km' ? 'អត្ថបទរបស់ខ្ញុំ' : 'My Articles',
      href: '/dashboard/articles'
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: language === 'km' ? 'សេចក្តីព្រាង' : 'Drafts',
      href: '/dashboard/drafts'
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: language === 'km' ? 'មតិយោបល់' : 'Comments',
      href: '/dashboard/comments'
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: language === 'km' ? 'ការកំណត់' : 'Settings',
      href: '/dashboard/settings'
    }
  ];

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-white dark:bg-gray-800 border-r dark:border-gray-700">
      <nav className="h-full p-4 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={clsx(
              'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
              location.pathname === link.href
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            )}
          >
            {link.icon}
            <span className="ml-3">{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}