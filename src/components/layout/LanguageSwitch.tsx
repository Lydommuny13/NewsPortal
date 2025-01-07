import { Globe } from 'lucide-react';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { Button } from '../ui/Button';

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguageStore();
  
  return (
    <Button
      variant="secondary"
      onClick={() => setLanguage(language === 'km' ? 'en' : 'km')}
      className="flex items-center gap-2"
    >
      <Globe className="w-4 h-4" />
      <span>{language === 'km' ? 'English' : 'ខ្មែរ'}</span>
    </Button>
  );
}