-- Drop existing article policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "articles_select_policy" ON articles;
  DROP POLICY IF EXISTS "articles_insert_policy" ON articles;
  DROP POLICY IF EXISTS "articles_update_policy" ON articles;
  DROP POLICY IF EXISTS "articles_delete_policy" ON articles;
END $$;

-- Create new strict policies for articles
CREATE POLICY "articles_select_policy"
  ON articles FOR SELECT
  USING (
    status = 'published' OR -- Anyone can read published articles
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "articles_insert_policy"
  ON articles FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "articles_update_policy"
  ON articles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "articles_delete_policy"
  ON articles FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );