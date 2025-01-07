import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Article } from '../types';

export function useArticlesByCategory(categoryId: string | null) {
  return useQuery({
    queryKey: ['articles', 'category', categoryId],
    queryFn: async () => {
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

      if (categoryId) {
        query.eq('category_id', categoryId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Article[];
    },
    enabled: true,
    staleTime: 1000 * 60 // Cache for 1 minute
  });
}