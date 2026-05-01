"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

function countLines(text: string) {
  return text ? text.split("\n").length : 0;
}

const operations = [
  {
    label: "Sort A → Z",
    fn: (lines: string[]) => [...lines].sort((a, b) => a.localeCompare(b)),
  },
  {
    label: "Sort Z → A",
    fn: (lines: string[]) => [...lines].sort((a, b) => b.localeCompare(a)),
  },
  {
    label: "Remove Duplicates",
    fn: (lines: string[]) => [...new Set(lines)],
  },
  {
    label: "Reverse Order",
    fn: (lines: string[]) => [...lines].reverse(),
  },
  {
    label: "Remove Empty Lines",
    fn: (lines: string[]) => lines.filter((l) => l.trim() !== ""),
  },
  {
    label: "Trim Whitespace",
    fn: (lines: string[]) => lines.map((l) => l.trim()),
  },
];

export function LineTools() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const apply = (fn: (lines: string[]) => string[]) => {
    const lines = input.split("\n");
    setOutput(fn(lines).join("\n"));
    setCopied(false);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const textareaClass =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 font-mono placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Line Tools</h2>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Input</label>
          <span className="text-xs text-gray-400 dark:text-gray-500">{countLines(input)} lines</span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste lines of text here..."
          rows={10}
          className={textareaClass}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {operations.map(({ label, fn }) => (
          <Button key={label} variant="outline" size="sm" onClick={() => apply(fn)} disabled={!input}>
            {label}
          </Button>
        ))}
      </div>

      {output !== "" && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Output</label>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 dark:text-gray-500">{countLines(output)} lines</span>
              <Button variant="outline" size="sm" onClick={copy}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
          <textarea value={output} readOnly rows={10} className={textareaClass} />
        </div>
      )}
    </div>
  );
}
