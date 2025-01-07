import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { useDeleteArticle } from '../../hooks/useDeleteArticle';
import { Button } from '../ui/Button';
import { DeleteConfirmDialog } from '../ui/DeleteConfirmDialog';

interface DeleteArticleButtonProps {
  articleId: string;
  articleTitle: string;
}

export function DeleteArticleButton({ articleId, articleTitle }: DeleteArticleButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { language } = useLanguageStore();
  const { mutate: deleteArticle, isLoading } = useDeleteArticle();

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setShowConfirm(true)}
        className="text-red-600 hover:text-red-700"
      >
        <Trash2 className="w-4 h-4 mr-2" />
        {language === 'km' ? 'លុប' : 'Delete'}
      </Button>

      <DeleteConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => deleteArticle(articleId)}
        title={language === 'km' ? 'លុបអត្ថបទ' : 'Delete Article'}
        message={
          language === 'km'
            ? `តើអ្នកប្រាកដជាចង់លុបអត្ថបទ "${articleTitle}" មែនទេ?`
            : `Are you sure you want to delete "${articleTitle}"?`
        }
        isLoading={isLoading}
      />
    </>
  );
}