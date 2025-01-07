/*
  # Fix Admin Access and Role Management

  1. Changes
    - Fix admin access policies
    - Add proper role checks
    - Optimize performance with indexes
    - Add role-based access control

  2. Security
    - Ensure proper admin privileges
    - Protect sensitive operations
    - Maintain data integrity
*/

-- Drop existing problematic policies
DO $$ 
BEGIN
  -- Drop profile policies
  DROP POLICY IF EXISTS "allow_read_profiles" ON profiles;
  DROP POLICY IF EXISTS "allow_insert_own_profile" ON profiles;
  DROP POLICY IF EXISTS "allow_update_profiles" ON profiles;
  
  -- Drop article policies
  DROP POLICY IF EXISTS "allow_read_articles" ON articles;
  DROP POLICY IF EXISTS "allow_insert_articles" ON articles;
  DROP POLICY IF EXISTS "allow_update_articles" ON articles;
  DROP POLICY IF EXISTS "allow_delete_articles" ON articles;
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

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_role 
ON profiles(id, role);

CREATE INDEX IF NOT EXISTS idx_articles_author_status 
ON articles(author_id, status);