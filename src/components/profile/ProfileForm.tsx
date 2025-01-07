import { useState } from 'react';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Save } from 'lucide-react';

interface ProfileFormProps {
  initialData: {
    username?: string;
    fullName?: string;
  };
  userId: string;
}

export function ProfileForm({ initialData, userId }: ProfileFormProps) {
  const { language } = useLanguageStore();
  const { mutate: updateProfile, isLoading } = useUpdateProfile(userId);
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    updateProfile({
      username: formData.username || null,
      full_name: formData.fullName || null
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={language === 'km' ? 'ឈ្មោះអ្នកប្រើប្រាស់' : 'Username'}
          value={formData.username || ''}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder={language === 'km' ? 'បញ្ចូលឈ្មោះអ្នកប្រើប្រាស់' : 'Enter username'}
        />
        <Input
          label={language === 'km' ? 'ឈ្មោះពេញ' : 'Full Name'}
          value={formData.fullName || ''}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder={language === 'km' ? 'បញ្ចូលឈ្មោះពេញ' : 'Enter full name'}
        />
      </div>

      <Button type="submit" isLoading={isLoading}>
        <Save className="w-4 h-4 mr-2" />
        {language === 'km' ? 'រក្សាទុក' : 'Save Changes'}
      </Button>
    </form>
  );
}