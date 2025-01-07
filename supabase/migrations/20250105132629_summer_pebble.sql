-- Reset all users to reader role first
UPDATE profiles
SET role = 'reader'
WHERE email != 'admin@example.com';

-- Set admin@example.com as admin
UPDATE profiles
SET role = 'admin'
WHERE email = 'admin@example.com'
AND EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.email = 'admin@example.com'
);

-- Ensure okimkhmer@gmail.com is set as reader
UPDATE profiles
SET role = 'reader'
WHERE email = 'okimkhmer@gmail.com'
AND EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.email = 'okimkhmer@gmail.com'
);