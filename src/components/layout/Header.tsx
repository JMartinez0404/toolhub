import Link from "next/link";
import { Wrench } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-gray-100"
        >
          <Wrench className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          {SITE_NAME}
        </Link>
        <nav className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
          <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            Tools
          </Link>
          <Link
            href="/about"
            className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
