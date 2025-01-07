import { useState } from 'react';
import { Send } from 'lucide-react';
import { useLanguageStore } from '../../../stores/useLanguageStore';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

export function FooterNewsletter() {
  const { language } = useLanguageStore();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement newsletter subscription
    await new Promise(resolve => setTimeout(resolve, 1000));
    setEmail('');
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {language === 'km' ? 'ចុះឈ្មោះដើម្បីទទួលព័ត៌មាន' : 'Subscribe to Newsletter'}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {language === 'km'
          ? 'ទទួលបានព័ត៌មានថ្មីៗប្រចាំសប្តាហ៍'
          : 'Get weekly updates straight to your inbox'}
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={language === 'km' ? 'បញ្ចូលអ៊ីមែល' : 'Enter your email'}
          required
          className="flex-1"
        />
        <Button type="submit" isLoading={isLoading}>
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}