"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

function utf8ToBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToUtf8(b64: string): string {
  const binary = atob(b64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function Base64Codec() {
  const [plainText, setPlainText] = useState("");
  const [base64Text, setBase64Text] = useState("");
  const [error, setError] = useState("");
  const [copiedSide, setCopiedSide] = useState<"plain" | "base64" | null>(null);

  const encode = () => {
    setError("");
    try {
      setBase64Text(utf8ToBase64(plainText));
    } catch (e) {
      setError(`Encode error: ${(e as Error).message}`);
    }
  };

  const decode = () => {
    setError("");
    try {
      setPlainText(base64ToUtf8(base64Text));
    } catch {
      setError("Invalid Base64 string. Please check your input.");
    }
  };

  const copy = async (side: "plain" | "base64") => {
    const text = side === "plain" ? plainText : base64Text;
    await navigator.clipboard.writeText(text);
    setCopiedSide(side);
    setTimeout(() => setCopiedSide(null), 2000);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Base64 Encoder / Decoder</h2>

      {error && (
        <p className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="plain-input" className="text-sm font-medium text-gray-700">
              Plain Text
            </label>
            <Button variant="outline" size="sm" onClick={() => copy("plain")} disabled={!plainText}>
              {copiedSide === "plain" ? "Copied!" : "Copy"}
            </Button>
          </div>
          <textarea
            id="plain-input"
            value={plainText}
            onChange={(e) => {
              setPlainText(e.target.value);
              setError("");
            }}
            placeholder="Enter plain text..."
            rows={8}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="base64-input" className="text-sm font-medium text-gray-700">
              Base64
            </label>
            <Button variant="outline" size="sm" onClick={() => copy("base64")} disabled={!base64Text}>
              {copiedSide === "base64" ? "Copied!" : "Copy"}
            </Button>
          </div>
          <textarea
            id="base64-input"
            value={base64Text}
            onChange={(e) => {
              setBase64Text(e.target.value);
              setError("");
            }}
            placeholder="Enter Base64 string..."
            rows={8}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y"
          />
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <Button onClick={encode} disabled={!plainText}>
          Encode →
        </Button>
        <Button onClick={decode} variant="outline" disabled={!base64Text}>
          ← Decode
        </Button>
      </div>
    </div>
  );
}
