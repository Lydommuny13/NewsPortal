-- Drop existing policies first
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
      AND role = 'admin'
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
  CHECK (role IN ('admin', 'reader'));

-- Set default role for new users
ALTER TABLE profiles 
  ALTER COLUMN role SET DEFAULT 'reader';