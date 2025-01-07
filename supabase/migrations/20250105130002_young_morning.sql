/*
  # Fix policy conflicts

  This migration safely updates policies by:
  1. Using IF NOT EXISTS for policy creation
  2. Implementing proper admin access controls
  3. Maintaining basic CRUD policies for each table
*/

-- Create new policies only if they don't exist
DO $$ 
BEGIN
  -- Profile policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'profiles_read_policy') THEN
    CREATE POLICY "profiles_read_policy"
      ON profiles FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'profiles_insert_policy') THEN
    CREATE POLICY "profiles_insert_policy"
      ON profiles FOR INSERT
      WITH CHECK (auth.uid() = id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'profiles_update_policy') THEN
    CREATE POLICY "profiles_update_policy"
      ON profiles FOR UPDATE
      USING (auth.uid() = id);
  END IF;

  -- Article policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'articles_read_policy') THEN
    CREATE POLICY "articles_read_policy"
      ON articles FOR SELECT
      USING (status = 'published' OR auth.uid() = author_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'articles_insert_policy') THEN
    CREATE POLICY "articles_insert_policy"
      ON articles FOR INSERT
      WITH CHECK (auth.uid() = author_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'articles_update_policy') THEN
    CREATE POLICY "articles_update_policy"
      ON articles FOR UPDATE
      USING (auth.uid() = author_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'articles_delete_policy') THEN
    CREATE POLICY "articles_delete_policy"
      ON articles FOR DELETE
      USING (auth.uid() = author_id);
  END IF;

  -- Admin bypass policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'profiles_admin_policy') THEN
    CREATE POLICY "profiles_admin_policy"
      ON profiles FOR ALL
      USING (EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
      ));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'articles_admin_policy') THEN
    CREATE POLICY "articles_admin_policy"
      ON articles FOR ALL
      USING (EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
      ));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'comments_admin_policy') THEN
    CREATE POLICY "comments_admin_policy"
      ON comments FOR ALL
      USING (EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
      ));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'categories_admin_policy') THEN
    CREATE POLICY "categories_admin_policy"
      ON categories FOR ALL
      USING (EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
      ));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'tags_admin_policy') THEN
    CREATE POLICY "tags_admin_policy"
      ON tags FOR ALL
      USING (EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
      ));
  END IF;
END $$;