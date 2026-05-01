"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

function toWords(text: string): string[] {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function titleCase(text: string): string {
  const words = toWords(text);
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}

function sentenceCase(text: string): string {
  const words = toWords(text);
  return words
    .map((w, i) => (i === 0 ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase()))
    .join(" ");
}

function camelCase(text: string): string {
  const words = toWords(text);
  return words
    .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join("");
}

function pascalCase(text: string): string {
  return toWords(text)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}

function snakeCase(text: string): string {
  return toWords(text).map((w) => w.toLowerCase()).join("_");
}

function kebabCase(text: string): string {
  return toWords(text).map((w) => w.toLowerCase()).join("-");
}

function upperSnakeCase(text: string): string {
  return toWords(text).map((w) => w.toUpperCase()).join("_");
}

const CONVERSIONS: { label: string; fn: (t: string) => string }[] = [
  { label: "UPPERCASE", fn: (t) => t.toUpperCase() },
  { label: "lowercase", fn: (t) => t.toLowerCase() },
  { label: "Title Case", fn: titleCase },
  { label: "Sentence case", fn: sentenceCase },
  { label: "camelCase", fn: camelCase },
  { label: "PascalCase", fn: pascalCase },
  { label: "snake_case", fn: snakeCase },
  { label: "kebab-case", fn: kebabCase },
  { label: "UPPER_SNAKE", fn: upperSnakeCase },
];

export function TextCaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = (fn: (t: string) => string) => {
    setOutput(fn(input));
    setCopied(false);
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Text Case Converter</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your text here..."
          rows={5}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 font-mono placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {CONVERSIONS.map(({ label, fn }) => (
          <Button key={label} variant="outline" size="sm" onClick={() => convert(fn)} disabled={!input}>
            {label}
          </Button>
        ))}
      </div>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Output</label>
            <Button variant="outline" size="sm" onClick={copy}>
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <textarea
            value={output}
            readOnly
            rows={5}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          />
        </div>
      )}
    </div>
  );
}
