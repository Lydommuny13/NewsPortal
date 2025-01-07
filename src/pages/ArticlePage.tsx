import { useParams } from 'react-router-dom';
import { useLanguageStore } from '../stores/useLanguageStore';
import { useArticleBySlug } from '../hooks/useArticleBySlug';
import { ArticleHeader } from '../components/articles/ArticleHeader';
import { ArticleContent } from '../components/articles/ArticleContent';
import { CommentList } from '../components/comments/CommentList';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguageStore();
  const { data: article, isLoading } = useArticleBySlug(slug!);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!article) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'km' 
            ? 'រកមិនឃើញអត្ថបទ' 
            : 'Article not found'}
        </p>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      {article.featured_image && (
        <div className="aspect-video relative mb-8 rounded-xl overflow-hidden">
          <img
            src={article.featured_image}
            alt={language === 'km' ? article.title_km : article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}
      
      <ArticleHeader article={article} />
      <ArticleContent article={article} />

      <div className="mt-12 pt-8 border-t dark:border-gray-700">
        <CommentList articleId={article.id} />
      </div>
    </article>
  );
}