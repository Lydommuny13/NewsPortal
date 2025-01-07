import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Article } from '../types';

async function getRecentArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      id,
      title,
      title_km,
      created_at,
      status
    `)
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) throw error;
  return data as Article[];
}

export function useRecentArticles() {
  return useQuery({
    queryKey: ['admin', 'recent-articles'],
    queryFn: getRecentArticles
  });
}