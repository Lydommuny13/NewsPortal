-- Drop existing storage policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "avatars_select_policy" ON storage.objects;
  DROP POLICY IF EXISTS "avatars_insert_policy" ON storage.objects;
  DROP POLICY IF EXISTS "avatars_update_policy" ON storage.objects;
  DROP POLICY IF EXISTS "avatars_delete_policy" ON storage.objects;
END $$;

-- Create storage bucket for avatars if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Create simplified storage policies for avatars
CREATE POLICY "avatars_select"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "avatars_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "avatars_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars');

CREATE POLICY "avatars_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars');