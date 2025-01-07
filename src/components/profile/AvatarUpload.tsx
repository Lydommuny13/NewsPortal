import { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { supabase } from '../../lib/supabase';

interface AvatarUploadProps {
  url?: string;
  onUpload: (url: string) => void;
  size?: number;
}

export function AvatarUpload({ url, onUpload, size = 150 }: AvatarUploadProps) {
  const { language } = useLanguageStore();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        toast.error(
          language === 'km' 
            ? 'ទំហំឯកសារត្រូវតែតិចជាង 2MB' 
            : 'File size must be less than 2MB'
        );
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error(
          language === 'km'
            ? 'សូមជ្រើសរើសឯកសាររូបភាពប៉ុណ្ណោះ'
            : 'Please select an image file'
        );
        return;
      }

      setIsLoading(true);

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      onUpload(publicUrl);
      
      toast.success(
        language === 'km'
          ? 'បានបញ្ចូលរូបភាពដោយជោគជ័យ'
          : 'Avatar uploaded successfully'
      );
    } catch (err) {
      console.error('Error uploading avatar:', err);
      toast.error(
        language === 'km' 
          ? 'មានបញ្ហាក្នុងការបញ្ចូលរូបភាព' 
          : 'Error uploading avatar'
      );
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {url ? (
        <img
          src={url}
          alt="Avatar"
          className="rounded-full w-full h-full object-cover bg-gray-100 dark:bg-gray-700"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23374151"/><text x="50%" y="50%" font-family="Arial" font-size="40" fill="%239CA3AF" dominant-baseline="middle" text-anchor="middle">A</text></svg>`;
          }}
        />
      ) : (
        <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-4xl text-gray-400 dark:text-gray-500">A</span>
        </div>
      )}
      
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isLoading}
        className="absolute bottom-0 right-0 p-2 bg-blue-600 dark:bg-blue-500 rounded-full text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50"
        title={language === 'km' ? 'ផ្លាស់ប្តូររូបភាព' : 'Change avatar'}
      >
        <Camera className="w-5 h-5" />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={isLoading}
        className="hidden"
      />
    </div>
  );
}