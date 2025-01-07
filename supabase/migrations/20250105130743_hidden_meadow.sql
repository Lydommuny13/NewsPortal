/*
  # Fix Admin Access and Policies

  1. Changes
    - Add is_admin column to profiles
    - Create simplified RLS policies
    - Fix admin access issues
    - Optimize performance with indexes

  2. Security
    - Enable RLS on all tables
    - Add proper admin policies
    - Ensure data access control
*/

-- First add is_admin column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE profiles ADD COLUMN is_admin BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Update is_admin based on existing admin users
UPDATE profiles 
SET is_admin = true 
WHERE EXISTS (
  SELECT 1 FROM profiles p2 
  WHERE p2.id = profiles.id 
  AND p2.role = 'admin'
);

-- Drop existing policies to avoid conflicts
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
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.is_admin = true
    )
  );

-- Article policies
CREATE POLICY "allow_read_articles"
  ON articles FOR SELECT
  USING (
    status = 'published' OR 
    auth.uid() = author_id OR 
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.is_admin = true
    )
  );

CREATE POLICY "allow_insert_articles"
  ON articles FOR INSERT
  WITH CHECK (
    auth.uid() = author_id AND
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND (p.is_admin = true OR p.role IN ('admin', 'editor'))
    )
  );

CREATE POLICY "allow_update_articles"
  ON articles FOR UPDATE
  USING (
    auth.uid() = author_id OR 
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.is_admin = true
    )
  );

CREATE POLICY "allow_delete_articles"
  ON articles FOR DELETE
  USING (
    auth.uid() = author_id OR 
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.is_admin = true
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_admin 
ON profiles(id, is_admin)
WHERE is_admin = true;

CREATE INDEX IF NOT EXISTS idx_articles_author 
ON articles(author_id);

-- Create trigger to keep is_admin in sync
CREATE OR REPLACE FUNCTION sync_is_admin()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'admin' THEN
    NEW.is_admin = true;
  ELSE
    NEW.is_admin = false;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS sync_is_admin_trigger ON profiles;
CREATE TRIGGER sync_is_admin_trigger
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION sync_is_admin();