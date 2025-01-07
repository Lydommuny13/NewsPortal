// Add these types to your existing types file
export interface Comment {
  id: string;
  content: string;
  created_at: string;
  user: {
    id: string;
    username?: string;
    full_name?: string;
    avatar_url?: string;
  };
}