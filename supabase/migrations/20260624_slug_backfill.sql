-- Add slug column to products table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Backfill slug column for existing products
UPDATE public.products SET slug = CASE 
  WHEN name ILIKE '%kalsedon%' THEN 'kalsedon-serisi'
  WHEN name ILIKE '%obsidyen%' THEN 'obsidyen-serisi'
  WHEN name ILIKE '%akuamarin%' THEN 'akuamarin-serisi'
  WHEN name ILIKE '%kuvars%' THEN 'kuvars-serisi'
  WHEN name ILIKE '%turmalin%' THEN 'turmalin-serisi'
  WHEN name ILIKE '%has%' THEN 'has-turbo-serisi'
  ELSE regexp_replace(
    lower(
      regexp_replace(
        name,
        '[ıİ]', 'i', 'g'
      )
    ),
    '[^a-z0-9]+', '-', 'g'
  )
END
WHERE slug IS NULL;