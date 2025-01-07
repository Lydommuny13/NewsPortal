import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { supabase } from '../../lib/supabase';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { User } from '../../types';

export function useUsers() {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as User[];
    }
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { language } = useLanguageStore();

  return useMutation({
    mutationFn: async ({ id, role }: { id: string; role: 'admin' | 'editor' | 'reader' }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success(
        language === 'km' 
          ? 'បានធ្វើបច្ចុប្បន្នភាពអ្នកប្រើប្រាស់ដោយជោគជ័យ' 
          : 'User updated successfully'
      );
    },
    onError: () => {
      toast.error(
        language === 'km'
          ? 'មានបញ្ហាក្នុងការធ្វើបច្ចុប្បន្នភាពអ្នកប្រើប្រាស់'
          : 'Failed to update user'
      );
    }
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { language } = useLanguageStore();

  return useMutation({
    mutationFn: async (id: string) => {
      // First delete the profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (profileError) throw profileError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success(
        language === 'km' 
          ? 'បានលុបអ្នកប្រើប្រាស់ដោយជោគជ័យ' 
          : 'User deleted successfully'
      );
    },
    onError: () => {
      toast.error(
        language === 'km'
          ? 'មានបញ្ហាក្នុងការលុបអ្នកប្រើប្រាស់'
          : 'Failed to delete user'
      );
    }
  });
}