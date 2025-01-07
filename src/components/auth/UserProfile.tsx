import { useAuthStore } from '../../stores/useAuthStore';
import { useLanguageStore } from '../../stores/useLanguageStore';

export function UserProfile() {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-gray-600">
          {language === 'km' ? 'មិនទាន់បានចូលគណនី' : 'Not logged in'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        {language === 'km' ? 'ព័ត៌មានគណនី' : 'Account Information'}
      </h2>
      
      <div className="space-y-3">
        <div>
          <span className="text-gray-600">
            {language === 'km' ? 'អ៊ីមែល៖' : 'Email:'} 
          </span>
          <span className="ml-2">{user.email}</span>
        </div>
        
        <div>
          <span className="text-gray-600">
            {language === 'km' ? 'តួនាទី៖' : 'Role:'} 
          </span>
          <span className="ml-2 capitalize">{user.role}</span>
        </div>

        {user.username && (
          <div>
            <span className="text-gray-600">
              {language === 'km' ? 'ឈ្មោះអ្នកប្រើប្រាស់៖' : 'Username:'} 
            </span>
            <span className="ml-2">{user.username}</span>
          </div>
        )}

        {user.fullName && (
          <div>
            <span className="text-gray-600">
              {language === 'km' ? 'ឈ្មោះពេញ៖' : 'Full Name:'} 
            </span>
            <span className="ml-2">{user.fullName}</span>
          </div>
        )}
      </div>
    </div>
  );
}