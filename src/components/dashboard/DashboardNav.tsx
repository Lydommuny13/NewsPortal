import { Link } from 'react-router-dom';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { FileText, BookOpen, MessageSquare } from 'lucide-react';

export function DashboardNav() {
  const { language } = useLanguageStore();
  
  const links = [
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
    }
  ];

  return (
    <nav className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className="flex items-center p-4 space-x-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <span className="text-blue-600 dark:text-blue-400">{link.icon}</span>
          <span className="font-medium dark:text-gray-200">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}