-- Drop existing storage policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow public avatar access" ON storage.objects;
  DROP POLICY IF EXISTS "Allow authenticated avatar uploads" ON storage.objects;
  DROP POLICY IF EXISTS "Allow users to update own avatars" ON storage.objects;
  DROP POLICY IF EXISTS "Allow users to delete own avatars" ON storage.objects;
END $$;

-- Create storage bucket for avatars if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Create simplified storage policies for avatars
CREATE POLICY "avatars_select_policy"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "avatars_insert_policy"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "avatars_update_policy"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars');

CREATE POLICY "avatars_delete_policy"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars');