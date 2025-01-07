import { motion } from 'framer-motion';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { MapPin, Phone, Mail } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: { en: 'Address', km: 'អាសយដ្ឋាន' },
    content: {
      en: '123 News Street, Phnom Penh, Cambodia',
      km: '១២៣ ផ្លូវព័ត៌មាន, រាជធានីភ្នំពេញ, ប្រទេសកម្ពុជា'
    }
  },
  {
    icon: Phone,
    title: { en: 'Phone', km: 'ទូរស័ព្ទ' },
    content: { en: '+855 23 123 456', km: '+៨៥៥ ២៣ ១២៣ ៤៥៦' }
  },
  {
    icon: Mail,
    title: { en: 'Email', km: 'អ៊ីមែល' },
    content: { en: 'contact@news.com', km: 'contact@news.com' }
  }
];

export function ContactSection() {
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
          {language === 'km' ? 'ទំនាក់ទំនង' : 'Contact Us'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {language === 'km'
            ? 'យើងរង់ចាំស្តាប់មតិយោបល់របស់អ្នក'
            : 'We would love to hear from you'}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {contactInfo.map((info, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center"
          >
            <info.icon className="w-8 h-8 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              {language === 'km' ? info.title.km : info.title.en}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'km' ? info.content.km : info.content.en}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}