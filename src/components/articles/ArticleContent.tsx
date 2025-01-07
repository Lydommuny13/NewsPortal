import { Article } from '../../types';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { renderMarkdown } from '../../utils/markdown';

interface ArticleContentProps {
  article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
  const { language } = useLanguageStore();
  const content = language === 'km' ? article.content_km : article.content;

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <div 
        dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
        className={language === 'km' ? 'km' : ''}
      />
    </div>
  );
}