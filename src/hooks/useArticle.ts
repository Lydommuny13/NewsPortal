import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Article } from '../types';

export function useArticle(id: string) {
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
        category_id,
        category:category_id (
          id,
          name,
          name_km,
          slug
        ),
        status,
        created_at,
        author:author_id (
          id,
          username,
          full_name,
          avatar_url
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Article;
  }

  return useQuery({
    queryKey: ['article', id],
    queryFn: getArticle,
    enabled: !!id
  });
}