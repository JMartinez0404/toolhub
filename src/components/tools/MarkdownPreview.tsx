"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

const DEFAULT_MARKDOWN = `# Markdown Preview

## Features

- **Bold text** and *italic text*
- [Links](https://example.com)
- Inline \`code\` snippets

### Code Block

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

### Lists

1. First item
2. Second item
3. Third item

> This is a blockquote. It can span
> multiple lines.

---

That's it! Start typing on the left to see your Markdown rendered in real time.
`;

export function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);

  return (
    <div className="flex flex-col md:flex-row gap-4 min-h-[400px]">
      <div className="flex-1 flex flex-col">
        <label htmlFor="md-input" className="block text-sm font-medium text-gray-700 mb-1">
          Markdown
        </label>
        <textarea
          id="md-input"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="flex-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[300px]"
          placeholder="Type your Markdown here..."
        />
      </div>

      <div className="flex-1 flex flex-col">
        <span className="block text-sm font-medium text-gray-700 mb-1">Preview</span>
        <div
          className="flex-1 rounded-lg border border-gray-200 px-6 py-4 overflow-auto min-h-[300px] prose prose-sm max-w-none
            prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600
            prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg
            prose-blockquote:border-l-blue-500 prose-blockquote:text-gray-600
            prose-li:text-gray-700 prose-strong:text-gray-900 prose-hr:border-gray-200"
          aria-label="Rendered Markdown preview"
        >
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
