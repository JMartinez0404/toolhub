"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const parse = (json: string) => {
    setError("");
    return JSON.parse(json);
  };

  const format = () => {
    try {
      const parsed = parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const validate = () => {
    try {
      parse(input);
      setError("");
      setOutput("Valid JSON");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">JSON Formatter</h2>

      <div>
        <label htmlFor="json-input" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Input JSON
        </label>
        <textarea
          id="json-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError("");
          }}
          placeholder='{"key": "value"}'
          rows={8}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 font-mono placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500"
          spellCheck={false}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={format} disabled={!input.trim()}>
          Format
        </Button>
        <Button onClick={minify} disabled={!input.trim()} variant="outline">
          Minify
        </Button>
        <Button onClick={validate} disabled={!input.trim()} variant="outline">
          Validate
        </Button>
      </div>

      {error && (
        <p
          className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:border-red-900 dark:text-red-300"
          role="alert"
        >
          {error}
        </p>
      )}

      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="json-output"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Output
            </label>
            <Button variant="outline" size="sm" onClick={copy}>
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <textarea
            id="json-output"
            value={output}
            readOnly
            rows={8}
            className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 font-mono outline-none resize-y dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          />
        </div>
      )}
    </div>
  );
}
