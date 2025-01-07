-- Drop existing role constraint
ALTER TABLE profiles 
  DROP CONSTRAINT IF EXISTS valid_roles;

-- Add new role constraint with only admin and reader
ALTER TABLE profiles
  ADD CONSTRAINT valid_roles 
  CHECK (role IN ('admin', 'reader'));

-- Update any existing editor roles to reader
UPDATE profiles 
SET role = 'reader' 
WHERE role = 'editor';

-- Set default role to reader
ALTER TABLE profiles 
  ALTER COLUMN role SET DEFAULT 'reader';

-- Create index for role column
CREATE INDEX IF NOT EXISTS idx_profiles_role 
ON profiles(role);