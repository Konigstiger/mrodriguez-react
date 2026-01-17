export function estimateReadingTimeFromHtml(html: string): number {
  if (!html) return 0;

  // Strip HTML tags
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return 0;

  const words = text.split(" ").length;
  const wordsPerMinute = 200;

  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
