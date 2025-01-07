-- Drop existing profile policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "profiles_read" ON profiles;
  DROP POLICY IF EXISTS "profiles_update" ON profiles;
END $$;

-- Create new profile policies
CREATE POLICY "profiles_read_policy"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "profiles_update_policy"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_auth_id ON profiles(id);

-- Ensure avatar_url column exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE profiles ADD COLUMN avatar_url text;
  END IF;
END $$;