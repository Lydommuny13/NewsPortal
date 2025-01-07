import { motion } from 'framer-motion';
import { Article } from '../../../types';
import { useLanguageStore } from '../../../stores/useLanguageStore';
import { ArticleCard } from '../ArticleCard';

interface CategoryNewsSectionProps {
  articles: Article[];
  selectedCategory: string | null;
}

export function CategoryNewsSection({ articles, selectedCategory }: CategoryNewsSectionProps) {
  const { language } = useLanguageStore();
  
  if (!articles.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'km' 
            ? 'មិនមានអត្ថបទនៅឡើយទេ' 
            : 'No articles found'}
        </p>
      </motion.div>
    );
  }

  return (
    <section className="mb-12">
      {selectedCategory && articles[0]?.category && (
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          {language === 'km' ? articles[0].category.name_km : articles[0].category.name}
        </h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <ArticleCard 
            key={article.id} 
            article={article}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}