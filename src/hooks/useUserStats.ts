import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/useAuthStore';

interface UserStats {
  totalArticles: number;
  publishedArticles: number;
  totalComments: number;
}

export function useUserStats() {
  const { user } = useAuthStore();

  async function getUserStats(): Promise<UserStats> {
    const [
      { count: totalArticles },
      { count: publishedArticles },
      { count: totalComments }
    ] = await Promise.all([
      supabase
        .from('articles')
        .select('*', { count: 'exact', head: true })
        .eq('author_id', user?.id),
      supabase
        .from('articles')
        .select('*', { count: 'exact', head: true })
        .eq('author_id', user?.id)
        .eq('status', 'published'),
      supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id)
    ]);

    return {
      totalArticles: totalArticles || 0,
      publishedArticles: publishedArticles || 0,
      totalComments: totalComments || 0
    };
  }

  return useQuery({
    queryKey: ['user-stats', user?.id],
    queryFn: getUserStats,
    enabled: !!user
  });
}