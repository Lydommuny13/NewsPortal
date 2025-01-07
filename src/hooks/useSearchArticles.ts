import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Article } from '../types';

export function useSearchArticles(query: string) {
  async function searchArticles() {
    if (!query) return [];

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
      .or(
        `title.ilike.%${query}%,` +
        `title_km.ilike.%${query}%,` +
        `content.ilike.%${query}%,` +
        `content_km.ilike.%${query}%,` +
        `excerpt.ilike.%${query}%,` +
        `excerpt_km.ilike.%${query}%`
      )
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Article[];
  }

  return useQuery({
    queryKey: ['articles', 'search', query],
    queryFn: searchArticles,
    enabled: query.length >= 2,
    staleTime: 1000 * 60
  });
}