import { useLanguageStore } from '../../../stores/useLanguageStore';
import { Article } from '../../../types';
import { ArticleGrid } from '../ArticleGrid';

interface LatestArticlesProps {
  articles: Article[];
}

export function LatestArticles({ articles }: LatestArticlesProps) {
  const { language } = useLanguageStore();

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">
        {language === 'km' ? 'អត្ថបទថ្មីៗ' : 'Latest Articles'}
      </h2>
      <ArticleGrid articles={articles} />
    </section>
  );
}