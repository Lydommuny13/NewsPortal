-- Drop existing profile policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "allow_select_profiles" ON profiles;
  DROP POLICY IF EXISTS "allow_update_profile" ON profiles;
END $$;

-- Create new profile policies
CREATE POLICY "profiles_select"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "profiles_update"
  ON profiles FOR UPDATE
  USING (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "profiles_delete"
  ON profiles FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);