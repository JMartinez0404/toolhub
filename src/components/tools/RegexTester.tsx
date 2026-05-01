"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const FLAGS = ["g", "i", "m", "s"] as const;
type Flag = (typeof FLAGS)[number];

interface Match {
  index: number;
  match: string;
  groups: string[];
}

export function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState<Set<Flag>>(new Set(["g"]));
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setMatches([]);
    if (!pattern || !testString) return;
    try {
      const flagStr = Array.from(flags).join("") + (flags.has("g") ? "" : "g");
      const re = new RegExp(pattern, flagStr.includes("g") ? flagStr : flagStr + "g");
      const found: Match[] = [];
      let m: RegExpExecArray | null;
      while ((m = re.exec(testString)) !== null) {
        found.push({
          index: m.index,
          match: m[0],
          groups: m.slice(1).map((g) => g ?? "(undefined)"),
        });
        if (!flagStr.includes("g")) break;
      }
      setMatches(found);
    } catch (e) {
      setError((e as Error).message);
    }
  }, [pattern, flags, testString]);

  const toggleFlag = (f: Flag) => {
    setFlags((prev) => {
      const next = new Set(prev);
      next.has(f) ? next.delete(f) : next.add(f);
      return next;
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Regex Tester</h2>

      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Pattern</label>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="e.g. \d+\.\d+"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Flags</p>
          <div className="flex gap-3">
            {FLAGS.map((f) => (
              <label key={f} className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={flags.has(f)}
                  onChange={() => toggleFlag(f)}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="font-mono">{f}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <p className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:border-red-900 dark:text-red-300">
          {error}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Test String</label>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Paste text to test against..."
          rows={6}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 font-mono placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500"
        />
      </div>

      {testString && pattern && !error && (
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            {matches.length === 0 ? "No matches found." : `${matches.length} match${matches.length === 1 ? "" : "es"} found`}
          </p>
          {matches.length > 0 && (
            <div className="space-y-1 max-h-48 overflow-auto rounded-md border border-gray-200 dark:border-gray-700 p-2">
              {matches.map((m, i) => (
                <div key={i} className="text-sm font-mono flex gap-3 text-gray-800 dark:text-gray-200">
                  <span className="text-gray-400 dark:text-gray-500 shrink-0">#{i + 1} @{m.index}</span>
                  <span className="bg-yellow-100 dark:bg-yellow-900/40 px-1 rounded">{m.match}</span>
                  {m.groups.length > 0 && (
                    <span className="text-gray-500 dark:text-gray-400">groups: [{m.groups.join(", ")}]</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
