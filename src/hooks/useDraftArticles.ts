import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/useAuthStore';
import { Article } from '../types';

export function useDraftArticles() {
  const { user } = useAuthStore();

  async function getDraftArticles() {
    const query = supabase
      .from('articles')
      .select(`
        id,
        title,
        title_km,
        created_at,
        status
      `)
      .eq('status', 'draft')
      .order('created_at', { ascending: false })
      .limit(5);

    // If not admin, only get user's drafts
    if (user?.role !== 'admin') {
      query.eq('author_id', user?.id);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as Article[];
  }

  return useQuery({
    queryKey: ['draft-articles', user?.id, user?.role],
    queryFn: getDraftArticles,
    enabled: !!user
  });
}