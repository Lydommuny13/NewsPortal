import { motion } from 'framer-motion';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { SearchBar } from '../search/SearchBar';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  isSearching?: boolean;
}

export function HeroSection({ onSearch, isSearching }: HeroSectionProps) {
  const { language } = useLanguageStore();

  return (
    <section className="relative h-[60vh] min-h-[400px] bg-gradient-to-r from-blue-600 to-purple-600 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-white text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          {language === 'km' 
            ? 'ស្វាគមន៍មកកាន់ព័ត៌មានថ្មីៗ' 
            : 'Welcome to Latest News'}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl mb-8 max-w-2xl"
        >
          {language === 'km'
            ? 'ស្វែងរកព័ត៌មានថ្មីៗ និងអត្ថបទល្អៗជាច្រើនទៀត'
            : 'Discover the latest news and trending stories'}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-xl"
        >
          <SearchBar 
            onSearch={onSearch}
            isLoading={isSearching}
            className="bg-white/10 backdrop-blur-md shadow-xl" 
          />
        </motion.div>
      </div>
    </section>
  );
}