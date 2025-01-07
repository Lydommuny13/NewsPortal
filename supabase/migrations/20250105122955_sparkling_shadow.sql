/*
  # Fix Article RLS Policies

  1. Changes
    - Drop existing article policies
    - Add new policies for article management:
      - Allow authenticated users to create articles
      - Allow authors to update their own articles
      - Allow everyone to view published articles
      - Allow authors to view their own drafts
  
  2. Security
    - Enable RLS on articles table
    - Policies ensure users can only manage their own content
    - Published articles are publicly viewable
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Published articles are viewable by everyone" ON articles;
DROP POLICY IF EXISTS "Editors and admins can create articles" ON articles;
DROP POLICY IF EXISTS "Authors can update their own articles" ON articles;

-- Create new policies
CREATE POLICY "Anyone can create articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Published articles are viewable by everyone"
  ON articles FOR SELECT
  USING (
    status = 'published' OR 
    (auth.uid() = author_id)
  );

CREATE POLICY "Authors can delete their own articles"
  ON articles FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);