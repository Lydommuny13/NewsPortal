/*
  # Set up initial admin user

  1. Changes
    - Updates the role to 'admin' for a user with a specific email
    - Uses a safer approach with email matching
    
  2. Security
    - Only updates if the user exists
    - Maintains existing RLS policies
*/

DO $$ 
BEGIN
  -- Update the user's role to admin based on email
  UPDATE profiles
  SET role = 'admin'
  WHERE email = 'admin@example.com'
  AND EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.email = 'admin@example.com'
  );
END $$;