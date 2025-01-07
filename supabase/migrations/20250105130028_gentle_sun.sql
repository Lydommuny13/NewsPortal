/*
  # Final Policy Configuration
  
  This migration establishes the final set of policies for all tables:
  1. Basic read access policies
  2. Authenticated user policies
  3. Admin override policies
  
  Uses IF NOT EXISTS checks to prevent conflicts
*/

DO $$ 
BEGIN
  -- Profile Policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'final_profiles_read') THEN
    CREATE POLICY "final_profiles_read"
      ON profiles FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'final_profiles_update') THEN
    CREATE POLICY "final_profiles_update"
      ON profiles FOR UPDATE
      USING (auth.uid() = id OR EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
      ));
  END IF;

  -- Article Policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'final_articles_read') THEN
    CREATE POLICY "final_articles_read"
      ON articles FOR SELECT
      USING (
        status = 'published' OR 
        auth.uid() = author_id OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
      );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'final_articles_insert') THEN
    CREATE POLICY "final_articles_insert"
      ON articles FOR INSERT
      WITH CHECK (auth.uid() = author_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'final_articles_update') THEN
    CREATE POLICY "final_articles_update"
      ON articles FOR UPDATE
      USING (
        auth.uid() = author_id OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
      );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'final_articles_delete') THEN
    CREATE POLICY "final_articles_delete"
      ON articles FOR DELETE
      USING (
        auth.uid() = author_id OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
      );
  END IF;

  -- Comment Policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'final_comments_read') THEN
    CREATE POLICY "final_comments_read"
      ON comments FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'final_comments_insert') THEN
    CREATE POLICY "final_comments_insert"
      ON comments FOR INSERT
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'final_comments_update') THEN
    CREATE POLICY "final_comments_update"
      ON comments FOR UPDATE
      USING (
        auth.uid() = user_id OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
      );
  END IF;

  -- Category Policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'final_categories_read') THEN
    CREATE POLICY "final_categories_read"
      ON categories FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'final_categories_admin') THEN
    CREATE POLICY "final_categories_admin"
      ON categories FOR ALL
      USING (EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
      ));
  END IF;

  -- Tag Policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'final_tags_read') THEN
    CREATE POLICY "final_tags_read"
      ON tags FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'final_tags_admin') THEN
    CREATE POLICY "final_tags_admin"
      ON tags FOR ALL
      USING (EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
      ));
  END IF;
END $$;