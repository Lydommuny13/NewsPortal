import { useLanguageStore } from '../../stores/useLanguageStore';
import { Button } from './Button';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

export function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading
}: DeleteConfirmDialogProps) {
  const { language } = useLanguageStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-2 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
        
        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            {language === 'km' ? 'បោះបង់' : 'Cancel'}
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            isLoading={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {language === 'km' ? 'លុប' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
}