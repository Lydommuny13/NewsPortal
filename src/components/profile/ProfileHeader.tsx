import { User } from '../../types';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { AvatarUpload } from './AvatarUpload';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const { language } = useLanguageStore();
  const { mutate: updateProfile } = useUpdateProfile(user.id);

  const handleAvatarUpload = (url: string) => {
    updateProfile({ avatar_url: url });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <AvatarUpload
        url={user.avatarUrl}
        onUpload={handleAvatarUpload}
        size={120}
      />
      
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {user.fullName || user.username || user.email}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 capitalize">
          {language === 'km' ? 'តួនាទី' : 'Role'}: {user.role}
        </p>
      </div>
    </div>
  );
}