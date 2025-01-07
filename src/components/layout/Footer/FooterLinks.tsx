import { Link } from 'react-router-dom';
import { useLanguageStore } from '../../../stores/useLanguageStore';
import { useCategories } from '../../../hooks/useCategories';

interface FooterSection {
  title: string;
  title_km: string;
  type: 'categories' | 'static';
  links: Array<{
    label: string;
    label_km: string;
    href: string;
  }>;
}

const staticSections: FooterSection[] = [
  {
    title: 'Company',
    title_km: 'ក្រុមហ៊ុន',
    type: 'static',
    links: [
      { label: 'About Us', label_km: 'អំពីយើង', href: '/about' },
      { label: 'Contact', label_km: 'ទំនាក់ទំនង', href: '/contact' },
      { label: 'Careers', label_km: 'ការងារ', href: '/careers' },
      { label: 'Press', label_km: 'សារព័ត៌មាន', href: '/press' }
    ]
  },
  {
    title: 'Legal',
    title_km: 'ច្បាប់',
    type: 'static',
    links: [
      { label: 'Privacy Policy', label_km: 'គោលការណ៍ភាពឯកជន', href: '/privacy' },
      { label: 'Terms of Service', label_km: 'លក្ខខណ្ឌសេវាកម្ម', href: '/terms' },
      { label: 'Cookie Policy', label_km: 'គោលការណ៍ខូគី', href: '/cookies' }
    ]
  }
];

export function FooterLinks() {
  const { language } = useLanguageStore();
  const { data: categories } = useCategories();

  // Create categories section if categories exist
  const categoriesSection: FooterSection | null = categories?.length ? {
    title: 'Categories',
    title_km: 'ប្រភេទ',
    type: 'categories',
    links: categories.map(cat => ({
      label: cat.name,
      label_km: cat.name_km,
      href: `/category/${cat.slug}`
    }))
  } : null;

  // Combine categories with static sections
  const allSections = categoriesSection 
    ? [categoriesSection, ...staticSections]
    : staticSections;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
      {allSections.map((section) => (
        <div key={section.title} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {language === 'km' ? section.title_km : section.title}
          </h3>
          <ul className="space-y-2">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {language === 'km' ? link.label_km : link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}