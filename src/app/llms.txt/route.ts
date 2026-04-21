import { tools } from "@/lib/tools-registry";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

const CATEGORY_TITLES: Record<string, string> = {
  generators: "Generators",
  converters: "Converters",
  formatters: "Formatters",
  text: "Text Tools",
};

export function GET() {
  const byCategory = tools.reduce<Record<string, typeof tools>>((acc, tool) => {
    (acc[tool.category] ||= []).push(tool);
    return acc;
  }, {});

  const categorySections = Object.entries(byCategory)
    .map(([category, items]) => {
      const links = items
        .map(
          (t) =>
            `- [${t.name}](${SITE_URL}/tools/${t.slug}): ${t.shortDescription}.`,
        )
        .join("\n");
      return `## ${CATEGORY_TITLES[category] ?? category}\n\n${links}`;
    })
    .join("\n\n");

  const body = `# ${SITE_NAME}

> Free online utility tools for developers and everyday use. Every tool runs entirely in your browser — no signup, no accounts, no data sent to servers, and no tracking beyond standard analytics and ads. Privacy-first, instant, and free forever.

${SITE_NAME} is a collection of ${tools.length} browser-based utility tools. All computation happens client-side in your browser: input you paste, text you generate, and files you create never leave your device. Tools are organized into generators (passwords, UUIDs, QR codes, lorem ipsum), converters (Base64, URL, color formats), formatters (JSON), and text utilities (word count, Markdown preview).

${categorySections}

## About

- [About](${SITE_URL}/about): Mission, what the site does, and how it is funded.
- [Privacy Policy](${SITE_URL}/privacy): Privacy practices, cookies, and ad disclosures.

## Optional

- [Sitemap](${SITE_URL}/sitemap.xml): Full machine-readable site index.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
