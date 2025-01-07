-- Reset all users to reader role first
DO $$ 
BEGIN
  -- First ensure admin@example.com has admin role
  UPDATE profiles
  SET role = 'admin'
  WHERE email = 'admin@example.com'
  AND EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.email = 'admin@example.com'
  );

  -- Then set all other users to reader
  UPDATE profiles
  SET role = 'reader'
  WHERE email != 'admin@example.com';

  -- Explicitly ensure okimkhmer@gmail.com is reader
  UPDATE profiles
  SET role = 'reader'
  WHERE email = 'okimkhmer@gmail.com'
  AND EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.email = 'okimkhmer@gmail.com'
  );
END $$;

-- Drop existing policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "articles_select" ON articles;
  DROP POLICY IF EXISTS "articles_insert" ON articles;
  DROP POLICY IF EXISTS "articles_update" ON articles;
  DROP POLICY IF EXISTS "articles_delete" ON articles;
END $$;

-- Create new strict policies
CREATE POLICY "articles_select"
  ON articles FOR SELECT
  USING (
    status = 'published' OR 
    (auth.uid() = author_id AND EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    ))
  );

CREATE POLICY "articles_insert"
  ON articles FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "articles_update"
  ON articles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "articles_delete"
  ON articles FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );