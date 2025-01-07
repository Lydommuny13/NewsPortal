import { Article } from '../../../types';
import { FeaturedArticle } from '../FeaturedArticle';

interface FeaturedSectionProps {
  article: Article;
}

export function FeaturedSection({ article }: FeaturedSectionProps) {
  return (
    <section className="mb-12">
      <FeaturedArticle article={article} />
    </section>
  );
}