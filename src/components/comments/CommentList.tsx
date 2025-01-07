import { useLanguageStore } from '../../stores/useLanguageStore';
import { useComments } from '../../hooks/useComments';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useAuthStore } from '../../stores/useAuthStore';

interface CommentListProps {
  articleId: string;
}

export function CommentList({ articleId }: CommentListProps) {
  const { language } = useLanguageStore();
  const { user } = useAuthStore();
  const { data: comments, isLoading } = useComments(articleId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {language === 'km' ? 'មតិយោបល់' : 'Comments'}
      </h2>

      {user ? (
        <CommentForm articleId={articleId} />
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'km' 
            ? 'សូមចូលគណនីដើម្បីបញ្ចេញមតិ' 
            : 'Please login to comment'}
        </p>
      )}

      <div className="space-y-4">
        {comments?.map((comment) => (
          <CommentItem 
            key={comment.id} 
            comment={comment}
            articleId={articleId}
          />
        ))}

        {comments?.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400 text-center py-4">
            {language === 'km'
              ? 'មិនទាន់មានមតិយោបល់នៅឡើយទេ'
              : 'No comments yet'}
          </p>
        )}
      </div>
    </div>
  );
}