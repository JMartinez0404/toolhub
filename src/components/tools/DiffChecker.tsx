"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type DiffLine = { type: "same" | "add" | "remove"; text: string };

function computeDiff(a: string[], b: string[]): DiffLine[] {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);

  const result: DiffLine[] = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      result.unshift({ type: "same", text: a[i - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: "add", text: b[j - 1] });
      j--;
    } else {
      result.unshift({ type: "remove", text: a[i - 1] });
      i--;
    }
  }
  return result;
}

export function DiffChecker() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [diff, setDiff] = useState<DiffLine[] | null>(null);

  const compare = () => {
    const a = original.split("\n");
    const b = modified.split("\n");
    setDiff(computeDiff(a, b));
  };

  const additions = diff?.filter((l) => l.type === "add").length ?? 0;
  const removals = diff?.filter((l) => l.type === "remove").length ?? 0;

  const textareaClass =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 font-mono placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Diff Checker</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Original</label>
          <textarea
            value={original}
            onChange={(e) => { setOriginal(e.target.value); setDiff(null); }}
            placeholder="Paste original text..."
            rows={10}
            className={textareaClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Modified</label>
          <textarea
            value={modified}
            onChange={(e) => { setModified(e.target.value); setDiff(null); }}
            placeholder="Paste modified text..."
            rows={10}
            className={textareaClass}
          />
        </div>
      </div>

      <Button onClick={compare} className="w-full">Compare</Button>

      {diff && (
        <div className="space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="text-green-600 dark:text-green-400 font-medium">+{additions} added</span>
            {" · "}
            <span className="text-red-600 dark:text-red-400 font-medium">−{removals} removed</span>
            {" · "}
            {diff.length - additions - removals} unchanged
          </p>
          <div className="rounded-md border border-gray-200 overflow-auto max-h-96 dark:border-gray-700">
            {diff.map((line, i) => (
              <div
                key={i}
                className={
                  "px-3 py-0.5 text-sm font-mono whitespace-pre-wrap " +
                  (line.type === "add"
                    ? "bg-green-50 text-green-800 dark:bg-green-950/40 dark:text-green-200"
                    : line.type === "remove"
                    ? "bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-200"
                    : "text-gray-700 dark:text-gray-300")
                }
              >
                {line.type === "add" ? "+ " : line.type === "remove" ? "− " : "  "}
                {line.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
