import { marked } from 'marked';

export function parseMarkdown(raw) {
  return marked.parse(raw, {
    mangle: false,
    headerIds: false,
    breaks: true,
  });
}
