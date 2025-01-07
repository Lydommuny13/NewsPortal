-- Drop existing storage policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow public avatar access" ON storage.objects;
  DROP POLICY IF EXISTS "Allow avatar uploads" ON storage.objects;
  DROP POLICY IF EXISTS "Allow avatar updates" ON storage.objects;
  DROP POLICY IF EXISTS "Allow avatar deletes" ON storage.objects;
END $$;

-- Create storage bucket for avatars if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Create new storage policies with owner tracking
CREATE POLICY "Allow public avatar access"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Allow avatar uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = 'avatars'
);

CREATE POLICY "Allow avatar updates"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  owner = auth.uid()
);

CREATE POLICY "Allow avatar deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  owner = auth.uid()
);

-- Add avatar_url column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE profiles ADD COLUMN avatar_url text;
  END IF;
END $$;