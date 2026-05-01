"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

function encodeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decodeHtml(html: string): string {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
}

export function HtmlEntityCodec() {
  const [plain, setPlain] = useState("");
  const [encoded, setEncoded] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<"plain" | "encoded" | null>(null);

  const encode = () => {
    setError("");
    try {
      setEncoded(encodeHtml(plain));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const decode = () => {
    setError("");
    try {
      setPlain(decodeHtml(encoded));
    } catch {
      setError("Failed to decode HTML entities.");
    }
  };

  const copy = async (side: "plain" | "encoded") => {
    await navigator.clipboard.writeText(side === "plain" ? plain : encoded);
    setCopied(side);
    setTimeout(() => setCopied(null), 2000);
  };

  const textareaClass =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 font-mono placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">HTML Entity Encoder / Decoder</h2>

      {error && (
        <p className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:border-red-900 dark:text-red-300">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Plain Text</label>
            <Button variant="outline" size="sm" onClick={() => copy("plain")} disabled={!plain}>
              {copied === "plain" ? "Copied!" : "Copy"}
            </Button>
          </div>
          <textarea
            value={plain}
            onChange={(e) => { setPlain(e.target.value); setError(""); }}
            placeholder='e.g. <script>alert("xss")</script>'
            rows={8}
            className={textareaClass}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">HTML Entities</label>
            <Button variant="outline" size="sm" onClick={() => copy("encoded")} disabled={!encoded}>
              {copied === "encoded" ? "Copied!" : "Copy"}
            </Button>
          </div>
          <textarea
            value={encoded}
            onChange={(e) => { setEncoded(e.target.value); setError(""); }}
            placeholder="e.g. &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
            rows={8}
            className={textareaClass}
          />
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <Button onClick={encode} disabled={!plain}>Encode →</Button>
        <Button onClick={decode} variant="outline" disabled={!encoded}>← Decode</Button>
      </div>
    </div>
  );
}
