"use client";

import { useMemo, useState } from "react";

function computeStats(text: string) {
  const trimmed = text.trim();
  if (!trimmed) {
    return { words: 0, charsWithSpaces: 0, charsNoSpaces: 0, sentences: 0, paragraphs: 0, readingTime: "0 sec" };
  }

  const words = trimmed.split(/\s+/).length;
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = (trimmed.match(/[.!?]+(\s|$)/g) || []).length || (trimmed.length > 0 ? 1 : 0);
  const paragraphs = trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;

  const minutes = words / 200;
  let readingTime: string;
  if (minutes < 1) {
    readingTime = `${Math.max(1, Math.ceil(minutes * 60))} sec`;
  } else {
    readingTime = `${Math.ceil(minutes)} min`;
  }

  return { words, charsWithSpaces, charsNoSpaces, sentences, paragraphs, readingTime };
}

export function WordCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => computeStats(text), [text]);

  const statItems = [
    { label: "Words", value: stats.words },
    { label: "Characters (with spaces)", value: stats.charsWithSpaces },
    { label: "Characters (no spaces)", value: stats.charsNoSpaces },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Reading time", value: stats.readingTime },
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Word Counter</h2>

      <div>
        <label
          htmlFor="wc-input"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
        >
          Enter or paste your text
        </label>
        <textarea
          id="wc-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste text here..."
          rows={10}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-center dark:border-gray-800 dark:bg-gray-950"
          >
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{item.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
