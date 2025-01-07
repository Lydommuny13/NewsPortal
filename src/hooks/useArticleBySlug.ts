import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Article } from '../types';

export function useArticleBySlug(slug: string) {
  async function getArticle() {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        id,
        title,
        title_km,
        content,
        content_km,
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
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) throw error;
    return data as Article;
  }

  return useQuery({
    queryKey: ['article', slug],
    queryFn: getArticle,
    enabled: !!slug,
    staleTime: 1000 * 60 * 5
  });
}