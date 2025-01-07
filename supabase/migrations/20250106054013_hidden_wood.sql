-- Create storage bucket for articles
INSERT INTO storage.buckets (id, name, public)
VALUES ('articles', 'articles', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to article images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'articles');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'articles' AND
  (storage.foldername(name))[1] = 'images'
);

-- Allow users to update their own uploads
CREATE POLICY "Users can update own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'articles' AND
  owner = auth.uid()
);

-- Allow users to delete their own uploads
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'articles' AND
  owner = auth.uid()
);