"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

function slugify(text: string, separator: "-" | "_", lowercase: boolean): string {
  let slug = text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9\s_-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, separator);
  if (lowercase) slug = slug.toLowerCase();
  return slug;
}

export function SlugGenerator() {
  const [input, setInput] = useState("");
  const [separator, setSeparator] = useState<"-" | "_">("-");
  const [lowercase, setLowercase] = useState(true);
  const [copied, setCopied] = useState(false);

  const slug = slugify(input, separator, lowercase);

  const copy = async () => {
    if (!slug) return;
    await navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Slug Generator</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Title or Phrase</label>
        <input
          type="text"
          value={input}
          onChange={(e) => { setInput(e.target.value); setCopied(false); }}
          placeholder="e.g. How to Build a REST API in 2025"
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <fieldset>
          <legend className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Separator</legend>
          <div className="flex gap-4">
            {(["-", "_"] as const).map((s) => (
              <label key={s} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
                <input
                  type="radio"
                  name="separator"
                  checked={separator === s}
                  onChange={() => setSeparator(s)}
                  className="text-blue-600"
                />
                <span className="font-mono">{s === "-" ? "hyphen (-)" : "underscore (_)"}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer self-end">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
            className="rounded border-gray-300 text-blue-600"
          />
          Lowercase
        </label>
      </div>

      {slug && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Slug</label>
            <Button variant="outline" size="sm" onClick={copy}>{copied ? "Copied!" : "Copy"}</Button>
          </div>
          <div className="rounded-md bg-gray-50 border border-gray-200 px-3 py-3 text-base font-mono text-gray-900 break-all dark:bg-gray-950 dark:border-gray-700 dark:text-gray-100">
            {slug}
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{slug.length} characters</p>
        </div>
      )}
    </div>
  );
}
