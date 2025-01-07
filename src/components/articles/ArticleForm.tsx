import { useState } from 'react';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { TextEditor } from './TextEditor';
import { ImageUpload } from './ImageUpload';
import { CategorySelect } from './CategorySelect';
import { ArticleFormData } from '../../types';

interface ArticleFormProps {
  onSubmit: (data: ArticleFormData) => void;
  isLoading?: boolean;
  initialData?: Partial<ArticleFormData>;
}

export function ArticleForm({ onSubmit, isLoading, initialData }: ArticleFormProps) {
  const { language } = useLanguageStore();
  const [formData, setFormData] = useState<ArticleFormData>({
    title: initialData?.title || '',
    title_km: initialData?.title_km || '',
    content: initialData?.content || '',
    content_km: initialData?.content_km || '',
    excerpt: initialData?.excerpt || '',
    excerpt_km: initialData?.excerpt_km || '',
    featured_image: initialData?.featured_image || '',
    category_id: initialData?.category_id || '',
    status: initialData?.status || 'draft'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const statusOptions = [
    { value: 'draft', label: language === 'km' ? 'សេចក្តីព្រាង' : 'Draft' },
    { value: 'published', label: language === 'km' ? 'បានផ្សព្វផ្សាយ' : 'Published' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ImageUpload
        value={formData.featured_image}
        onChange={(url) => setFormData({ ...formData, featured_image: url })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={language === 'km' ? 'ចំណងជើង (ភាសាអង់គ្លេស)' : 'Title (English)'}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Input
          label={language === 'km' ? 'ចំណងជើង (ភាសាខ្មែរ)' : 'Title (Khmer)'}
          value={formData.title_km}
          onChange={(e) => setFormData({ ...formData, title_km: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextEditor
          label={language === 'km' ? 'មាតិកា (ភាសាអង់គ្លេស)' : 'Content (English)'}
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <TextEditor
          label={language === 'km' ? 'មាតិកា (ភាសាខ្មែរ)' : 'Content (Khmer)'}
          value={formData.content_km}
          onChange={(value) => setFormData({ ...formData, content_km: value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={language === 'km' ? 'សេចក្តីសង្ខេប (ភាសាអង់គ្លេស)' : 'Excerpt (English)'}
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          multiline
          rows={3}
        />
        <Input
          label={language === 'km' ? 'សេចក្តីសង្ខេប (ភាសាខ្មែរ)' : 'Excerpt (Khmer)'}
          value={formData.excerpt_km}
          onChange={(e) => setFormData({ ...formData, excerpt_km: e.target.value })}
          multiline
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategorySelect
          value={formData.category_id}
          onChange={(value) => setFormData({ ...formData, category_id: value })}
          required
        />
        
        <Select
          label={language === 'km' ? 'ស្ថានភាព' : 'Status'}
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
          options={statusOptions}
        />
      </div>
      
      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full"
      >
        {formData.status === 'published' 
          ? (language === 'km' ? 'ផ្សព្វផ្សាយ' : 'Publish') 
          : (language === 'km' ? 'រក្សាទុក' : 'Save')}
      </Button>
    </form>
  );
}