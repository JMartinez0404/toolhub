"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

function formatDate(ms: number) {
  const d = new Date(ms);
  return {
    utc: d.toUTCString(),
    local: d.toLocaleString(),
    iso: d.toISOString(),
  };
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button variant="outline" size="sm" onClick={copy} disabled={!value}>
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}

export function UnixTimestamp() {
  const [tsInput, setTsInput] = useState("");
  const [tsResult, setTsResult] = useState<{ utc: string; local: string; iso: string } | null>(null);
  const [tsError, setTsError] = useState("");

  const [dateInput, setDateInput] = useState("");
  const [dateResult, setDateResult] = useState<{ seconds: string; millis: string } | null>(null);

  useEffect(() => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    setDateInput(
      `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`
    );
  }, []);

  const convertTimestamp = () => {
    setTsError("");
    setTsResult(null);
    const raw = tsInput.trim();
    if (!raw || isNaN(Number(raw))) {
      setTsError("Enter a valid numeric timestamp.");
      return;
    }
    const num = Number(raw);
    const ms = raw.length >= 13 ? num : num * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) {
      setTsError("Timestamp out of range.");
      return;
    }
    setTsResult(formatDate(ms));
  };

  const convertDate = () => {
    if (!dateInput) return;
    const ms = new Date(dateInput).getTime();
    setDateResult({
      seconds: String(Math.floor(ms / 1000)),
      millis: String(ms),
    });
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100";
  const rowClass = "flex items-center justify-between gap-2 rounded-md bg-gray-50 border border-gray-200 px-3 py-2 dark:bg-gray-950 dark:border-gray-700";
  const labelClass = "text-xs text-gray-500 dark:text-gray-400 w-16 shrink-0";
  const valueClass = "text-sm font-mono text-gray-900 dark:text-gray-100 flex-1";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-6 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Unix Timestamp Converter</h2>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Timestamp → Date</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">Auto-detects seconds (10 digits) or milliseconds (13 digits).</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={tsInput}
            onChange={(e) => setTsInput(e.target.value)}
            placeholder="e.g. 1700000000"
            className={inputClass}
          />
          <Button onClick={convertTimestamp}>Convert</Button>
        </div>
        {tsError && (
          <p className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:border-red-900 dark:text-red-300">
            {tsError}
          </p>
        )}
        {tsResult && (
          <div className="space-y-2">
            {(["utc", "local", "iso"] as const).map((key) => (
              <div key={key} className={rowClass}>
                <span className={labelClass}>{key.toUpperCase()}</span>
                <span className={valueClass}>{tsResult[key]}</span>
                <CopyButton value={tsResult[key]} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Date → Timestamp</h3>
        <div className="flex gap-2">
          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className={inputClass}
          />
          <Button onClick={convertDate}>Convert</Button>
        </div>
        {dateResult && (
          <div className="space-y-2">
            <div className={rowClass}>
              <span className={labelClass}>Seconds</span>
              <span className={valueClass}>{dateResult.seconds}</span>
              <CopyButton value={dateResult.seconds} />
            </div>
            <div className={rowClass}>
              <span className={labelClass}>Millis</span>
              <span className={valueClass}>{dateResult.millis}</span>
              <CopyButton value={dateResult.millis} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
