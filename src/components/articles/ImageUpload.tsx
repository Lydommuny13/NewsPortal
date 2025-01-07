import { useRef, useState } from 'react';
import { Image, Upload } from 'lucide-react';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { supabase } from '../../lib/supabase';
import { Button } from '../ui/Button';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const { language } = useLanguageStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError(language === 'km' 
        ? 'ទំហំឯកសារត្រូវតែតិចជាង 5MB' 
        : 'File size must be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError(language === 'km'
        ? 'សូមជ្រើសរើសឯកសាររូបភាពប៉ុណ្ណោះ'
        : 'Please select an image file');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `images/${filename}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('articles')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('articles')
        .getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (err) {
      console.error('Upload failed:', err);
      setError(language === 'km' 
        ? 'មានបញ្ហាក្នុងការបញ្ចូលរូបភាព' 
        : 'Failed to upload image');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = async () => {
    try {
      // Extract filename from URL
      const url = new URL(value!);
      const filePath = url.pathname.split('/').slice(-2).join('/');
      
      // Delete from storage
      await supabase.storage
        .from('articles')
        .remove([filePath]);
      
      onChange('');
    } catch (err) {
      console.error('Failed to remove image:', err);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {language === 'km' ? 'រូបភាពមុខ' : 'Featured Image'}
      </label>

      {value ? (
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
          <img
            src={value}
            alt="Featured"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
            title={language === 'km' ? 'លុបរូបភាព' : 'Remove image'}
          >
            ×
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="space-y-4">
            <Image className="w-12 h-12 mx-auto text-gray-400" />
            <div>
              <Button
                type="button"
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                isLoading={isLoading}
              >
                <Upload className="w-4 h-4 mr-2" />
                {language === 'km' ? 'ជ្រើសរើសរូបភាព' : 'Choose Image'}
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              {language === 'km' 
                ? 'អនុញ្ញាតឯកសារ PNG, JPG រហូតដល់ 5MB'
                : 'PNG, JPG up to 5MB'}
            </p>
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}