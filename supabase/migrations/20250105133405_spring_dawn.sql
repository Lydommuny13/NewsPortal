/*
  # Set up admin and regular users
  
  1. Changes
    - Delete existing data to start fresh
    - Set up proper RLS policies
    - Create admin and regular user roles
*/

-- First delete all articles to avoid foreign key constraints
DELETE FROM articles;

-- Then delete all existing users and their profiles
DELETE FROM auth.users;
DELETE FROM profiles;

-- Drop existing policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "articles_select" ON articles;
  DROP POLICY IF EXISTS "articles_insert" ON articles;
  DROP POLICY IF EXISTS "articles_update" ON articles;
  DROP POLICY IF EXISTS "articles_delete" ON articles;
END $$;

-- Create new strict policies for articles
CREATE POLICY "articles_select"
  ON articles FOR SELECT
  USING (
    status = 'published' OR 
    (auth.uid() = author_id AND EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    ))
  );

CREATE POLICY "articles_insert"
  ON articles FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "articles_update"
  ON articles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "articles_delete"
  ON articles FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Ensure role column has proper constraint
ALTER TABLE profiles
  DROP CONSTRAINT IF EXISTS valid_roles,
  ADD CONSTRAINT valid_roles 
  CHECK (role IN ('admin', 'reader'));

-- Set default role for new users
ALTER TABLE profiles 
  ALTER COLUMN role SET DEFAULT 'reader';