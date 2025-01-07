import { useState } from 'react';
import { useLanguageStore } from '../../../../stores/useLanguageStore';
import { useUsers, useUpdateUser, useDeleteUser } from '../../../../hooks/admin/useUsers';
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner';
import { Button } from '../../../../components/ui/Button';
import { Select } from '../../../../components/ui/Select';
import { DeleteConfirmDialog } from '../../../../components/ui/DeleteConfirmDialog';
import { User } from '../../../../types';

export function UserList() {
  const { language } = useLanguageStore();
  const { data: users, isLoading } = useUsers();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUser();
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const roleOptions = [
    { value: 'reader', label: language === 'km' ? 'អ្នកអាន' : 'Reader' },
    { value: 'admin', label: language === 'km' ? 'អ្នកគ្រប់គ្រង' : 'Admin' }
  ];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">
                {language === 'km' ? 'អ្នកប្រើប្រាស់' : 'User'}
              </th>
              <th className="text-left p-4">
                {language === 'km' ? 'អ៊ីមែល' : 'Email'}
              </th>
              <th className="text-left p-4">
                {language === 'km' ? 'តួនាទី' : 'Role'}
              </th>
              <th className="text-left p-4">
                {language === 'km' ? 'សកម្មភាព' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users?.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {user.avatarUrl ? (
                      <img 
                        src={user.avatarUrl} 
                        alt="" 
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-500 text-lg">
                          {user.email[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <span className="font-medium">
                      {user.fullName || user.username || user.email}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-gray-600">{user.email}</td>
                <td className="p-4">
                  <Select
                    value={user.role}
                    onChange={(e) => updateUser({ 
                      id: user.id, 
                      role: e.target.value as 'admin' | 'reader' 
                    })}
                    options={roleOptions}
                  />
                </td>
                <td className="p-4">
                  <Button
                    variant="secondary"
                    onClick={() => setUserToDelete(user)}
                    className="text-red-600 hover:text-red-700"
                  >
                    {language === 'km' ? 'លុប' : 'Delete'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteConfirmDialog
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={() => {
          if (userToDelete) {
            deleteUser(userToDelete.id);
            setUserToDelete(null);
          }
        }}
        title={language === 'km' ? 'លុបអ្នកប្រើប្រាស់' : 'Delete User'}
        message={
          language === 'km'
            ? `តើអ្នកប្រាកដជាចង់លុបអ្នកប្រើប្រាស់ "${userToDelete?.email}" មែនទេ?`
            : `Are you sure you want to delete "${userToDelete?.email}"?`
        }
        isLoading={isDeleting}
      />
    </div>
  );
}