"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function UuidGenerator() {
  const [uuid, setUuid] = useState("");
  const [bulkCount, setBulkCount] = useState(10);
  const [bulkUuids, setBulkUuids] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const generateOne = () => {
    const id = crypto.randomUUID();
    setUuid(id);
    setCopiedId(null);
  };

  const generateBulk = () => {
    const count = Math.max(1, Math.min(100, bulkCount));
    setBulkUuids(Array.from({ length: count }, () => crypto.randomUUID()));
    setCopiedId(null);
  };

  const copy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-5 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">UUID Generator</h2>

      <div className="space-y-3">
        <Button onClick={generateOne} className="w-full">
          Generate UUID
        </Button>

        {uuid && (
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-md bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-900 font-mono dark:bg-gray-950 dark:border-gray-700 dark:text-gray-100">
              {uuid}
            </code>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copy(uuid, "single")}
            >
              {copiedId === "single" ? "Copied!" : "Copy"}
            </Button>
          </div>
        )}
      </div>

      <hr className="border-gray-200 dark:border-gray-800" />

      <div className="space-y-3">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label
              htmlFor="bulk-count"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Bulk count (1-100)
            </label>
            <input
              id="bulk-count"
              type="number"
              min={1}
              max={100}
              value={bulkCount}
              onChange={(e) => setBulkCount(Number(e.target.value))}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            />
          </div>
          <Button onClick={generateBulk}>Generate Bulk</Button>
        </div>

        {bulkUuids.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {bulkUuids.length} UUIDs
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copy(bulkUuids.join("\n"), "all")}
              >
                {copiedId === "all" ? "Copied!" : "Copy All"}
              </Button>
            </div>
            <ul
              className="max-h-64 overflow-y-auto rounded-md border border-gray-200 divide-y divide-gray-100 dark:border-gray-800 dark:divide-gray-800"
              role="list"
            >
              {bulkUuids.map((id, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <code className="text-xs font-mono text-gray-700 dark:text-gray-200">{id}</code>
                  <button
                    onClick={() => copy(id, id)}
                    className="text-xs text-blue-600 hover:text-blue-800 ml-2 shrink-0 dark:text-blue-400 dark:hover:text-blue-300"
                    aria-label={`Copy UUID ${i + 1}`}
                  >
                    {copiedId === id ? "Copied" : "Copy"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
