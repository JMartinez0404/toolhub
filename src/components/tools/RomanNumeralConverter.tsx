"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const VALUES: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

function toRoman(n: number): string {
  if (!Number.isInteger(n) || n < 1 || n > 3999) throw new Error("Enter a whole number between 1 and 3999.");
  let result = "";
  for (const [value, numeral] of VALUES) {
    while (n >= value) { result += numeral; n -= value; }
  }
  return result;
}

function fromRoman(s: string): number {
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  const upper = s.toUpperCase().trim();
  if (!upper) throw new Error("Enter a Roman numeral.");
  let total = 0, prev = 0;
  for (let i = upper.length - 1; i >= 0; i--) {
    const val = map[upper[i]];
    if (!val) throw new Error(`Invalid character: "${upper[i]}"`);
    total += val < prev ? -val : val;
    prev = val;
  }
  if (total < 1 || total > 3999) throw new Error("Result out of range (1–3999).");
  return total;
}

export function RomanNumeralConverter() {
  const [intInput, setIntInput] = useState("");
  const [intOutput, setIntOutput] = useState("");
  const [intError, setIntError] = useState("");
  const [intCopied, setIntCopied] = useState(false);

  const [romInput, setRomInput] = useState("");
  const [romOutput, setRomOutput] = useState("");
  const [romError, setRomError] = useState("");
  const [romCopied, setRomCopied] = useState(false);

  const convertToRoman = () => {
    setIntError(""); setIntOutput("");
    try { setIntOutput(toRoman(parseInt(intInput, 10))); }
    catch (e) { setIntError((e as Error).message); }
  };

  const convertFromRoman = () => {
    setRomError(""); setRomOutput("");
    try { setRomOutput(String(fromRoman(romInput))); }
    catch (e) { setRomError((e as Error).message); }
  };

  const copy = async (value: string, setCopied: (v: boolean) => void) => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass = "flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100";
  const outputClass = "rounded-md bg-gray-50 border border-gray-200 px-3 py-2 text-xl font-mono text-gray-900 dark:bg-gray-950 dark:border-gray-700 dark:text-gray-100";
  const errorClass = "rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:border-red-900 dark:text-red-300";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-6 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Roman Numeral Converter</h2>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Integer → Roman</h3>
        <div className="flex gap-2">
          <input type="number" min={1} max={3999} value={intInput} onChange={(e) => setIntInput(e.target.value)}
            placeholder="e.g. 2024" className={inputClass} />
          <Button onClick={convertToRoman}>Convert</Button>
        </div>
        {intError && <p className={errorClass}>{intError}</p>}
        {intOutput && (
          <div className="flex items-center gap-2">
            <div className={outputClass + " flex-1"}>{intOutput}</div>
            <Button variant="outline" size="sm" onClick={() => copy(intOutput, setIntCopied)}>
              {intCopied ? "Copied!" : "Copy"}
            </Button>
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Roman → Integer</h3>
        <div className="flex gap-2">
          <input type="text" value={romInput} onChange={(e) => setRomInput(e.target.value)}
            placeholder="e.g. MMXXIV" className={inputClass} />
          <Button onClick={convertFromRoman}>Convert</Button>
        </div>
        {romError && <p className={errorClass}>{romError}</p>}
        {romOutput && (
          <div className="flex items-center gap-2">
            <div className={outputClass + " flex-1"}>{romOutput}</div>
            <Button variant="outline" size="sm" onClick={() => copy(romOutput, setRomCopied)}>
              {romCopied ? "Copied!" : "Copy"}
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
