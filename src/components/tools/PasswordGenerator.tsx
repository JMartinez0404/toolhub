"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

const CHARSETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function getStrength(length: number, typesCount: number) {
  const score = (length >= 20 ? 3 : length >= 12 ? 2 : 1) + typesCount;
  if (score >= 6) return { label: "Strong", color: "bg-green-500", width: "w-full" };
  if (score >= 4) return { label: "Medium", color: "bg-yellow-500", width: "w-2/3" };
  return { label: "Weak", color: "bg-red-500", width: "w-1/3" };
}

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const charset = Object.entries(options)
      .filter(([, v]) => v)
      .map(([k]) => CHARSETS[k as keyof typeof CHARSETS])
      .join("");
    if (!charset) return;
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    setPassword(Array.from(array, (n) => charset[n % charset.length]).join(""));
    setCopied(false);
  }, [length, options]);

  const copy = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeTypes = Object.values(options).filter(Boolean).length;
  const strength = getStrength(length, activeTypes);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-5">
      <h2 className="text-lg font-semibold text-gray-900">Password Generator</h2>

      <div>
        <label htmlFor="pw-length" className="block text-sm font-medium text-gray-700 mb-1">
          Length: {length}
        </label>
        <input
          id="pw-length"
          type="range"
          min={8}
          max={128}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>8</span>
          <span>128</span>
        </div>
      </div>

      <fieldset className="flex flex-wrap gap-4">
        <legend className="text-sm font-medium text-gray-700 mb-2">Character types</legend>
        {(Object.keys(options) as (keyof typeof options)[]).map((key) => (
          <label key={key} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={options[key]}
              onChange={() => setOptions((o) => ({ ...o, [key]: !o[key] }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
        ))}
      </fieldset>

      <Button onClick={generate} disabled={activeTypes === 0} className="w-full">
        Generate Password
      </Button>

      {password && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-md bg-gray-50 border border-gray-200 px-3 py-2 text-sm font-mono break-all">
              {password}
            </code>
            <Button variant="outline" size="sm" onClick={copy}>
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Strength</span>
              <span>{strength.label}</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${strength.color} ${strength.width}`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
