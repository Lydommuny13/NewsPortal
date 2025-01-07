-- Drop existing profile policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "profile_update_policy" ON profiles;
  DROP POLICY IF EXISTS "profile_read_policy" ON profiles;
  DROP POLICY IF EXISTS "profiles_select" ON profiles;
  DROP POLICY IF EXISTS "profiles_insert" ON profiles;
  DROP POLICY IF EXISTS "profiles_update" ON profiles;
END $$;

-- Create new simplified profile policies
CREATE POLICY "allow_read_own_profile"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "allow_update_own_profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(id);