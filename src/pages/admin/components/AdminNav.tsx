import { Link } from 'react-router-dom';
import { Users, FileText, Tags, MessageSquare } from 'lucide-react';
import { useLanguageStore } from '../../../stores/useLanguageStore';

export function AdminNav() {
  const { language } = useLanguageStore();
  
  const links = [
    { 
      icon: <Users className="w-5 h-5" />,
      label: language === 'km' ? 'អ្នកប្រើប្រាស់' : 'Users',
      href: '/admin/users' 
    },
    { 
      icon: <FileText className="w-5 h-5" />,
      label: language === 'km' ? 'អត្ថបទ' : 'Articles',
      href: '/admin/articles' 
    },
    { 
      icon: <Tags className="w-5 h-5" />,
      label: language === 'km' ? 'ប្រភេទ' : 'Categories',
      href: '/admin/categories' 
    },
    { 
      icon: <MessageSquare className="w-5 h-5" />,
      label: language === 'km' ? 'មតិយោបល់' : 'Comments',
      href: '/admin/comments' 
    }
  ];

  return (
    <nav className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className="flex items-center p-4 space-x-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <span className="text-blue-600 dark:text-blue-400">{link.icon}</span>
          <span className="font-medium text-gray-900 dark:text-white">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}