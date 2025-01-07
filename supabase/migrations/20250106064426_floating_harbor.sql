-- Drop existing storage policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Public Access" ON storage.objects;
  DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
  DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;
  DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;
END $$;

-- Create storage bucket for avatars if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for avatars bucket
CREATE POLICY "Allow public avatar access"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Allow authenticated avatar uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Allow users to update own avatars"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Allow users to delete own avatars"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  auth.role() = 'authenticated'
);

-- Create storage bucket for articles if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('articles', 'articles', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for articles bucket
CREATE POLICY "Allow public article access"
ON storage.objects FOR SELECT
USING (bucket_id = 'articles');

CREATE POLICY "Allow authenticated article uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'articles' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Allow users to update own article images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'articles' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Allow users to delete own article images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'articles' AND
  auth.role() = 'authenticated'
);