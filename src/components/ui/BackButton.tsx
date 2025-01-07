import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { Button } from './Button';

interface BackButtonProps {
  to?: string;
  className?: string;
}

export function BackButton({ to, className = '' }: BackButtonProps) {
  const navigate = useNavigate();
  const { language } = useLanguageStore();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      className={`mb-4 ${className}`}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      {language === 'km' ? 'ត្រឡប់ក្រោយ' : 'Back'}
    </Button>
  );
}