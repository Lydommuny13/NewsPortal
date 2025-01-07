import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Article } from '../types';

export function usePublishedArticles() {
  async function getArticles() {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        id,
        title,
        title_km,
        slug,
        excerpt,
        excerpt_km,
        featured_image,
        category_id,
        category:category_id (
          id,
          name,
          name_km,
          slug
        ),
        is_breaking,
        trending_score,
        created_at,
        author:author_id (
          id,
          username,
          full_name,
          avatar_url
        )
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Article[];
  }

  return useQuery({
    queryKey: ['published-articles'],
    queryFn: getArticles,
    refetchOnMount: true,
    staleTime: 1000 * 30
  });
}