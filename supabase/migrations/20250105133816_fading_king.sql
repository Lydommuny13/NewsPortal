-- First delete all articles to avoid foreign key constraints
DELETE FROM articles;

-- Then delete all existing users and their profiles
DELETE FROM auth.users;
DELETE FROM profiles;

-- Drop existing policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "articles_select_policy" ON articles;
  DROP POLICY IF EXISTS "articles_insert_policy" ON articles;
  DROP POLICY IF EXISTS "articles_update_policy" ON articles;
  DROP POLICY IF EXISTS "articles_delete_policy" ON articles;
  DROP POLICY IF EXISTS "profiles_select_policy" ON profiles;
  DROP POLICY IF EXISTS "profiles_insert_policy" ON profiles;
  DROP POLICY IF EXISTS "profiles_update_policy" ON profiles;
END $$;

-- Create new policies for articles
CREATE POLICY "articles_select_policy"
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

CREATE POLICY "articles_insert_policy"
  ON articles FOR INSERT
  WITH CHECK (
    auth.uid() = author_id AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND (role = 'admin' OR role = 'editor')
    )
  );

CREATE POLICY "articles_update_policy"
  ON articles FOR UPDATE
  USING (
    auth.uid() = author_id OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
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
    )
  );

-- Create policies for profiles
CREATE POLICY "profiles_select_policy"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "profiles_insert_policy"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_policy"
  ON profiles FOR UPDATE
  USING (
    auth.uid() = id OR
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
  CHECK (role IN ('admin', 'editor', 'reader'));

-- Set default role for new users
ALTER TABLE profiles 
  ALTER COLUMN role SET DEFAULT 'reader';

-- Create trigger to ensure admin@admin.com gets admin role
CREATE OR REPLACE FUNCTION set_admin_role()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email = 'admin@admin.com' THEN
    NEW.role = 'admin';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS ensure_admin_role ON profiles;
CREATE TRIGGER ensure_admin_role
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION set_admin_role();