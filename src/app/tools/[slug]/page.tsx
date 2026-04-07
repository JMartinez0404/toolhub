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

  const title = `${tool.name} - Free Online`;
  return {
    title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: { canonical: `${SITE_URL}/tools/${tool.slug}` },
    openGraph: {
      title: `${tool.name} | ${SITE_NAME}`,
      description: tool.description,
      url: `${SITE_URL}/tools/${tool.slug}`,
      type: "website",
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
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: tool.name,
            description: tool.description,
            url: `${SITE_URL}/tools/${tool.slug}`,
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      <Component />
    </ToolLayout>
  );
}
