"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Algorithm = "SHA-256" | "SHA-1" | "SHA-512";

async function hashText(text: string, algorithm: Algorithm): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buffer = await crypto.subtle.digest(algorithm, data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const ALGORITHMS: Algorithm[] = ["SHA-256", "SHA-1", "SHA-512"];

export function HashGenerator() {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState<Algorithm>("SHA-256");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const result = await hashText(input, algorithm);
      setHash(result);
      setCopied(false);
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Hash Generator</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          rows={6}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 font-mono placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500"
        />
      </div>

      <fieldset className="flex flex-wrap gap-4">
        <legend className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Algorithm</legend>
        {ALGORITHMS.map((alg) => (
          <label key={alg} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
            <input
              type="radio"
              name="algorithm"
              value={alg}
              checked={algorithm === alg}
              onChange={() => setAlgorithm(alg)}
              className="text-blue-600"
            />
            {alg}
          </label>
        ))}
      </fieldset>

      <Button onClick={generate} disabled={!input || loading} className="w-full">
        {loading ? "Generating..." : "Generate Hash"}
      </Button>

      {hash && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {algorithm} Hash ({hash.length} chars)
            </label>
            <Button variant="outline" size="sm" onClick={copy}>
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <div className="rounded-md bg-gray-50 border border-gray-200 px-3 py-2 text-sm font-mono text-gray-900 break-all dark:bg-gray-950 dark:border-gray-700 dark:text-gray-100">
            {hash}
          </div>
        </div>
      )}
    </div>
  );
}
