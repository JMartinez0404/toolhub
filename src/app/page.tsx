"use client";

import { useState } from "react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { type LucideIcon, Search } from "lucide-react";
import { tools } from "@/lib/tools-registry";
import { SITE_NAME } from "@/lib/constants";

function getIcon(iconName: string): LucideIcon {
  return (LucideIcons as unknown as Record<string, LucideIcon>)[iconName] ?? LucideIcons.Wrench;
}

export default function HomePage() {
  const [query, setQuery] = useState("");

  const filtered = tools.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-4xl font-bold text-gray-900">
          Free Online Tools
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          {SITE_NAME} offers a growing collection of free, fast, and
          privacy-friendly tools that run entirely in your browser.
        </p>
      </div>

      <div className="relative mx-auto mb-10 max-w-md">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => {
          const Icon = getIcon(tool.icon);
          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-blue-200 hover:shadow-md"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mb-1 font-semibold text-gray-900">{tool.name}</h2>
              <p className="text-sm text-gray-500">{tool.shortDescription}</p>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500">
          No tools found matching &ldquo;{query}&rdquo;
        </p>
      )}
    </div>
  );
}
