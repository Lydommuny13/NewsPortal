import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { useLanguageStore } from '../stores/useLanguageStore';
import { Comment } from '../types';

export function useComments(articleId: string) {
  return useQuery({
    queryKey: ['comments', articleId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          user:user_id (
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('article_id', articleId)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Comment[];
    }
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();
  const { language } = useLanguageStore();

  return useMutation({
    mutationFn: async ({ articleId, content }: { articleId: string; content: string }) => {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          article_id: articleId,
          content,
          status: 'approved' // For simplicity, auto-approve comments
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, { articleId }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
      toast.success(
        language === 'km'
          ? 'បានបញ្ចូលមតិយោបល់ដោយជោគជ័យ'
          : 'Comment added successfully'
      );
    },
    onError: () => {
      toast.error(
        language === 'km'
          ? 'មានបញ្ហាក្នុងការបញ្ចូលមតិយោបល់'
          : 'Failed to add comment'
      );
    }
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  const { language } = useLanguageStore();

  return useMutation({
    mutationFn: async ({ commentId, articleId }: { commentId: string; articleId: string }) => {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;
    },
    onSuccess: (_, { articleId }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
      toast.success(
        language === 'km'
          ? 'បានលុបមតិយោបល់ដោយជោគជ័យ'
          : 'Comment deleted successfully'
      );
    },
    onError: () => {
      toast.error(
        language === 'km'
          ? 'មានបញ្ហាក្នុងការលុបមតិយោបល់'
          : 'Failed to delete comment'
      );
    }
  });
}