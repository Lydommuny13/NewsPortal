import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArticleFormData } from '../types';

export function useUpdateArticle(id: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: ArticleFormData) => {
      const { data: article, error } = await supabase
        .from('articles')
        .update({
          title: data.title,
          title_km: data.title_km,
          content: data.content,
          content_km: data.content_km,
          excerpt: data.excerpt,
          excerpt_km: data.excerpt_km,
          featured_image: data.featured_image,
          category_id: data.category_id,
          status: data.status,
          published_at: data.status === 'published' ? new Date().toISOString() : null
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return article;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article', id] });
      queryClient.invalidateQueries({ queryKey: ['my-articles'] });
      queryClient.invalidateQueries({ queryKey: ['draft-articles'] });
      queryClient.invalidateQueries({ queryKey: ['published-articles'] });
      navigate('/dashboard/articles');
    }
  });
}