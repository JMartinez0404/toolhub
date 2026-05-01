"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

function base64urlDecode(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/").padEnd(str.length + (4 - (str.length % 4)) % 4, "=");
  return atob(padded);
}

function decodeJwt(token: string) {
  const parts = token.trim().split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT: expected 3 parts separated by dots.");
  return {
    header: JSON.parse(base64urlDecode(parts[0])),
    payload: JSON.parse(base64urlDecode(parts[1])),
    signature: parts[2],
  };
}

export function JwtDecoder() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ header: unknown; payload: Record<string, unknown>; signature: string } | null>(null);
  const [error, setError] = useState("");

  const decode = (value: string) => {
    setError("");
    setResult(null);
    if (!value.trim()) return;
    try {
      setResult(decodeJwt(value));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const isExpired = result?.payload?.exp
    ? Number(result.payload.exp) * 1000 < Date.now()
    : false;

  const panelClass = "rounded-md bg-gray-50 border border-gray-200 p-3 text-xs font-mono text-gray-900 overflow-auto max-h-48 whitespace-pre dark:bg-gray-950 dark:border-gray-700 dark:text-gray-100";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">JWT Decoder</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">JWT Token</label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); decode(e.target.value); }}
          placeholder="Paste your JWT here (eyJ...)"
          rows={3}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 font-mono placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500"
        />
      </div>

      <Button onClick={() => decode(input)} disabled={!input} className="w-full">Decode</Button>

      {error && (
        <p className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:border-red-900 dark:text-red-300">
          {error}
        </p>
      )}

      {isExpired && (
        <p className="rounded-md bg-yellow-50 border border-yellow-200 px-3 py-2 text-sm text-yellow-800 dark:bg-yellow-950/40 dark:border-yellow-900 dark:text-yellow-300">
          This token has expired (exp: {new Date(Number(result!.payload.exp) * 1000).toLocaleString()})
        </p>
      )}

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Header</p>
            <div className={panelClass}>{JSON.stringify(result.header, null, 2)}</div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Payload</p>
            <div className={panelClass}>{JSON.stringify(result.payload, null, 2)}</div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Signature</p>
            <div className={panelClass + " break-all"}>{result.signature}</div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Signature cannot be verified without the secret key.</p>
          </div>
        </div>
      )}
    </div>
  );
}
