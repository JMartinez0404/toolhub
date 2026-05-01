"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

function csvEscape(value: unknown): string {
  const str = value === null || value === undefined
    ? ""
    : typeof value === "object"
    ? JSON.stringify(value)
    : String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

export function JsonToCsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [rowCount, setRowCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const convert = () => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      if (!Array.isArray(parsed)) throw new Error("Input must be a JSON array of objects.");
      if (parsed.length === 0) throw new Error("Array is empty.");
      const headers = Object.keys(parsed[0] as Record<string, unknown>);
      const lines = [
        headers.join(","),
        ...(parsed as Record<string, unknown>[]).map((row) =>
          headers.map((h) => csvEscape(row[h])).join(",")
        ),
      ];
      setOutput(lines.join("\n"));
      setRowCount(parsed.length);
      setCopied(false);
    } catch (e) {
      setError((e as Error).message);
    }
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
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">JSON to CSV</h2>

      {error && (
        <p className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:border-red-900 dark:text-red-300">
          {error}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">JSON Array Input</label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(""); }}
          placeholder={'[{"name":"Alice","age":30},{"name":"Bob","age":25}]'}
          rows={8}
          className={textareaClass}
        />
      </div>

      <Button onClick={convert} disabled={!input} className="w-full">Convert to CSV</Button>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              CSV Output ({rowCount} rows)
            </label>
            <Button variant="outline" size="sm" onClick={copy}>
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <textarea value={output} readOnly rows={10} className={textareaClass} />
        </div>
      )}
    </div>
  );
}
