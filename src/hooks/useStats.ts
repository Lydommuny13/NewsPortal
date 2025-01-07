import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

interface Stats {
  totalUsers: number;
  totalArticles: number;
  totalComments: number;
  newArticles: number;
}

async function getStats(): Promise<Stats> {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    { count: totalUsers },
    { count: totalArticles },
    { count: totalComments },
    { count: newArticles }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('*', { count: 'exact', head: true }),
    supabase.from('comments').select('*', { count: 'exact', head: true }),
    supabase.from('articles')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekAgo.toISOString())
  ]);

  return {
    totalUsers: totalUsers || 0,
    totalArticles: totalArticles || 0,
    totalComments: totalComments || 0,
    newArticles: newArticles || 0
  };
}

export function useStats() {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: getStats
  });
}