import { useLanguageStore } from '../../stores/useLanguageStore';
import { Article } from '../../types';
import { ArticleCard } from './ArticleCard';

interface ArticleListProps {
  articles?: Article[];
}

export function ArticleList({ articles = [] }: ArticleListProps) {
  const { language } = useLanguageStore();

  if (!articles?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'km' 
            ? 'មិនមានអត្ថបទនៅឡើយទេ' 
            : 'No articles found'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <ArticleCard 
          key={article.id} 
          article={article}
          index={index}
        />
      ))}
    </div>
  );
}