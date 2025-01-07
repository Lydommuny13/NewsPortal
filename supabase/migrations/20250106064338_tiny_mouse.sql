-- Drop existing storage policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Public Access" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
  DROP POLICY IF EXISTS "Users can update own images" ON storage.objects;
  DROP POLICY IF EXISTS "Users can delete own images" ON storage.objects;
END $$;

-- Create storage bucket for articles if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('articles', 'articles', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for articles bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'articles');

CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'articles' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Allow authenticated updates"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'articles' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'articles' AND
  auth.role() = 'authenticated'
);