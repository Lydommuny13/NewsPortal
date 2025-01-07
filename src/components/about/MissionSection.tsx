import { motion } from 'framer-motion';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { Award, Globe2, Users2 } from 'lucide-react';

const values = [
  {
    icon: Globe2,
    title: { en: 'Global Coverage', km: 'ព័ត៌មានពិភពលោក' },
    description: {
      en: 'Delivering comprehensive news coverage from around the world',
      km: 'ផ្តល់ព័ត៌មានគ្រប់ជ្រុងជ្រោយពីជុំវិញពិភពលោក'
    }
  },
  {
    icon: Award,
    title: { en: 'Excellence', km: 'ភាពឆ្នើម' },
    description: {
      en: 'Maintaining the highest standards of journalism',
      km: 'រក្សាស្តង់ដារខ្ពស់បំផុតនៃសារព័ត៌មាន'
    }
  },
  {
    icon: Users2,
    title: { en: 'Community Focus', km: 'ផ្តោតលើសហគមន៍' },
    description: {
      en: 'Serving our community with relevant and impactful stories',
      km: 'បម្រើសហគមន៍របស់យើងជាមួយនឹងរឿងរ៉ាវដែលពាក់ព័ន្ធ និងមានឥទ្ធិពល'
    }
  }
];

export function MissionSection() {
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
          {language === 'km' ? 'បេសកកម្មរបស់យើង' : 'Our Mission'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {language === 'km'
            ? 'យើងប្តេជ្ញាផ្តល់ព័ត៌មានដែលអាចជឿទុកចិត្តបាន និងមានតម្លាភាព ដើម្បីអោយអ្នកអានយល់ដឹងកាន់តែច្បាស់អំពីពិភពលោកជុំវិញយើង'
            : 'We are dedicated to providing reliable and transparent news coverage, empowering our readers with a clearer understanding of the world around us'}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center"
          >
            <value.icon className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {language === 'km' ? value.title.km : value.title.en}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'km' ? value.description.km : value.description.en}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}