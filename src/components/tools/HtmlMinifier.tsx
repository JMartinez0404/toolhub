"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

function minifyHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s+/g, " ")
    .replace(/> </g, "><")
    .trim();
}

export function HtmlMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [stats, setStats] = useState<{ original: number; minified: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const minify = () => {
    const result = minifyHtml(input);
    setOutput(result);
    setStats({ original: new Blob([input]).size, minified: new Blob([result]).size });
    setCopied(false);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saved = stats ? stats.original - stats.minified : 0;
  const pct = stats ? ((saved / stats.original) * 100).toFixed(1) : "0";

  const textareaClass =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 font-mono placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">HTML Minifier</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">HTML Input</label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setOutput(""); setStats(null); }}
          placeholder="Paste your HTML here..."
          rows={10}
          className={textareaClass}
        />
      </div>

      <Button onClick={minify} disabled={!input} className="w-full">Minify HTML</Button>

      {output && (
        <>
          {stats && (
            <div className="rounded-md bg-blue-50 border border-blue-200 px-3 py-2 text-sm text-blue-800 dark:bg-blue-950/40 dark:border-blue-900 dark:text-blue-200 flex flex-wrap gap-4">
              <span>Original: <strong>{stats.original.toLocaleString()} B</strong></span>
              <span>Minified: <strong>{stats.minified.toLocaleString()} B</strong></span>
              <span>Saved: <strong>{saved.toLocaleString()} B ({pct}%)</strong></span>
            </div>
          )}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Minified Output</label>
              <Button variant="outline" size="sm" onClick={copy}>{copied ? "Copied!" : "Copy"}</Button>
            </div>
            <textarea value={output} readOnly rows={6} className={textareaClass} />
          </div>
        </>
      )}
    </div>
  );
}
