"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function UrlCodec() {
  const [decoded, setDecoded] = useState("");
  const [encoded, setEncoded] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  const encode = () => {
    setError("");
    try {
      const result = encodeURIComponent(decoded);
      setEncoded(result);
    } catch {
      setError("Failed to encode the input.");
    }
  };

  const decode = () => {
    setError("");
    try {
      const result = decodeURIComponent(encoded);
      setDecoded(result);
    } catch {
      setError("Failed to decode. The encoded string may be malformed (e.g., invalid % sequences).");
    }
  };

  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label
            htmlFor="url-decoded"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Decoded
          </label>
          <Button
            size="sm"
            variant="outline"
            onClick={() => copy(decoded, "decoded")}
            disabled={!decoded}
          >
            {copied === "decoded" ? "Copied!" : "Copy"}
          </Button>
        </div>
        <textarea
          id="url-decoded"
          value={decoded}
          onChange={(e) => setDecoded(e.target.value)}
          rows={5}
          placeholder="Enter decoded URL or text..."
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 font-mono placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500"
        />
      </div>

      <div className="flex items-center gap-3 justify-center">
        <Button onClick={encode} disabled={!decoded}>
          Encode &darr;
        </Button>
        <Button onClick={decode} variant="secondary" disabled={!encoded}>
          Decode &uarr;
        </Button>
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 text-center" role="alert">
          {error}
        </p>
      )}

      <div>
        <div className="flex items-center justify-between mb-1">
          <label
            htmlFor="url-encoded"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Encoded
          </label>
          <Button
            size="sm"
            variant="outline"
            onClick={() => copy(encoded, "encoded")}
            disabled={!encoded}
          >
            {copied === "encoded" ? "Copied!" : "Copy"}
          </Button>
        </div>
        <textarea
          id="url-encoded"
          value={encoded}
          onChange={(e) => setEncoded(e.target.value)}
          rows={5}
          placeholder="Enter encoded URL or text..."
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 font-mono placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500"
        />
      </div>
    </div>
  );
}
