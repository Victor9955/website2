'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({ node, ...props }) => (
            <img 
              {...props} 
              className="my-0" 
              style={{ 
                float: 'left', 
                margin: '0 1rem 1rem 0',
                maxWidth: '40%',
                ...props.style
              }}
            />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-auto">
              <table {...props} className="my-4" />
            </div>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}