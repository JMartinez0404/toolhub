"use client";

import Link from "next/link";
import { AdUnit } from "@/components/layout/AdUnit";
import { tools, type ToolMeta } from "@/lib/tools-registry";
import * as LucideIcons from "lucide-react";
import { type LucideIcon } from "lucide-react";

function getIcon(iconName: string): LucideIcon {
  return (LucideIcons as unknown as Record<string, LucideIcon>)[iconName] ?? LucideIcons.Wrench;
}

interface ToolLayoutProps {
  tool: ToolMeta;
  children: React.ReactNode;
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const sameCategory = tools.filter((t) => t.slug !== tool.slug && t.category === tool.category);
  const others = tools.filter((t) => t.slug !== tool.slug && t.category !== tool.category);
  const related = [...sameCategory, ...others].slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-gray-100">{tool.name}</span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
        Free {tool.name} Online
      </h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">{tool.description}</p>

      <section className="mb-6 rounded-lg bg-blue-50 p-4 text-sm text-gray-700 dark:bg-blue-950/40 dark:text-gray-200">
        <h2 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
          How to use this {tool.name.toLowerCase()}
        </h2>
        <p>Use this free {tool.name.toLowerCase()} directly in your browser. No signup, no download, no data sent to any server. Your data stays on your device.</p>
      </section>

      <AdUnit className="mb-6" />

      <div className="mb-8">{children}</div>

      <AdUnit className="mb-8" />

      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          More Tools
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {related.map((t) => {
            const Icon = getIcon(t.icon);
            return (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
              >
                <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{t.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.shortDescription}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
