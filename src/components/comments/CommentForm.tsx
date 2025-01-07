import { useState } from 'react';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { useCreateComment } from '../../hooks/useComments';
import { Button } from '../ui/Button';

interface CommentFormProps {
  articleId: string;
}

export function CommentForm({ articleId }: CommentFormProps) {
  const { language } = useLanguageStore();
  const [content, setContent] = useState('');
  const { mutate: createComment, isLoading } = useCreateComment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    createComment(
      { articleId, content },
      {
        onSuccess: () => setContent('')
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={
          language === 'km'
            ? 'សរសេរមតិយោបល់របស់អ្នក...'
            : 'Write your comment...'
        }
        rows={4}
        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
        required
      />
      <Button type="submit" isLoading={isLoading}>
        {language === 'km' ? 'បញ្ចេញមតិ' : 'Post Comment'}
      </Button>
    </form>
  );
}