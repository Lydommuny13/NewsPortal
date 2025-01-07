/*
  # Fix Dashboard Access and Role Management

  1. Changes
    - Fix role-based access control
    - Add proper admin and editor permissions
    - Optimize policy performance
    - Add role validation

  2. Security
    - Ensure proper role checks
    - Protect sensitive operations
    - Maintain data integrity
*/

-- Drop existing problematic policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "profiles_select" ON profiles;
  DROP POLICY IF EXISTS "profiles_insert" ON profiles;
  DROP POLICY IF EXISTS "profiles_update" ON profiles;
  DROP POLICY IF EXISTS "articles_select" ON articles;
  DROP POLICY IF EXISTS "articles_insert" ON articles;
  DROP POLICY IF EXISTS "articles_update" ON articles;
  DROP POLICY IF EXISTS "articles_delete" ON articles;
END $$;

-- Create new simplified policies

-- Profile policies
CREATE POLICY "profiles_select"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "profiles_insert"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update"
  ON profiles FOR UPDATE
  USING (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Article policies
CREATE POLICY "articles_select"
  ON articles FOR SELECT
  USING (
    status = 'published' OR 
    auth.uid() = author_id OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "articles_insert"
  ON articles FOR INSERT
  WITH CHECK (
    auth.uid() = author_id AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "articles_update"
  ON articles FOR UPDATE
  USING (
    auth.uid() = author_id OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "articles_delete"
  ON articles FOR DELETE
  USING (
    auth.uid() = author_id OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Add role validation check
ALTER TABLE profiles
  DROP CONSTRAINT IF EXISTS valid_roles,
  ADD CONSTRAINT valid_roles 
  CHECK (role IN ('admin', 'editor', 'reader'));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_role 
ON profiles(id, role);

CREATE INDEX IF NOT EXISTS idx_articles_author_status 
ON articles(author_id, status);