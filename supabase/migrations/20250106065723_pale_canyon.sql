-- Drop existing storage policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow public avatar access" ON storage.objects;
  DROP POLICY IF EXISTS "Allow avatar uploads" ON storage.objects;
  DROP POLICY IF EXISTS "Allow avatar updates" ON storage.objects;
  DROP POLICY IF EXISTS "Allow avatar deletes" ON storage.objects;
  DROP POLICY IF EXISTS "avatars_select" ON storage.objects;
  DROP POLICY IF EXISTS "avatars_insert" ON storage.objects;
  DROP POLICY IF EXISTS "avatars_update" ON storage.objects;
  DROP POLICY IF EXISTS "avatars_delete" ON storage.objects;
END $$;

-- Create storage bucket for avatars if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Create new storage policies with owner tracking
CREATE POLICY "avatar_access_policy"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "avatar_insert_policy"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = 'avatars'
);

CREATE POLICY "avatar_update_policy"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  owner = auth.uid()
);

CREATE POLICY "avatar_delete_policy"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  owner = auth.uid()
);

-- Add RLS policies for profiles table
CREATE POLICY "profile_update_policy"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "profile_read_policy"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);