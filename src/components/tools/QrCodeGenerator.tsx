"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import QRCode from "qrcode";

export function QrCodeGenerator() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!input.trim()) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    let cancelled = false;
    QRCode.toCanvas(canvas, input, {
      width: 256,
      margin: 2,
      color: { dark: "#000000", light: "#ffffff" },
    })
      .then(() => { if (!cancelled) setError(""); })
      .catch(() => { if (!cancelled) setError("Failed to generate QR code. Input may be too long."); });

    return () => { cancelled = true; };
  }, [input]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas || !input.trim()) return;

    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="qr-input" className="block text-sm font-medium text-gray-700 mb-1">
          Text or URL
        </label>
        <input
          id="qr-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text or URL to encode..."
          className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">{error}</p>
      )}

      <div className="flex flex-col items-center gap-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 flex items-center justify-center min-h-[288px] min-w-[288px]">
          {input.trim() ? (
            <canvas ref={canvasRef} aria-label={`QR code for: ${input}`} />
          ) : (
            <>
              <canvas ref={canvasRef} className="hidden" />
              <p className="text-sm text-gray-400">Enter text above to generate a QR code</p>
            </>
          )}
        </div>

        <Button
          onClick={download}
          disabled={!input.trim()}
          variant="primary"
        >
          Download PNG
        </Button>
      </div>
    </div>
  );
}
