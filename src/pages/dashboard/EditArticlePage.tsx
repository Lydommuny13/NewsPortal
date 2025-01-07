import { useParams } from 'react-router-dom';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { ArticleForm } from '../../components/articles/ArticleForm';
import { useArticle } from '../../hooks/useArticle';
import { useUpdateArticle } from '../../hooks/useUpdateArticle';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { DeleteArticleButton } from '../../components/articles/DeleteArticleButton';

export function EditArticlePage() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguageStore();
  const { data: article, isLoading: isLoadingArticle } = useArticle(id!);
  const { mutate: updateArticle, isLoading: isUpdating } = useUpdateArticle(id!);

  if (isLoadingArticle) {
    return <LoadingSpinner />;
  }

  if (!article) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          {language === 'km' ? 'រកមិនឃើញអត្ថបទ' : 'Article not found'}
        </p>
      </div>
    );
  }

  const initialData = {
    title: article.title,
    title_km: article.title_km,
    content: article.content,
    content_km: article.content_km,
    excerpt: article.excerpt || '',
    excerpt_km: article.excerpt_km || '',
    featured_image: article.featured_image || '',
    category_id: article.category_id || '',
    status: article.status as 'draft' | 'published'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold">
          {language === 'km' ? 'កែសម្រួលអត្ថបទ' : 'Edit Article'}
        </h1>
        <DeleteArticleButton 
          articleId={article.id} 
          articleTitle={language === 'km' ? article.title_km : article.title} 
        />
      </div>

      <ArticleForm
        onSubmit={updateArticle}
        isLoading={isUpdating}
        initialData={initialData}
      />
    </div>
  );
}