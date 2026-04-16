"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const sn = s / 100, ln = l / 100;
  if (sn === 0) { const v = Math.round(ln * 255); return [v, v, v]; }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const hn = h / 360;
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  return [
    Math.round(hue2rgb(p, q, hn + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, hn) * 255),
    Math.round(hue2rgb(p, q, hn - 1 / 3) * 255),
  ];
}

export function ColorConverter() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState<[number, number, number]>([59, 130, 246]);
  const [hsl, setHsl] = useState<[number, number, number]>([217, 91, 60]);
  const [copied, setCopied] = useState("");

  const updateFromHex = useCallback((h: string) => {
    setHex(h);
    const r = hexToRgb(h);
    setRgb(r);
    setHsl(rgbToHsl(...r));
  }, []);

  const updateFromRgb = useCallback((r: number, g: number, b: number) => {
    setRgb([r, g, b]);
    setHex(rgbToHex(r, g, b));
    setHsl(rgbToHsl(r, g, b));
  }, []);

  const updateFromHsl = useCallback((h: number, s: number, l: number) => {
    setHsl([h, s, l]);
    const r = hslToRgb(h, s, l);
    setRgb(r);
    setHex(rgbToHex(...r));
  }, []);

  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 1500);
  };

  const hexStr = hex;
  const rgbStr = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  const hslStr = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;

  return (
    <div className="space-y-6">
      <div
        className="w-full h-32 rounded-lg border border-gray-200 dark:border-gray-700"
        style={{ backgroundColor: hex }}
        aria-label={`Color preview: ${hex}`}
      />

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <label
            htmlFor="color-picker"
            className="text-sm font-medium text-gray-700 dark:text-gray-200 w-16"
          >
            Picker
          </label>
          <input
            id="color-picker"
            type="color"
            value={hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="w-12 h-10 rounded cursor-pointer border border-gray-200 dark:border-gray-700 bg-transparent"
          />
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="hex-input"
            className="text-sm font-medium text-gray-700 dark:text-gray-200 w-16"
          >
            HEX
          </label>
          <input
            id="hex-input"
            type="text"
            value={hex}
            onChange={(e) => {
              const v = e.target.value;
              if (/^#[0-9a-fA-F]{6}$/.test(v)) updateFromHex(v);
              else setHex(v);
            }}
            className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500"
            maxLength={7}
          />
          <Button size="sm" variant="outline" onClick={() => copy(hexStr, "hex")}>
            {copied === "hex" ? "Copied!" : "Copy"}
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 w-16">RGB</span>
          <div className="flex flex-1 gap-2">
            {(["R", "G", "B"] as const).map((label, i) => (
              <div key={label} className="flex-1">
                <label htmlFor={`rgb-${label}`} className="sr-only">{label}</label>
                <input
                  id={`rgb-${label}`}
                  type="number"
                  min={0}
                  max={255}
                  value={rgb[i]}
                  onChange={(e) => {
                    const next: [number, number, number] = [...rgb];
                    next[i] = Math.max(0, Math.min(255, Number(e.target.value) || 0));
                    updateFromRgb(...next);
                  }}
                  placeholder={label}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500"
                />
              </div>
            ))}
          </div>
          <Button size="sm" variant="outline" onClick={() => copy(rgbStr, "rgb")}>
            {copied === "rgb" ? "Copied!" : "Copy"}
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 w-16">HSL</span>
          <div className="flex flex-1 gap-2">
            {(["H", "S", "L"] as const).map((label, i) => (
              <div key={label} className="flex-1">
                <label htmlFor={`hsl-${label}`} className="sr-only">{label}</label>
                <input
                  id={`hsl-${label}`}
                  type="number"
                  min={0}
                  max={i === 0 ? 360 : 100}
                  value={hsl[i]}
                  onChange={(e) => {
                    const next: [number, number, number] = [...hsl];
                    next[i] = Math.max(0, Math.min(i === 0 ? 360 : 100, Number(e.target.value) || 0));
                    updateFromHsl(...next);
                  }}
                  placeholder={label}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500"
                />
              </div>
            ))}
          </div>
          <Button size="sm" variant="outline" onClick={() => copy(hslStr, "hsl")}>
            {copied === "hsl" ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>
    </div>
  );
}
