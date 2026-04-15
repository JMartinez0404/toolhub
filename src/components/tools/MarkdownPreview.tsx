"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import {
  Bold, Italic, Heading1, Heading2, Link, Code, List, ListOrdered,
  Quote, Minus, Table, Copy, Download, Trash2, Maximize2, Minimize2,
} from "lucide-react";

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

### Table

| Feature | Supported |
|---------|-----------|
| Bold    | Yes       |
| Tables  | Yes       |
| Links   | Yes       |

### Lists

1. First item
2. Second item
3. Third item

> This is a blockquote. It can span
> multiple lines.

---

Start typing on the left to see your Markdown rendered in real time.
`;

interface ToolbarAction {
  icon: React.ReactNode;
  label: string;
  prefix: string;
  suffix?: string;
  block?: boolean;
}

const toolbarActions: ToolbarAction[] = [
  { icon: <Bold className="h-4 w-4" />, label: "Bold", prefix: "**", suffix: "**" },
  { icon: <Italic className="h-4 w-4" />, label: "Italic", prefix: "*", suffix: "*" },
  { icon: <Heading1 className="h-4 w-4" />, label: "Heading 1", prefix: "# ", block: true },
  { icon: <Heading2 className="h-4 w-4" />, label: "Heading 2", prefix: "## ", block: true },
  { icon: <Code className="h-4 w-4" />, label: "Code", prefix: "`", suffix: "`" },
  { icon: <Link className="h-4 w-4" />, label: "Link", prefix: "[", suffix: "](url)" },
  { icon: <List className="h-4 w-4" />, label: "Bullet List", prefix: "- ", block: true },
  { icon: <ListOrdered className="h-4 w-4" />, label: "Numbered List", prefix: "1. ", block: true },
  { icon: <Quote className="h-4 w-4" />, label: "Blockquote", prefix: "> ", block: true },
  { icon: <Minus className="h-4 w-4" />, label: "Divider", prefix: "\n---\n", block: true },
  { icon: <Table className="h-4 w-4" />, label: "Table", prefix: "\n| Header | Header |\n|--------|--------|\n| Cell   | Cell   |\n", block: true },
];

export function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [copied, setCopied] = useState<"md" | "html" | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const stats = useMemo(() => {
    const text = markdown.trim();
    if (!text) return { words: 0, chars: text.length, lines: 0 };
    const words = text.split(/\s+/).filter(Boolean).length;
    const lines = text.split("\n").length;
    return { words, chars: text.length, lines };
  }, [markdown]);

  const applyFormat = useCallback((action: ToolbarAction) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = markdown.substring(start, end) || "text";
    const suffix = action.suffix ?? "";

    let insertion: string;
    if (action.block) {
      insertion = action.prefix + selected;
    } else {
      insertion = action.prefix + selected + suffix;
    }

    const newValue = markdown.substring(0, start) + insertion + markdown.substring(end);
    setMarkdown(newValue);

    requestAnimationFrame(() => {
      ta.focus();
      const cursorPos = start + action.prefix.length + selected.length;
      ta.setSelectionRange(cursorPos, cursorPos);
    });
  }, [markdown]);

  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied("md");
    setTimeout(() => setCopied(null), 2000);
  };

  const copyHtml = async () => {
    const el = document.getElementById("md-preview");
    if (!el) return;
    await navigator.clipboard.writeText(el.innerHTML);
    setCopied("html");
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadMd = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const containerClass = fullscreen
    ? "fixed inset-0 z-50 bg-white p-4 flex flex-col"
    : "space-y-4";

  return (
    <div className={containerClass}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1.5">
        {toolbarActions.map((action) => (
          <button
            key={action.label}
            onClick={() => applyFormat(action)}
            title={action.label}
            className="rounded p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
          >
            {action.icon}
          </button>
        ))}

        <div className="mx-1 h-6 w-px bg-gray-300" />

        <button onClick={copyMarkdown} title="Copy Markdown" className="rounded p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors">
          <Copy className="h-4 w-4" />
        </button>
        <button onClick={downloadMd} title="Download .md" className="rounded p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors">
          <Download className="h-4 w-4" />
        </button>
        <button onClick={() => setMarkdown("")} title="Clear" className="rounded p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors">
          <Trash2 className="h-4 w-4" />
        </button>
        <button onClick={() => setFullscreen(!fullscreen)} title={fullscreen ? "Exit Fullscreen" : "Fullscreen"} className="rounded p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors">
          {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>

        {copied && (
          <span className="ml-2 text-xs text-green-600">
            {copied === "md" ? "Markdown copied!" : "HTML copied!"}
          </span>
        )}
      </div>

      {/* Editor + Preview */}
      <div className={`flex flex-col md:flex-row gap-4 ${fullscreen ? "flex-1 min-h-0" : "min-h-[500px]"}`}>
        <div className="flex-1 flex flex-col min-h-0">
          <label htmlFor="md-input" className="block text-sm font-medium text-gray-700 mb-1">
            Markdown
          </label>
          <textarea
            ref={textareaRef}
            id="md-input"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="flex-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[300px]"
            placeholder="Type your Markdown here..."
          />
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-1">
            <span className="block text-sm font-medium text-gray-700">Preview</span>
            <Button onClick={copyHtml} variant="outline" size="sm">
              {copied === "html" ? "Copied!" : "Copy HTML"}
            </Button>
          </div>
          <div
            id="md-preview"
            className="flex-1 rounded-lg border border-gray-200 px-6 py-4 overflow-auto min-h-[300px] prose prose-sm max-w-none
              prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600
              prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg
              prose-blockquote:border-l-blue-500 prose-blockquote:text-gray-600
              prose-li:text-gray-700 prose-strong:text-gray-900 prose-hr:border-gray-200
              prose-table:border-collapse prose-th:border prose-th:border-gray-300 prose-th:px-3 prose-th:py-1.5 prose-th:bg-gray-50
              prose-td:border prose-td:border-gray-300 prose-td:px-3 prose-td:py-1.5"
            aria-label="Rendered Markdown preview"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-200 pt-2">
        <span>{stats.words} words</span>
        <span>{stats.chars} characters</span>
        <span>{stats.lines} lines</span>
        <span>{Math.max(1, Math.ceil(stats.words / 200))} min read</span>
      </div>
    </div>
  );
}
