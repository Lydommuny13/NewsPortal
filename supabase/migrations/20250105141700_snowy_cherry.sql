/*
  # Add News-related Fields

  1. Changes
    - Add source_url column to articles table
    - Add is_breaking column for breaking news
    - Add trending_score for trending articles
    - Add indexes for performance

  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns to articles table
ALTER TABLE articles
ADD COLUMN IF NOT EXISTS source_url text,
ADD COLUMN IF NOT EXISTS is_breaking boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS trending_score integer DEFAULT 0;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_articles_trending 
ON articles(trending_score DESC) 
WHERE status = 'published';

CREATE INDEX IF NOT EXISTS idx_articles_breaking 
ON articles(created_at DESC) 
WHERE is_breaking = true;