import { motion } from 'framer-motion';
import { useLanguageStore } from '../stores/useLanguageStore';
import { TeamSection } from '../components/about/TeamSection';
import { MissionSection } from '../components/about/MissionSection';
import { StatsSection } from '../components/about/StatsSection';
import { ContactSection } from '../components/about/ContactSection';

export function AboutPage() {
  const { language } = useLanguageStore();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-[60vh] min-h-[400px] -mx-4 sm:-mx-6 lg:-mx-8 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative text-center text-white px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            {language === 'km' ? 'អំពីយើង' : 'About Us'}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl max-w-2xl mx-auto"
          >
            {language === 'km'
              ? 'យើងប្តេជ្ញាផ្តល់ព័ត៌មានពិត និងទាន់ហេតុការណ៍'
              : 'We are committed to delivering accurate and timely news coverage'}
          </motion.p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <MissionSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Team Section */}
      <TeamSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}