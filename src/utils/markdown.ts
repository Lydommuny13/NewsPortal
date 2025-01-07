import { marked } from 'marked';
import DOMPurify from 'dompurify';

export function renderMarkdown(content: string): string {
  if (!content) return '';
  
  const rawHtml = marked.parse(content, {
    breaks: true,
    gfm: true
  });
  
  return DOMPurify.sanitize(rawHtml);
}