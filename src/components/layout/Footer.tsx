import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50 py-8 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <nav className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
            <Link
              href="/about"
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
