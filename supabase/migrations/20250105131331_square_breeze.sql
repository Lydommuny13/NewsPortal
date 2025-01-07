/*
  # Fix Dashboard Access and Role Management

  1. Changes
    - Simplify role-based access control
    - Fix editor and admin permissions
    - Optimize policy performance
    - Ensure proper role inheritance

  2. Security
    - Maintain proper role checks
    - Protect sensitive operations
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
      AND role IN ('admin', 'editor')
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
      AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "articles_delete"
  ON articles FOR DELETE
  USING (
    auth.uid() = author_id OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'editor')
    )
  );

-- Ensure proper role validation
ALTER TABLE profiles
  DROP CONSTRAINT IF EXISTS valid_roles,
  ADD CONSTRAINT valid_roles 
  CHECK (role IN ('admin', 'editor', 'reader'));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_role 
ON profiles(id, role);

CREATE INDEX IF NOT EXISTS idx_articles_author_status 
ON articles(author_id, status);

-- Set default role for new users
ALTER TABLE profiles 
  ALTER COLUMN role SET DEFAULT 'reader';

-- Update existing admin users if needed
UPDATE profiles
SET role = 'admin'
WHERE email = 'admin@example.com';