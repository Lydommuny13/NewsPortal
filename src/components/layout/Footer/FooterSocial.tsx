import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useLanguageStore } from '../../../stores/useLanguageStore';

const socialLinks = [
  {
    name: 'Facebook',
    icon: Facebook,
    href: 'https://facebook.com'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com'
  },
  {
    name: 'YouTube',
    icon: Youtube,
    href: 'https://youtube.com'
  }
];

export function FooterSocial() {
  const { language } = useLanguageStore();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {language === 'km' ? 'តាមដានយើង' : 'Follow Us'}
      </h3>
      <div className="flex gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            title={link.name}
          >
            <link.icon className="w-6 h-6" />
          </a>
        ))}
      </div>
    </div>
  );
}