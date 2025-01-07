-- Drop existing category policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "categories_select" ON categories;
  DROP POLICY IF EXISTS "categories_insert" ON categories;
  DROP POLICY IF EXISTS "categories_update" ON categories;
  DROP POLICY IF EXISTS "categories_delete" ON categories;
END $$;

-- Create new robust policies for categories
CREATE POLICY "categories_select_policy"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "categories_insert_policy"
  ON categories FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "categories_update_policy"
  ON categories FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "categories_delete_policy"
  ON categories FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Ensure RLS is enabled
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Ensure default categories exist
INSERT INTO categories (name, name_km, slug) VALUES
('Politics', 'នយោបាយ', 'politics'),
('Technology', 'បច្ចេកវិទ្យា', 'technology'),
('Health', 'សុខភាព', 'health'),
('Sports', 'កីឡា', 'sports'),
('Business', 'ពាណិជ្ជកម្ម', 'business'),
('Entertainment', 'កម្សាន្ត', 'entertainment'),
('Science', 'វិទ្យាសាស្ត្រ', 'science'),
('Education', 'អប់រំ', 'education')
ON CONFLICT (slug) DO UPDATE 
SET 
  name = EXCLUDED.name,
  name_km = EXCLUDED.name_km;