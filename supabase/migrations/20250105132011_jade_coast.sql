-- Update user roles to ensure access
DO $$ 
BEGIN
  -- Update existing users to have editor role if they don't have a role
  UPDATE profiles
  SET role = 'editor'
  WHERE role IS NULL OR role = 'reader';

  -- Make sure at least one admin exists
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE role = 'admin') THEN
    UPDATE profiles
    SET role = 'admin'
    WHERE id IN (SELECT id FROM profiles LIMIT 1);
  END IF;
END $$;