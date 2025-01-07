/*
  # Final RLS Policy Fix
  
  This migration:
  1. Adds an is_admin boolean column to profiles
  2. Drops all existing policies
  3. Creates new policies using the is_admin flag
  4. Updates existing admin users
*/

-- First add is_admin column
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE profiles ADD COLUMN is_admin BOOLEAN DEFAULT false;
    
    -- Update existing admin users
    UPDATE profiles 
    SET is_admin = true 
    WHERE role = 'admin';
  END IF;
END $$;

-- Drop ALL existing policies
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

-- Create new policies using is_admin flag

-- Profile policies
CREATE POLICY "profiles_select"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "profiles_insert"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update"
  ON profiles FOR UPDATE
  USING (auth.uid() = id OR (SELECT is_admin FROM profiles WHERE id = auth.uid()));

-- Article policies
CREATE POLICY "articles_select"
  ON articles FOR SELECT
  USING (
    status = 'published' OR 
    auth.uid() = author_id OR 
    (SELECT is_admin FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "articles_insert"
  ON articles FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "articles_update"
  ON articles FOR UPDATE
  USING (
    auth.uid() = author_id OR 
    (SELECT is_admin FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "articles_delete"
  ON articles FOR DELETE
  USING (
    auth.uid() = author_id OR 
    (SELECT is_admin FROM profiles WHERE id = auth.uid())
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
    (SELECT is_admin FROM profiles WHERE id = auth.uid())
  );

-- Category policies
CREATE POLICY "categories_select"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "categories_modify"
  ON categories FOR ALL
  USING ((SELECT is_admin FROM profiles WHERE id = auth.uid()));

-- Tag policies
CREATE POLICY "tags_select"
  ON tags FOR SELECT
  USING (true);

CREATE POLICY "tags_modify"
  ON tags FOR ALL
  USING ((SELECT is_admin FROM profiles WHERE id = auth.uid()));

-- Create trigger to keep is_admin in sync with role
CREATE OR REPLACE FUNCTION sync_is_admin()
RETURNS TRIGGER AS $$
BEGIN
  NEW.is_admin = NEW.role = 'admin';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS sync_is_admin_trigger ON profiles;
CREATE TRIGGER sync_is_admin_trigger
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION sync_is_admin();