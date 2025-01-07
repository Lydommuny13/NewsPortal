/*
  # Fix Comments Functionality

  1. Changes
    - Add status column to comments table
    - Add proper RLS policies for comments
    - Add indexes for better performance

  2. Security
    - Enable RLS on comments table
    - Add policies for:
      - Public read access to approved comments
      - Authenticated users can create comments
      - Users can delete their own comments
      - Admins can manage all comments
*/

-- First ensure comments table exists with proper columns
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  status text DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "comments_select" ON comments;
DROP POLICY IF EXISTS "comments_insert" ON comments;
DROP POLICY IF EXISTS "comments_delete" ON comments;

-- Create new policies
CREATE POLICY "comments_select"
  ON comments FOR SELECT
  USING (status = 'approved');

CREATE POLICY "comments_insert"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
  );

CREATE POLICY "comments_delete"
  ON comments FOR DELETE
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_comments_article_id ON comments(article_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_status ON comments(status);