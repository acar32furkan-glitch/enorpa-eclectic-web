const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const SITE = 'enorpa.com';
const OUTPUT_DIR = path.join(__dirname, 'crawled-data');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function fetchPage(urlStr) {
  return new Promise((resolve, reject) => {
    const mod = urlStr.startsWith('https') ? https : http;
    mod.get(urlStr, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 15000,
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchPage(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (!match) return '';
  let title = match[1].replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim();
  const parts = title.split(/\s*[|\-–]\s*/);
  return parts[0] || title;
}

function extractMetaDescription(html) {
  const match = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
  return match ? match[1].replace(/&[^;]+;/g, ' ').trim() : '';
}

function extractH1(html) {
  const match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  return match ? match[1].replace(/<[^>]+>/g, '').trim() : '';
}

function extractMainContent(html) {
  let content = html;

  content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  content = content.replace(/<nav[\s\S]*?<\/nav>/gi, '');

  const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/i) ||
                    content.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (mainMatch) {
    content = mainMatch[1];
  }

  content = content.replace(/<footer[\s\S]*?<\/footer>/gi, '');
  content = content.replace(/<header[\s\S]*?<\/header>/gi, '');

  const skipSelectors = [
    /<div[^>]*class=["'][^"']*(?:menu|nav|sidebar|widget|cookie|popup|modal)[^"']*["'][^>]*>[\s\S]*?<\/div>/gi,
  ];
  skipSelectors.forEach(re => { content = content.replace(re, ''); });

  content = content.replace(/<[^>]+>/g, ' ');
  content = content.replace(/&nbsp;/g, ' ');
  content = content.replace(/&amp;/g, '&');
  content = content.replace(/&lt;/g, '<');
  content = content.replace(/&gt;/g, '>');
  content = content.replace(/&quot;/g, '"');
  content = content.replace(/&#39;/g, "'");
  content = content.replace(/&[^;]+;/g, ' ');
  content = content.replace(/\n{3,}/g, '\n\n');
  content = content.replace(/  +/g, ' ');
  content = content.trim();

  const paragraphs = content.split(/\n\n+/).filter(p => p.length > 50);
  return paragraphs.slice(0, 20).join('\n\n');
}

function generateSlug(name) {
  const trMap = { 'ı':'i','ğ':'g','ü':'u','ş':'s','ö':'o','ç':'c','İ':'I','Ğ':'G','Ü':'U','Ş':'S','Ö':'O','Ç':'C' };
  return name
    .toLowerCase()
    .replace(/[ığüşöç]/g, c => trMap[c] || c)
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function crawlUrl(originalUrl, type, lang) {
  const urlStr = originalUrl.startsWith('http') ? originalUrl : `https://${originalUrl}`;
  console.log(`  Crawling [${lang}]: ${urlStr}`);

  try {
    const html = await fetchPage(urlStr);
    const title = extractTitle(html);
    const metaDesc = extractMetaDescription(html);
    const h1 = extractH1(html);
    const mainContent = extractMainContent(html);
    const slug = urlStr.split('/').filter(Boolean).pop() || '';

    return {
      url: originalUrl,
      slug,
      title,
      meta_description: metaDesc,
      h1,
      content: mainContent,
      language: lang,
      type,
      crawled_at: new Date().toISOString(),
    };
  } catch (err) {
    console.error(`  ERROR [${lang}]: ${urlStr} - ${err.message}`);
    return {
      url: originalUrl,
      slug: urlStr.split('/').filter(Boolean).pop() || '',
      title: '',
      meta_description: '',
      h1: '',
      content: '',
      language: lang,
      type,
      error: err.message,
      crawled_at: new Date().toISOString(),
    };
  }
}

async function crawlAll() {
  console.log('='.repeat(60));
  console.log('ENORPA.COM FULL CRAWLER');
  console.log('='.repeat(60));

  const pages = [
    // CORE PAGES
    { url: `https://${SITE}/`, type: 'home', lang: 'tr' },
    { url: `https://${SITE}/en/`, type: 'home', lang: 'en' },
    { url: `https://${SITE}/ru/`, type: 'home', lang: 'ru' },

    { url: `https://${SITE}/tr/hakkimizda/`, type: 'page', lang: 'tr' },
    { url: `https://${SITE}/en/about/`, type: 'page', lang: 'en' },
    { url: `https://${SITE}/ru/about/`, type: 'page', lang: 'ru' },

    { url: `https://${SITE}/tr/iletisim/`, type: 'page', lang: 'tr' },
    { url: `https://${SITE}/en/contact/`, type: 'page', lang: 'en' },
    { url: `https://${SITE}/ru/contact/`, type: 'page', lang: 'ru' },

    // PRODUCT CATEGORY PAGES
    { url: `https://${SITE}/tr/urunler/`, type: 'product-category', lang: 'tr' },
    { url: `https://${SITE}/en/products/`, type: 'product-category', lang: 'en' },
    { url: `https://${SITE}/ru/products/`, type: 'product-category', lang: 'ru' },

    // TR PRODUCT DETAILS
    { url: `https://${SITE}/tr/has-serisi/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/has-ng-serisi/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/has-turbo-serisi/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/akuamarin-serisi/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/ametist-serisi/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/turkuaz-serisi/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/kalsedon-serisi/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/obsidyen-serisi/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/kuvars-serisi-tek-kulhanli/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/kuvars-serisi-cift-kulhanli/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/kuvars-ng-serisi/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/turmalin-serisi/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/akuamarin-ks-serisi/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/turkuaz-ks-serisi/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/oniks-serisi/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/kat-kaloriferi/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/anahtar-teslim-sera-isitma-sistemi/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/brulorler/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/baca/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/kondenser/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/ekonomizer/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/kazan-otomasyon-sistemi/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/kazan-kontrol-panosu/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/yedek-parca/`, type: 'product', lang: 'tr' },
    { url: `https://${SITE}/tr/jasper-serisi/`, type: 'product', lang: 'tr' },

    // EN PRODUCT DETAILS
    { url: `https://${SITE}/en/has-series-hot-air-boilers/`, type: 'product', lang: 'en' },
    { url: `https://${SITE}/en/condenser/`, type: 'product', lang: 'en' },
    { url: `https://${SITE}/en/superheated-water-boilers/`, type: 'product', lang: 'en' },
    { url: `https://${SITE}/en/hot-air-boilers/`, type: 'product', lang: 'en' },
    { url: `https://${SITE}/en/kuvars-ng-series/`, type: 'product', lang: 'en' },

    // PROJECTS
    { url: `https://${SITE}/tr/projeler/`, type: 'project-list', lang: 'tr' },
    { url: `https://${SITE}/en/projects/`, type: 'project-list', lang: 'en' },
    { url: `https://${SITE}/ru/projects/`, type: 'project-list', lang: 'ru' },

    { url: `https://${SITE}/tr/portfolio/ozbekistan-taskent/`, type: 'project', lang: 'tr' },
    { url: `https://${SITE}/tr/portfolio/ozbekistan-harezm/`, type: 'project', lang: 'tr' },
    { url: `https://${SITE}/tr/portfolio/turkiye-manisa/`, type: 'project', lang: 'tr' },
    { url: `https://${SITE}/tr/portfolio/turkiye-izmir/`, type: 'project', lang: 'tr' },
    { url: `https://${SITE}/tr/portfolio/turkiye-isparta/`, type: 'project', lang: 'tr' },

    // REFERENCES
    { url: `https://${SITE}/tr/referanslarimiz/`, type: 'reference', lang: 'tr' },
    { url: `https://${SITE}/en/references/`, type: 'reference', lang: 'en' },
    { url: `https://${SITE}/ru/references/`, type: 'reference', lang: 'ru' },

    // BLOG
    { url: `https://${SITE}/tr/blog-2/`, type: 'blog-list', lang: 'tr' },
    { url: `https://${SITE}/en/blog/`, type: 'blog-list', lang: 'en' },
    { url: `https://${SITE}/ru/blog/`, type: 'blog-list', lang: 'ru' },

    { url: `https://${SITE}/tr/neden-enorpa/`, type: 'blog', lang: 'tr' },
    { url: `https://${SITE}/tr/neden-enorpa/`, type: 'blog', lang: 'tr' },
    { url: `https://${SITE}/tr/has-serisi-sicak-hava-kazanlari/`, type: 'blog', lang: 'tr' },
    { url: `https://${SITE}/tr/turmalin-serisi-buhar-kazani-endustriyel-isitmanin-yeni-yuzu/`, type: 'blog', lang: 'tr' },
    { url: `https://${SITE}/tr/kondenser-nedir-calisma-prensibi-verim-ve-uygulamalar-2/`, type: 'blog', lang: 'tr' },
    { url: `https://${SITE}/tr/growtech-antalya-23/`, type: 'blog', lang: 'tr' },
    { url: `https://${SITE}/tr/greenhouse-almati-kazakistan/`, type: 'blog', lang: 'tr' },
    { url: `https://${SITE}/tr/agroworld-ozbekistan/`, type: 'blog', lang: 'tr' },
    { url: `https://${SITE}/tr/domat-expo-antalya-2019/`, type: 'blog', lang: 'tr' },
    { url: `https://${SITE}/tr/enorpa-at-greentech-amsterdam-2025/`, type: 'blog', lang: 'tr' },
  ];

  const results = [];
  const delay = ms => new Promise(r => setTimeout(r, ms));

  for (const page of pages) {
    const result = await crawlUrl(page.url, page.type, page.lang);
    results.push(result);
    await delay(500);
  }

  const successCount = results.filter(r => r.content && r.content.length > 100).length;
  const failCount = results.length - successCount;

  console.log('='.repeat(60));
  console.log(`CRAWL COMPLETE: ${successCount}/${results.length} successful`);
  console.log('='.repeat(60));

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'crawled-pages.json'),
    JSON.stringify(results, null, 2)
  );

  generateSlugMapping(results);
  generateSupabaseSQL(results);
  generateSitemapData(results);

  return results;
}

function generateSlugMapping(results) {
  const mappings = results
    .filter(r => r.type === 'product' && r.language === 'tr')
    .map(tr => {
      const trSlug = tr.slug;
      const enSlug = trSlug
        .replace('urunler/', 'products/')
        .replace('has-serisi', 'has-series')
        .replace('has-ng-serisi', 'has-ng-series')
        .replace('has-turbo-serisi', 'has-turbo-series')
        .replace('sicak-hava', 'hot-air')
        .replace('sicak-su', 'hot-water')
        .replace('kizgin-su', 'superheated-water')
        .replace('buhar', 'steam');
      return { tr: trSlug, en: enSlug, title: tr.title };
    });

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'slug-mapping.json'),
    JSON.stringify(mappings, null, 2)
  );
  console.log(`Slug mapping saved: ${mappings.length} products`);
}

function generateSupabaseSQL(results) {
  const products = results.filter(r => r.type === 'product' && r.language === 'tr');
  const projects = results.filter(r => r.type === 'project');
  const blogPosts = results.filter(r => r.type === 'blog');

  let sql = '-- ENORPA CRAWLED CONTENT IMPORT\n';
  sql += '-- Generated: ' + new Date().toISOString() + '\n\n';

  sql += '-- PRODUCT META DATA UPDATE\n';
  for (const p of products) {
    if (!p.title || !p.meta_description) continue;
    const safeTitle = p.title.replace(/'/g, "''");
    const safeDesc = p.meta_description.replace(/'/g, "''");
    sql += `UPDATE products SET meta_title = '${safeTitle}', meta_description = '${safeDesc}', updated_at = NOW() WHERE slug = '${p.slug}';\n`;
  }

  sql += '\n-- PROJECTS IMPORT\n';
  sql += `CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    project_type VARCHAR(255),
    location VARCHAR(255),
    year VARCHAR(50),
    language VARCHAR(10) DEFAULT 'tr',
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );\n\n`;

  for (const p of projects) {
    if (!p.title) continue;
    const safeTitle = p.title.replace(/'/g, "''");
    const safeDesc = (p.content || '').replace(/'/g, "''").slice(0, 500);
    const subtitle = (p.h1 || '').replace(/'/g, "''");
    sql += `INSERT INTO projects (slug, title, subtitle, description, project_type, location, year, meta_title, language)
VALUES (
  '${p.slug}',
  '${safeTitle}',
  '${subtitle}',
  '${safeDesc}',
  '${p.type}',
  '',
  '',
  '${safeTitle}',
  '${p.language}'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  meta_title = EXCLUDED.meta_title;\n\n`;
  }

  sql += '\n-- BLOG META DATA UPDATE\n';
  for (const b of blogPosts) {
    if (!b.title || !b.meta_description) continue;
    const safeTitle = b.title.replace(/'/g, "''");
    const safeDesc = b.meta_description.replace(/'/g, "''");
    sql += `UPDATE blog_posts SET meta_title = '${safeTitle}', meta_description = '${safeDesc}', language = '${b.language}' WHERE slug = '${b.slug}';\n`;
  }

  sql += '\n-- PAGES META DATA\n';
  const pages = results.filter(r => r.type === 'page' || r.type === 'home');
  for (const p of pages) {
    if (!p.title) continue;
    const safeTitle = p.title.replace(/'/g, "''");
    const safeDesc = p.meta_description.replace(/'/g, "''");
    sql += `-- ${p.language.toUpperCase()} ${p.type}: ${p.url}\n`;
    sql += `-- Title: ${safeTitle}\n`;
    sql += `-- Description: ${safeDesc}\n\n`;
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, 'import-content.sql'), sql);
  console.log('Supabase SQL import saved');
}

function generateSitemapData(results) {
  const sitemapEntries = results.map(r => {
    const priority = r.type === 'home' ? '1.0' :
                     r.type === 'product' ? '0.7' :
                     r.type === 'project' ? '0.7' :
                     r.type === 'blog' ? '0.6' : '0.5';
    const changefreq = r.type === 'home' ? 'weekly' :
                       r.type === 'product' ? 'monthly' :
                       r.type === 'blog' ? 'monthly' : 'yearly';
    return {
      loc: `https://enorpa.com/${r.url.replace(`https://${SITE}/`, '').replace(/\/$/, '')}`,
      priority,
      changefreq,
      language: r.language,
    };
  });

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'sitemap-data.json'),
    JSON.stringify(sitemapEntries, null, 2)
  );
  console.log(`Sitemap data saved: ${sitemapEntries.length} URLs`);
}

crawlAll().catch(err => console.error('Crawl failed:', err));
