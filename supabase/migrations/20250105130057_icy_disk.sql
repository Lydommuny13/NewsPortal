/*
  # Fix RLS Policy Recursion

  This migration fixes the infinite recursion issues in RLS policies by:
  1. Dropping problematic policies
  2. Creating new simplified policies that avoid self-referential checks
  3. Using direct role checks instead of nested profile queries where possible
*/

-- First drop all potentially problematic policies
DO $$ 
BEGIN
  -- Drop profile policies
  DROP POLICY IF EXISTS "profiles_admin_policy" ON profiles;
  DROP POLICY IF EXISTS "profiles_read_policy" ON profiles;
  DROP POLICY IF EXISTS "profiles_update_policy" ON profiles;
  DROP POLICY IF EXISTS "final_profiles_read" ON profiles;
  DROP POLICY IF EXISTS "final_profiles_update" ON profiles;
  
  -- Drop article policies
  DROP POLICY IF EXISTS "articles_admin_policy" ON articles;
  DROP POLICY IF EXISTS "articles_read_policy" ON articles;
  DROP POLICY IF EXISTS "final_articles_read" ON articles;
  DROP POLICY IF EXISTS "final_articles_update" ON articles;
  DROP POLICY IF EXISTS "final_articles_delete" ON articles;
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
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Article policies
CREATE POLICY "articles_select"
  ON articles FOR SELECT
  USING (
    status = 'published' OR 
    auth.uid() = author_id OR
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "articles_insert"
  ON articles FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "articles_update"
  ON articles FOR UPDATE
  USING (
    auth.uid() = author_id OR
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "articles_delete"
  ON articles FOR DELETE
  USING (
    auth.uid() = author_id OR
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Comment policies
CREATE POLICY "comments_select"
  ON comments FOR SELECT
  USING (true);

CREATE POLICY "comments_insert"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "comments_update"
  ON comments FOR UPDATE
  USING (
    auth.uid() = user_id OR
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Category policies
CREATE POLICY "categories_select"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "categories_admin"
  ON categories FOR ALL
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Tag policies
CREATE POLICY "tags_select"
  ON tags FOR SELECT
  USING (true);

CREATE POLICY "tags_admin"
  ON tags FOR ALL
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');