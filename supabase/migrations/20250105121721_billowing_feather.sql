/*
  # Fix profiles table schema

  1. Changes
    - Add missing email column to profiles table
    - Add index on email column for better query performance

  2. Security
    - No changes to existing RLS policies
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'email'
  ) THEN
    ALTER TABLE profiles ADD COLUMN email text;
    CREATE INDEX profiles_email_idx ON profiles(email);
  END IF;
END $$;