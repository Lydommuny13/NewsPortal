-- Update specific user role to editor
DO $$ 
BEGIN
  -- First ensure the user exists and update their role
  UPDATE profiles
  SET role = 'editor'
  WHERE email = 'okimkhmer@gmail.com'
  AND EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.email = 'okimkhmer@gmail.com'
  );
END $$;