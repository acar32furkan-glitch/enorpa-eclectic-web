export function cleanContent(html: string): string {
  if (!html) return "";

  let result = html;

  result = result
    .replace(/\[vc_[^\]]*\]?/g, '')
    .replace(/\[\/vc_[^\]]*\]?/g, '')
    .replace(/\[[^\]]*\]?/g, '');

  result = result
    .replace(/&#8221;|&#8220;/g, '"')
    .replace(/&#8217;|&#8216;/g, "'")
    .replace(/&#8230;/g, '...')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#[0-9]+;/g, '')
    .replace(/&[a-z]+;/g, '');

  result = result
    .replace(/\s*data-\w+="[^"]*"/g, '')
    .replace(/\s*data-\w+='[^']*'/g, '');

  result = result
    .replace(/<p>\s*<\/p>/g, '')
    .replace(/<h[1-6]>\s*<\/h[1-6]>/g, '')
    .replace(/<div>\s*<\/div>/g, '');

  result = result.replace(/Lorem ipsum[\s\S]*?(?=<|$)/g, '');

  result = result
    .replace(/\n{3,}/g, '\n\n')
    .replace(/  +/g, ' ')
    .trim();

  return result;
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

export function generateExcerpt(content: string, maxLength: number = 150): string {
  const cleaned = cleanContent(content);
  const text = stripHtml(cleaned);

  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + '...';
}
