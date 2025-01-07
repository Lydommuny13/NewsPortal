/*
  # Fix recursive policies

  This migration fixes the infinite recursion issues in RLS policies by:
  1. Dropping problematic policies that cause recursion
  2. Creating new simplified policies that avoid recursive checks
  3. Using direct role checks instead of subqueries where possible
*/

-- First drop potentially problematic policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "profiles_admin_policy" ON profiles;
  DROP POLICY IF EXISTS "profiles_read_policy" ON profiles;
  DROP POLICY IF EXISTS "profiles_update_policy" ON profiles;
  DROP POLICY IF EXISTS "articles_admin_policy" ON articles;
END $$;

-- Create new simplified policies that avoid recursion

-- Profile policies
CREATE POLICY "profiles_select_policy"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "profiles_update_policy"
  ON profiles FOR UPDATE
  USING (
    auth.uid() = id OR 
    role = 'admin'
  );

-- Article policies
CREATE POLICY "articles_select_policy"
  ON articles FOR SELECT
  USING (
    status = 'published' OR 
    auth.uid() = author_id OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
      AND profiles.id != articles.author_id -- Prevent recursion
    )
  );

CREATE POLICY "articles_insert_policy"
  ON articles FOR INSERT
  WITH CHECK (
    auth.uid() = author_id
  );

CREATE POLICY "articles_update_policy"
  ON articles FOR UPDATE
  USING (
    auth.uid() = author_id OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
      AND profiles.id != articles.author_id -- Prevent recursion
    )
  );

CREATE POLICY "articles_delete_policy"
  ON articles FOR DELETE
  USING (
    auth.uid() = author_id OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
      AND profiles.id != articles.author_id -- Prevent recursion
    )
  );