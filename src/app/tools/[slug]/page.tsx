import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tools } from "@/lib/tools-registry";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { PasswordGenerator } from "@/components/tools/PasswordGenerator";
import { UuidGenerator } from "@/components/tools/UuidGenerator";
import { JsonFormatter } from "@/components/tools/JsonFormatter";
import { Base64Codec } from "@/components/tools/Base64Codec";
import { WordCounter } from "@/components/tools/WordCounter";
import { ColorConverter } from "@/components/tools/ColorConverter";
import { LoremIpsumGenerator } from "@/components/tools/LoremIpsumGenerator";
import { QrCodeGenerator } from "@/components/tools/QrCodeGenerator";
import { UrlCodec } from "@/components/tools/UrlCodec";
import { MarkdownPreview } from "@/components/tools/MarkdownPreview";
import { TextCaseConverter } from "@/components/tools/TextCaseConverter";
import { UnixTimestamp } from "@/components/tools/UnixTimestamp";
import { NumberBaseConverter } from "@/components/tools/NumberBaseConverter";
import { HtmlEntityCodec } from "@/components/tools/HtmlEntityCodec";
import { HashGenerator } from "@/components/tools/HashGenerator";
import { DiffChecker } from "@/components/tools/DiffChecker";
import { CsvToJson } from "@/components/tools/CsvToJson";
import { JsonToCsv } from "@/components/tools/JsonToCsv";
import { JwtDecoder } from "@/components/tools/JwtDecoder";
import { RegexTester } from "@/components/tools/RegexTester";
import { SlugGenerator } from "@/components/tools/SlugGenerator";
import { LineTools } from "@/components/tools/LineTools";
import { BinaryConverter } from "@/components/tools/BinaryConverter";
import { HtmlMinifier } from "@/components/tools/HtmlMinifier";
import { RomanNumeralConverter } from "@/components/tools/RomanNumeralConverter";

const componentMap: Record<string, React.ComponentType> = {
  "password-generator": PasswordGenerator,
  "uuid-generator": UuidGenerator,
  "json-formatter": JsonFormatter,
  "base64-codec": Base64Codec,
  "word-counter": WordCounter,
  "color-converter": ColorConverter,
  "lorem-ipsum-generator": LoremIpsumGenerator,
  "qr-code-generator": QrCodeGenerator,
  "url-codec": UrlCodec,
  "markdown-preview": MarkdownPreview,
  "text-case-converter": TextCaseConverter,
  "unix-timestamp": UnixTimestamp,
  "number-base-converter": NumberBaseConverter,
  "html-entity-codec": HtmlEntityCodec,
  "hash-generator": HashGenerator,
  "diff-checker": DiffChecker,
  "csv-to-json": CsvToJson,
  "json-to-csv": JsonToCsv,
  "jwt-decoder": JwtDecoder,
  "regex-tester": RegexTester,
  "slug-generator": SlugGenerator,
  "line-tools": LineTools,
  "binary-converter": BinaryConverter,
  "html-minifier": HtmlMinifier,
  "roman-numeral-converter": RomanNumeralConverter,
};

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return {};

  const title = `Free ${tool.name} Online - ${SITE_NAME}`;
  return {
    title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: { canonical: `${SITE_URL}/tools/${tool.slug}` },
    openGraph: {
      title,
      description: tool.description,
      url: `${SITE_URL}/tools/${tool.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description: tool.description,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) notFound();

  const Component = componentMap[slug];
  if (!Component) notFound();

  return (
    <ToolLayout tool={tool}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: tool.name,
              description: tool.description,
              url: `${SITE_URL}/tools/${tool.slug}`,
              applicationCategory: "UtilityApplication",
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: (tool.faqs && tool.faqs.length > 0
                ? tool.faqs.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  }))
                : [
                    {
                      "@type": "Question",
                      name: `Is this ${tool.name.toLowerCase()} free?`,
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: `Yes, this ${tool.name.toLowerCase()} is completely free to use with no limits. No signup or download required.`,
                      },
                    },
                    {
                      "@type": "Question",
                      name: `Is my data safe with this ${tool.name.toLowerCase()}?`,
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Absolutely. This tool runs entirely in your browser. No data is ever sent to a server or stored anywhere.",
                      },
                    },
                  ]),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: tool.name, item: `${SITE_URL}/tools/${tool.slug}` },
              ],
            },
          ]),
        }}
      />
      <Component />
    </ToolLayout>
  );
}
