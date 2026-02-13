import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import React from 'react';

function textContent(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textContent).join('');
  if (React.isValidElement(node) && node.props?.children) {
    return textContent(node.props.children);
  }
  return '';
}

export default function RichTextBlock({ content }: { content?: string }) {
  if (!content) return null;
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children, ...props }) => {
          const text = textContent(children);
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
          return <h2 id={id} {...props}>{children}</h2>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
