"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    const fields: string[] = [];
    let i = 0;
    while (i <= line.length) {
      let field = "";
      if (line[i] === '"') {
        i++;
        while (i < line.length) {
          if (line[i] === '"' && line[i + 1] === '"') { field += '"'; i += 2; }
          else if (line[i] === '"') { i++; break; }
          else { field += line[i++]; }
        }
        if (line[i] === ",") i++;
      } else {
        const end = line.indexOf(",", i);
        if (end === -1) { field = line.slice(i); i = line.length + 1; }
        else { field = line.slice(i, end); i = end + 1; }
      }
      fields.push(field);
    }
    rows.push(fields);
  }
  return rows;
}

export function CsvToJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [rowCount, setRowCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const convert = () => {
    setError("");
    try {
      const rows = parseCsv(input);
      if (rows.length < 2) throw new Error("Need at least a header row and one data row.");
      const [headers, ...data] = rows;
      const result = data.map((row) => {
        const obj: Record<string, string> = {};
        headers.forEach((h, idx) => { obj[h] = row[idx] ?? ""; });
        return obj;
      });
      setOutput(JSON.stringify(result, null, 2));
      setRowCount(result.length);
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
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">CSV to JSON</h2>

      {error && (
        <p className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:border-red-900 dark:text-red-300">
          {error}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">CSV Input</label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(""); }}
          placeholder={"name,age,city\nAlice,30,New York\nBob,25,London"}
          rows={8}
          className={textareaClass}
        />
      </div>

      <Button onClick={convert} disabled={!input} className="w-full">Convert to JSON</Button>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              JSON Output ({rowCount} rows)
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
