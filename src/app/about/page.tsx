import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { tools } from "@/lib/tools-registry";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${SITE_NAME} — free, fast, privacy-friendly online tools.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">
        About {SITE_NAME}
      </h1>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          {SITE_NAME} is a collection of free online tools built for developers,
          designers, writers, and anyone who needs quick utilities without the
          hassle of installing software.
        </p>
        <p>
          Every tool runs entirely in your browser. Your data never leaves your
          device — nothing is sent to a server, stored, or tracked. We believe
          useful tools should be fast, free, and private.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-gray-900">
          Currently Available
        </h2>
        <ul className="list-disc space-y-1 pl-6">
          {tools.map((tool) => (
            <li key={tool.slug}>{tool.name}</li>
          ))}
        </ul>
        <p>
          We regularly add new tools. If you have a suggestion, feel free to
          reach out!
        </p>
      </div>
    </div>
  );
}
