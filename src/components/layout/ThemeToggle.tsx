"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "toolhub-theme";

type Theme = "light" | "dark";

function isValidTheme(v: unknown): v is Theme {
  return v === "light" || v === "dark";
}

function readStoredTheme(): Theme | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return isValidTheme(raw) ? raw : null;
  } catch {
    return null;
  }
}

function resolveTheme(): Theme {
  const stored = readStoredTheme();
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Broadcast local (same-tab) theme changes to all subscribers since
// localStorage.setItem does not fire 'storage' in the tab that wrote it.
const subscribers = new Set<() => void>();
function notify() {
  subscribers.forEach((cb) => cb());
}

function subscribe(cb: () => void) {
  subscribers.add(cb);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const mqHandler = () => cb();
  const storageHandler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) cb();
  };
  mq.addEventListener("change", mqHandler);
  window.addEventListener("storage", storageHandler);
  return () => {
    subscribers.delete(cb);
    mq.removeEventListener("change", mqHandler);
    window.removeEventListener("storage", storageHandler);
  };
}

// Server/initial-hydration always reports "light" so SSR output is consistent.
// After hydration, useSyncExternalStore re-reads the real value and updates.
function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, resolveTheme, getServerSnapshot);

  // Keep <html>.className in sync with the resolved theme.
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    // Enable color transitions after first paint so the initial render doesn't animate.
    root.classList.add("theme-ready");
  }, [theme]);

  const toggle = useCallback(() => {
    const next: Theme = resolveTheme() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable — apply for the session only.
      document.documentElement.classList.toggle("dark", next === "dark");
    }
    notify();
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      suppressHydrationWarning
    >
      {/* Icon may differ between server-rendered "light" default and the real client theme;
          suppressHydrationWarning is safe because the state is purely visual. */}
      <span suppressHydrationWarning>
        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </span>
    </button>
  );
}
