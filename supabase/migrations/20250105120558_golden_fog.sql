/*
  # Initial Schema for Khmer News Website

  1. New Tables
    - `profiles`
      - Extended user profile data
      - Linked to auth.users
    - `articles`
      - Main content table for news articles
      - Supports Khmer Unicode content
    - `categories`
      - Article categorization
    - `tags`
      - Article tagging system
    - `article_tags`
      - Many-to-many relationship between articles and tags
    - `comments`
      - User comments on articles
    - `bookmarks`
      - User article bookmarks
    - `newsletter_subscriptions`
      - Email newsletter management

  2. Security
    - RLS policies for each table
    - Role-based access control
*/

-- Profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  role text DEFAULT 'reader' CHECK (role IN ('admin', 'editor', 'reader')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_km text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tags table
CREATE TABLE tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_km text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Articles table
CREATE TABLE articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_km text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  content_km text NOT NULL,
  excerpt text,
  excerpt_km text,
  category_id uuid REFERENCES categories(id),
  author_id uuid REFERENCES profiles(id),
  featured_image text,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Article Tags junction table
CREATE TABLE article_tags (
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- Comments table
CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bookmarks table
CREATE TABLE bookmarks (
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, article_id)
);

-- Newsletter subscriptions table
CREATE TABLE newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Categories policies
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Only admins can modify categories"
  ON categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Articles policies
CREATE POLICY "Published articles are viewable by everyone"
  ON articles FOR SELECT
  USING (status = 'published' OR auth.uid() = author_id);

CREATE POLICY "Editors and admins can create articles"
  ON articles FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('editor', 'admin')
    )
  );

CREATE POLICY "Authors can update their own articles"
  ON articles FOR UPDATE
  USING (auth.uid() = author_id OR 
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Comments policies
CREATE POLICY "Approved comments are viewable by everyone"
  ON comments FOR SELECT
  USING (status = 'approved' OR user_id = auth.uid());

CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  USING (auth.uid() = user_id);

-- Bookmarks policies
CREATE POLICY "Users can view own bookmarks"
  ON bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own bookmarks"
  ON bookmarks FOR ALL
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX articles_slug_idx ON articles(slug);
CREATE INDEX articles_status_idx ON articles(status);
CREATE INDEX articles_published_at_idx ON articles(published_at);
CREATE INDEX comments_article_id_idx ON comments(article_id);
CREATE INDEX comments_status_idx ON comments(status);