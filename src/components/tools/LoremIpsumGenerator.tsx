"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "at", "vero", "eos",
  "accusamus", "iusto", "odio", "dignissimos", "ducimus", "blanditiis",
  "praesentium", "voluptatum", "deleniti", "atque", "corrupti", "quos",
  "dolores", "quas", "molestias", "recusandae", "itaque", "earum", "rerum",
  "hic", "tenetur", "sapiente", "delectus", "aut", "reiciendis", "voluptatibus",
  "maiores", "alias", "perferendis", "doloribus", "asperiores", "repellat",
  "temporibus", "quibusdam", "illum", "fugit", "quo", "voluptas", "aspernatur",
];

const FIRST_SENTENCE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

type Mode = "paragraphs" | "sentences" | "words";

function randomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function generateSentence(): string {
  const len = 8 + Math.floor(Math.random() * 10);
  const words = Array.from({ length: len }, randomWord);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(sentenceCount: number): string {
  return Array.from({ length: sentenceCount }, generateSentence).join(" ");
}

export function LoremIpsumGenerator() {
  const [mode, setMode] = useState<Mode>("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const maxCount = mode === "paragraphs" ? 50 : mode === "sentences" ? 200 : 1000;

  const generate = useCallback(() => {
    let result = "";
    if (mode === "words") {
      const words = Array.from({ length: count }, randomWord);
      words[0] = "Lorem";
      if (count > 1) words[1] = "ipsum";
      result = words.join(" ") + ".";
    } else if (mode === "sentences") {
      const sentences = [FIRST_SENTENCE];
      for (let i = 1; i < count; i++) sentences.push(generateSentence());
      result = sentences.join(" ");
    } else {
      const paragraphs: string[] = [];
      for (let i = 0; i < count; i++) {
        const p = i === 0
          ? FIRST_SENTENCE + " " + generateParagraph(4)
          : generateParagraph(5);
        paragraphs.push(p);
      }
      result = paragraphs.join("\n\n");
    }
    setOutput(result);
  }, [mode, count]);

  const copyText = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Type</legend>
        <div className="flex gap-4">
          {(["paragraphs", "sentences", "words"] as const).map((m) => (
            <label key={m} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="lorem-mode"
                value={m}
                checked={mode === m}
                onChange={() => { setMode(m); setCount(m === "paragraphs" ? 3 : m === "sentences" ? 5 : 50); }}
                className="accent-blue-600"
              />
              <span className="text-sm capitalize text-gray-700 dark:text-gray-200">{m}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex items-center gap-3">
        <label
          htmlFor="lorem-count"
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Count
        </label>
        <input
          id="lorem-count"
          type="number"
          min={1}
          max={maxCount}
          value={count}
          onChange={(e) => setCount(Math.max(1, Math.min(maxCount, Number(e.target.value) || 1)))}
          className="w-24 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
        />
        <span className="text-xs text-gray-500 dark:text-gray-400">max {maxCount}</span>
      </div>

      <Button onClick={generate}>Generate</Button>

      {output && (
        <div className="space-y-2">
          <div className="flex justify-end">
            <Button size="sm" variant="outline" onClick={copyText}>
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={10}
            aria-label="Generated lorem ipsum text"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200"
          />
        </div>
      )}
    </div>
  );
}
