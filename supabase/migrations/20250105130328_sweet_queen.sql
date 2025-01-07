/*
  # Fix Admin Access
  
  This migration:
  1. Ensures admin users can access all data
  2. Simplifies RLS policies to avoid recursion
  3. Uses a more efficient way to check admin status
*/

-- First ensure is_admin is properly set for all admin users
UPDATE profiles 
SET is_admin = true 
WHERE role = 'admin';

-- Drop existing policies that might conflict
DO $$ 
DECLARE
  _table text;
  _policy text;
BEGIN
  FOR _table IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public')
  LOOP
    FOR _policy IN (
      SELECT policyname 
      FROM pg_policies 
      WHERE schemaname = 'public' AND tablename = _table
    )
    LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON %I', _policy, _table);
    END LOOP;
  END LOOP;
END $$;

-- Create new simplified policies

-- Profile policies
CREATE POLICY "allow_read_profiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "allow_insert_own_profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "allow_update_profiles"
  ON profiles FOR UPDATE
  USING (
    auth.uid() = id OR 
    (SELECT p.is_admin FROM profiles p WHERE p.id = auth.uid())
  );

-- Article policies
CREATE POLICY "allow_read_articles"
  ON articles FOR SELECT
  USING (
    status = 'published' OR 
    auth.uid() = author_id OR 
    (SELECT p.is_admin FROM profiles p WHERE p.id = auth.uid())
  );

CREATE POLICY "allow_insert_articles"
  ON articles FOR INSERT
  WITH CHECK (
    auth.uid() = author_id OR 
    (SELECT p.is_admin FROM profiles p WHERE p.id = auth.uid())
  );

CREATE POLICY "allow_update_articles"
  ON articles FOR UPDATE
  USING (
    auth.uid() = author_id OR 
    (SELECT p.is_admin FROM profiles p WHERE p.id = auth.uid())
  );

CREATE POLICY "allow_delete_articles"
  ON articles FOR DELETE
  USING (
    auth.uid() = author_id OR 
    (SELECT p.is_admin FROM profiles p WHERE p.id = auth.uid())
  );

-- Comment policies
CREATE POLICY "allow_read_comments"
  ON comments FOR SELECT
  USING (true);

CREATE POLICY "allow_insert_comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "allow_update_comments"
  ON comments FOR UPDATE
  USING (
    auth.uid() = user_id OR 
    (SELECT p.is_admin FROM profiles p WHERE p.id = auth.uid())
  );

CREATE POLICY "allow_delete_comments"
  ON comments FOR DELETE
  USING (
    auth.uid() = user_id OR 
    (SELECT p.is_admin FROM profiles p WHERE p.id = auth.uid())
  );

-- Category policies
CREATE POLICY "allow_read_categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "allow_admin_categories"
  ON categories FOR ALL
  USING (
    (SELECT p.is_admin FROM profiles p WHERE p.id = auth.uid())
  );

-- Tag policies
CREATE POLICY "allow_read_tags"
  ON tags FOR SELECT
  USING (true);

CREATE POLICY "allow_admin_tags"
  ON tags FOR ALL
  USING (
    (SELECT p.is_admin FROM profiles p WHERE p.id = auth.uid())
  );

-- Create index to optimize admin checks
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON profiles(id) WHERE is_admin = true;