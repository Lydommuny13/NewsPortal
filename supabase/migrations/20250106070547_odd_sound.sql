-- Drop existing storage policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "profiles_read_policy" ON profiles;
  DROP POLICY IF EXISTS "profiles_update_policy" ON profiles;
  DROP POLICY IF EXISTS "avatars_select" ON storage.objects;
  DROP POLICY IF EXISTS "avatars_insert" ON storage.objects;
  DROP POLICY IF EXISTS "avatars_update" ON storage.objects;
  DROP POLICY IF EXISTS "avatars_delete" ON storage.objects;
END $$;

-- Ensure avatars bucket exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO UPDATE
SET public = true;

-- Create storage policies for avatars
CREATE POLICY "Public avatars access"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Auth users can upload avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = 'avatars'
);

CREATE POLICY "Users can update own avatars"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  owner = auth.uid()
);

CREATE POLICY "Users can delete own avatars"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  owner = auth.uid()
);

-- Update profile policies
CREATE POLICY "Public profiles access"
ON profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Ensure avatar_url column exists
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS avatar_url text;