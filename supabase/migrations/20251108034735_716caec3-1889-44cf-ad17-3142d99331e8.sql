-- Add content fields to promotional_articles table
ALTER TABLE promotional_articles
ADD COLUMN IF NOT EXISTS slug text UNIQUE,
ADD COLUMN IF NOT EXISTS content text,
ADD COLUMN IF NOT EXISTS author text,
ADD COLUMN IF NOT EXISTS excerpt text,
ADD COLUMN IF NOT EXISTS featured_image_alt text;

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_promotional_articles_slug ON promotional_articles(slug);

-- Create function to generate slug from title
CREATE OR REPLACE FUNCTION generate_article_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    -- Generate slug from title: lowercase, replace spaces with hyphens, remove special chars
    NEW.slug := regexp_replace(
      regexp_replace(
        lower(trim(NEW.title)),
        '[^a-z0-9\s-]',
        '',
        'g'
      ),
      '\s+',
      '-',
      'g'
    );
    
    -- Ensure uniqueness by appending random suffix if needed
    WHILE EXISTS (SELECT 1 FROM promotional_articles WHERE slug = NEW.slug AND id != NEW.id) LOOP
      NEW.slug := NEW.slug || '-' || substring(md5(random()::text) from 1 for 6);
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate slug
DROP TRIGGER IF EXISTS set_article_slug ON promotional_articles;
CREATE TRIGGER set_article_slug
  BEFORE INSERT OR UPDATE ON promotional_articles
  FOR EACH ROW
  EXECUTE FUNCTION generate_article_slug();

-- Set default content for existing articles
UPDATE promotional_articles
SET 
  content = COALESCE(content, 'This article is available at: ' || link_url),
  excerpt = COALESCE(excerpt, subtitle),
  featured_image_alt = COALESCE(featured_image_alt, title)
WHERE content IS NULL OR excerpt IS NULL OR featured_image_alt IS NULL;