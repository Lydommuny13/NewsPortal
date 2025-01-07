import { motion } from 'framer-motion';
import { useLanguageStore } from '../../stores/useLanguageStore';

const stats = [
  {
    value: '10M+',
    label: { en: 'Monthly Readers', km: 'អ្នកអានប្រចាំខែ' }
  },
  {
    value: '50K+',
    label: { en: 'Articles Published', km: 'អត្ថបទបានផ្សព្វផ្សាយ' }
  },
  {
    value: '100+',
    label: { en: 'Countries Covered', km: 'ប្រទេសបានរាយការណ៍' }
  },
  {
    value: '24/7',
    label: { en: 'News Coverage', km: 'ការរាយការណ៍ព័ត៌មាន' }
  }
];

export function StatsSection() {
  const { language } = useLanguageStore();

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800/50 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100
              }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {language === 'km' ? stat.label.km : stat.label.en}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}