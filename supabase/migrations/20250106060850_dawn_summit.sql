-- Drop existing policies for categories
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "categories_select" ON categories;
  DROP POLICY IF EXISTS "categories_modify" ON categories;
  DROP POLICY IF EXISTS "allow_read_categories" ON categories;
  DROP POLICY IF EXISTS "allow_admin_categories" ON categories;
END $$;

-- Create new simplified policies for categories
CREATE POLICY "categories_select"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "categories_insert"
  ON categories FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "categories_update"
  ON categories FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "categories_delete"
  ON categories FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Add some initial categories
INSERT INTO categories (name, name_km, slug) VALUES
('Politics', 'នយោបាយ', 'politics'),
('Technology', 'បច្ចេកវិទ្យា', 'technology'),
('Health', 'សុខភាព', 'health'),
('Sports', 'កីឡា', 'sports'),
('Business', 'ពាណិជ្ជកម្ម', 'business'),
('Entertainment', 'កម្សាន្ត', 'entertainment'),
('Science', 'វិទ្យាសាស្ត្រ', 'science'),
('Education', 'អប់រំ', 'education')
ON CONFLICT (slug) DO NOTHING;