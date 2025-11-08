-- Fix search path for generate_article_slug function
DROP TRIGGER IF EXISTS set_article_slug ON promotional_articles;
DROP FUNCTION IF EXISTS generate_article_slug() CASCADE;

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
$$ LANGUAGE plpgsql
SET search_path = public, pg_temp
SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER set_article_slug
  BEFORE INSERT OR UPDATE ON promotional_articles
  FOR EACH ROW
  EXECUTE FUNCTION generate_article_slug();