import { useAuthStore } from '../stores/useAuthStore';
import { useLanguageStore } from '../stores/useLanguageStore';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileForm } from '../components/profile/ProfileForm';
import { Button } from '../components/ui/Button';
import { LogOut } from 'lucide-react';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export function ProfilePage() {
  const { language } = useLanguageStore();
  const { user } = useAuthStore();
  const { data: profile, isLoading } = useProfile(user?.id || '');
  const { logout, isLoading: isLoggingOut } = useAuth();

  if (!user) return null;
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="border-b dark:border-gray-700 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'km' ? 'គណនីរបស់ខ្ញុំ' : 'My Profile'}
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 space-y-8">
          <ProfileHeader user={profile || user} />
          
          <div className="border-t dark:border-gray-700 pt-6">
            <ProfileForm
              initialData={{
                username: profile?.username || user.username,
                fullName: profile?.fullName || user.fullName
              }}
              userId={user.id}
            />
          </div>

          <div className="border-t dark:border-gray-700 pt-6">
            <Button
              onClick={logout}
              isLoading={isLoggingOut}
              className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {language === 'km' ? 'ចាកចេញ' : 'Logout'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}