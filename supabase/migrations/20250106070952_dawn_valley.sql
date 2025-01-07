-- Drop existing profile policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "profiles_read_policy" ON profiles;
  DROP POLICY IF EXISTS "profiles_update_policy" ON profiles;
  DROP POLICY IF EXISTS "Public profiles access" ON profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
  DROP POLICY IF EXISTS "allow_read_own_profile" ON profiles;
  DROP POLICY IF EXISTS "allow_update_own_profile" ON profiles;
  DROP POLICY IF EXISTS "profiles_select" ON profiles;
  DROP POLICY IF EXISTS "profiles_update" ON profiles;
END $$;

-- Create new simplified profile policies
CREATE POLICY "allow_select_profiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "allow_update_profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_auth_id ON profiles(id);