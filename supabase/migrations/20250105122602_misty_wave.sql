/*
  # Fix Profiles RLS Policies

  1. Changes
    - Drop existing profiles policies
    - Add new policies for profile management
    - Allow users to create their own profile
    - Allow users to update their own profile
    - Allow public read access to profiles

  2. Security
    - Enable RLS
    - Add specific policies for INSERT and UPDATE
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create new policies
CREATE POLICY "Anyone can create their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);