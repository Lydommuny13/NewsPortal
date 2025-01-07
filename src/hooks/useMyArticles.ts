import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/useAuthStore';
import { Article } from '../types';

export function useMyArticles() {
  const { user } = useAuthStore();

  async function getMyArticles() {
    if (!user) return [];

    const query = supabase
      .from('articles')
      .select(`
        id,
        title,
        title_km,
        slug,
        excerpt,
        excerpt_km,
        featured_image,
        status,
        created_at,
        author:author_id (
          id,
          username,
          full_name,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false });

    if (user.role !== 'admin') {
      query.eq('author_id', user.id);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as Article[];
  }

  return useQuery({
    queryKey: ['my-articles', user?.id, user?.role],
    queryFn: getMyArticles,
    enabled: !!user
  });
}