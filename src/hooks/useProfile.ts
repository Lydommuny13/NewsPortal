import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { User } from '../types';

export function useProfile(userId: string) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          email,
          username,
          full_name,
          avatar_url,
          role
        `)
        .eq('id', userId)
        .single();

      if (error) throw error;
      
      return {
        id: data.id,
        email: data.email,
        username: data.username,
        fullName: data.full_name,
        avatarUrl: data.avatar_url,
        role: data.role
      } as User;
    },
    enabled: Boolean(userId)
  });
}