"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Direction = "text-binary" | "binary-text" | "text-hex" | "hex-text";

function textToBinary(text: string): string {
  return Array.from(new TextEncoder().encode(text))
    .map((b) => b.toString(2).padStart(8, "0"))
    .join(" ");
}

function binaryToText(binary: string): string {
  const bytes = binary.trim().split(/\s+/).map((b) => parseInt(b, 2));
  if (bytes.some(isNaN)) throw new Error("Invalid binary — use space-separated 8-bit groups.");
  return new TextDecoder().decode(new Uint8Array(bytes));
}

function textToHex(text: string): string {
  return Array.from(new TextEncoder().encode(text))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(" ");
}

function hexToText(hex: string): string {
  const pairs = hex.trim().replace(/\s+/g, "").match(/.{2}/g);
  if (!pairs) throw new Error("Invalid hex string.");
  const bytes = pairs.map((h) => parseInt(h, 16));
  if (bytes.some(isNaN)) throw new Error("Invalid hex — use pairs of hex digits (0-9, a-f).");
  return new TextDecoder().decode(new Uint8Array(bytes));
}

const DIRECTIONS: { value: Direction; label: string }[] = [
  { value: "text-binary", label: "Text → Binary" },
  { value: "binary-text", label: "Binary → Text" },
  { value: "text-hex", label: "Text → Hex" },
  { value: "hex-text", label: "Hex → Text" },
];

const PLACEHOLDERS: Record<Direction, { input: string; output: string }> = {
  "text-binary": { input: "e.g. Hello", output: "01001000 01100101..." },
  "binary-text": { input: "e.g. 01001000 01100101", output: "" },
  "text-hex": { input: "e.g. Hello", output: "48 65 6c 6c 6f" },
  "hex-text": { input: "e.g. 48 65 6c 6c 6f", output: "" },
};

export function BinaryConverter() {
  const [direction, setDirection] = useState<Direction>("text-binary");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = () => {
    setError("");
    try {
      const result =
        direction === "text-binary" ? textToBinary(input) :
        direction === "binary-text" ? binaryToText(input) :
        direction === "text-hex" ? textToHex(input) :
        hexToText(input);
      setOutput(result);
      setCopied(false);
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
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
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Binary / Hex Converter</h2>

      <div className="flex flex-wrap gap-2">
        {DIRECTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => { setDirection(value); setInput(""); setOutput(""); setError(""); }}
            className={
              "px-3 py-1.5 rounded-md text-sm font-medium border transition-colors " +
              (direction === value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800")
            }
          >
            {label}
          </button>
        ))}
      </div>

      {error && (
        <p className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:border-red-900 dark:text-red-300">
          {error}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Input</label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(""); }}
          placeholder={PLACEHOLDERS[direction].input}
          rows={5}
          className={textareaClass}
        />
      </div>

      <Button onClick={convert} disabled={!input} className="w-full">Convert</Button>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Output</label>
            <Button variant="outline" size="sm" onClick={copy}>{copied ? "Copied!" : "Copy"}</Button>
          </div>
          <textarea value={output} readOnly rows={5} className={textareaClass} />
        </div>
      )}
    </div>
  );
}
