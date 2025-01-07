import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/useAuthStore';
import { ArticleFormData } from '../types';
import { generateSlug } from '../utils/slugify';

export function useCreateArticle() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: ArticleFormData) => {
      if (!user) throw new Error('User not authenticated');

      const { data: article, error } = await supabase
        .from('articles')
        .insert({
          title: data.title,
          title_km: data.title_km,
          content: data.content,
          content_km: data.content_km,
          excerpt: data.excerpt,
          excerpt_km: data.excerpt_km,
          featured_image: data.featured_image,
          category_id: data.category_id,
          status: data.status,
          slug: generateSlug(data.title),
          author_id: user.id,
          published_at: data.status === 'published' ? new Date().toISOString() : null
        })
        .select()
        .single();

      if (error) throw error;
      return article;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-articles'] });
      queryClient.invalidateQueries({ queryKey: ['draft-articles'] });
      queryClient.invalidateQueries({ queryKey: ['published-articles'] });
      navigate('/dashboard/articles');
    }
  });
}