"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const BASES = [
  { label: "Decimal (base 10)", key: "dec" as const, radix: 10, chars: /[^0-9]/ },
  { label: "Binary (base 2)", key: "bin" as const, radix: 2, chars: /[^01]/ },
  { label: "Octal (base 8)", key: "oct" as const, radix: 8, chars: /[^0-7]/ },
  { label: "Hexadecimal (base 16)", key: "hex" as const, radix: 16, chars: /[^0-9a-fA-F]/ },
];

type Key = "dec" | "bin" | "oct" | "hex";

const empty = { dec: "", bin: "", oct: "", hex: "" };

export function NumberBaseConverter() {
  const [values, setValues] = useState<Record<Key, string>>(empty);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<Key | null>(null);

  const handleChange = (key: Key, raw: string, radix: number) => {
    setError("");
    const value = raw.trim();
    if (value === "") {
      setValues(empty);
      return;
    }
    const num = parseInt(value, radix);
    if (isNaN(num) || num < 0) {
      setError("Invalid input for this base.");
      setValues({ ...empty, [key]: value });
      return;
    }
    setValues({
      dec: num.toString(10),
      bin: num.toString(2),
      oct: num.toString(8),
      hex: num.toString(16).toUpperCase(),
    });
  };

  const copy = async (key: Key) => {
    await navigator.clipboard.writeText(values[key]);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const inputClass =
    "flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Number Base Converter</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">Edit any field — the others update instantly.</p>

      {error && (
        <p className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:border-red-900 dark:text-red-300">
          {error}
        </p>
      )}

      <div className="space-y-3">
        {BASES.map(({ label, key, radix }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{label}</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={values[key]}
                onChange={(e) => handleChange(key, e.target.value, radix)}
                placeholder="0"
                className={inputClass}
              />
              <Button variant="outline" size="sm" onClick={() => copy(key)} disabled={!values[key]}>
                {copied === key ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
