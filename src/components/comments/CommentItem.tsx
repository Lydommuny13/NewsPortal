import { formatDistanceToNow } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { useDeleteComment } from '../../hooks/useComments';
import { Comment } from '../../types';
import { Button } from '../ui/Button';

interface CommentItemProps {
  comment: Comment;
  articleId: string;
}

export function CommentItem({ comment, articleId }: CommentItemProps) {
  const { language } = useLanguageStore();
  const { user } = useAuthStore();
  const { mutate: deleteComment, isLoading } = useDeleteComment();

  const canDelete = user?.id === comment.user.id || user?.role === 'admin';
  const timeAgo = formatDistanceToNow(new Date(comment.created_at), { addSuffix: true });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          {comment.user.avatar_url ? (
            <img
              src={comment.user.avatar_url}
              alt={comment.user.full_name || comment.user.username}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-lg">
                {(comment.user.username || comment.user.full_name || 'A')[0].toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {comment.user.full_name || comment.user.username}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {comment.content}
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {timeAgo}
            </div>
          </div>
        </div>

        {canDelete && (
          <Button
            variant="secondary"
            onClick={() => deleteComment({ commentId: comment.id, articleId })}
            isLoading={isLoading}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}