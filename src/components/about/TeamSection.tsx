import { motion } from 'framer-motion';
import { useLanguageStore } from '../../stores/useLanguageStore';

const team = [
  {
    name: { en: 'John Smith', km: 'ចន ស្មីត' },
    role: { en: 'Editor in Chief', km: 'ប្រធានអ្នកនិពន្ធ' },
    image: 'https://source.unsplash.com/random/400x400?portrait&sig=1'
  },
  {
    name: { en: 'Sarah Johnson', km: 'សារ៉ា ចនសុន' },
    role: { en: 'Senior Editor', km: 'អ្នកនិពន្ធជាន់ខ្ពស់' },
    image: 'https://source.unsplash.com/random/400x400?portrait&sig=2'
  },
  {
    name: { en: 'David Chen', km: 'ដេវីដ ចិន' },
    role: { en: 'Lead Reporter', km: 'អ្នកយកព័ត៌មានជាន់ខ្ពស់' },
    image: 'https://source.unsplash.com/random/400x400?portrait&sig=3'
  },
  {
    name: { en: 'Maria Garcia', km: 'ម៉ារីយ៉ា ហ្គាស៊ីយ៉ា' },
    role: { en: 'Senior Reporter', km: 'អ្នកយកព័ត៌មានជាន់ខ្ពស់' },
    image: 'https://source.unsplash.com/random/400x400?portrait&sig=4'
  }
];

export function TeamSection() {
  const { language } = useLanguageStore();

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {language === 'km' ? 'ក្រុមរបស់យើង' : 'Our Team'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {language === 'km'
            ? 'ជួបជាមួយក្រុមអ្នកជំនាញដែលធ្វើឱ្យរឿងរ៉ាវកើតឡើង'
            : 'Meet the dedicated professionals who make it all happen'}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ y: -5 }}
            className="text-center"
          >
            <div className="relative mb-4 aspect-square rounded-lg overflow-hidden">
              <img
                src={member.image}
                alt={language === 'km' ? member.name.km : member.name.en}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">
              {language === 'km' ? member.name.km : member.name.en}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'km' ? member.role.km : member.role.en}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}