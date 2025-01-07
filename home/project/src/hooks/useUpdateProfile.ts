import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { useLanguageStore } from '../stores/useLanguageStore';
import { useAuthStore } from '../stores/useAuthStore';

interface UpdateProfileData {
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
}

export function useUpdateProfile(userId: string) {
  const queryClient = useQueryClient();
  const { language } = useLanguageStore();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      if (!userId) throw new Error('User ID is required');

      // Clean up undefined values
      const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
      );

      const { data: profile, error } = await supabase
        .from('profiles')
        .update(cleanData)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return profile;
    },
    onSuccess: (updatedProfile) => {
      // Update cache
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
      
      // Update auth store
      setUser((prev) => prev ? {
        ...prev,
        username: updatedProfile.username || prev.username,
        fullName: updatedProfile.full_name || prev.fullName,
        avatarUrl: updatedProfile.avatar_url || prev.avatarUrl
      } : prev);
      
      toast.success(
        language === 'km' 
          ? 'បានធ្វើបច្ចុប្បន្នភាពគណនីដោយជោគជ័យ' 
          : 'Profile updated successfully'
      );
    },
    onError: (error) => {
      console.error('Profile update error:', error);
      toast.error(
        language === 'km'
          ? 'មានបញ្ហាក្នុងការធ្វើបច្ចុប្បន្នភាពគណនី'
          : 'Failed to update profile'
      );
    }
  });
}