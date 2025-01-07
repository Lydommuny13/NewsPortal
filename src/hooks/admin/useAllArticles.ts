import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Article } from '../../types';

export function useAllArticles() {
  async function getAllArticles() {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        id,
        title,
        title_km,
        status,
        created_at,
        author:author_id (
          id,
          username,
          email
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Article[];
  }

  return useQuery({
    queryKey: ['admin', 'articles'],
    queryFn: getAllArticles
  });
}