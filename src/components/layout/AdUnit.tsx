"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AdUnitProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
}

export function AdUnit({ slot, format = "auto", className }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !slot) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded
    }
  }, [slot]);

  if (process.env.NODE_ENV !== "production" || !slot) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 py-6 text-xs text-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-500",
          className
        )}
      >
        Ad Space
      </div>
    );
  }

  return (
    <div ref={adRef} className={cn("overflow-hidden", className)}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
