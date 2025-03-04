'use client';

import ReactMarkdown from 'react-markdown';

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}