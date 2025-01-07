import { useLanguageStore } from '../../stores/useLanguageStore';
import { UserList } from './components/users/UserList';

export function UsersPage() {
  const { language } = useLanguageStore();
  
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold">
          {language === 'km' ? 'គ្រប់គ្រងអ្នកប្រើប្រាស់' : 'Manage Users'}
        </h1>
      </div>
      <UserList />
    </div>
  );
}