-- Drop existing storage policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "avatars_select" ON storage.objects;
  DROP POLICY IF EXISTS "avatars_insert" ON storage.objects;
  DROP POLICY IF EXISTS "avatars_update" ON storage.objects;
  DROP POLICY IF EXISTS "avatars_delete" ON storage.objects;
END $$;

-- Create storage bucket for avatars if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for avatars with proper owner tracking
CREATE POLICY "avatars_select_policy"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "avatars_insert_policy"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = 'avatars' AND
  owner = auth.uid()
);

CREATE POLICY "avatars_update_policy"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  owner = auth.uid()
);

CREATE POLICY "avatars_delete_policy"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  owner = auth.uid()
);

-- Add avatar_url column if it doesn't exist
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS avatar_url text;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_auth_id ON profiles(id);