import { toolsContent, type ToolContent } from "./tools-content";

export type { ToolFaq, ToolContent } from "./tools-content";

export interface ToolMeta extends ToolContent {
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  keywords: string[];
  icon: string;
  category: "generators" | "converters" | "formatters" | "text";
}

type BaseTool = Omit<ToolMeta, keyof ToolContent>;

const baseTools: BaseTool[] = [
  {
    slug: "password-generator",
    name: "Password Generator",
    description:
      "Generate strong, secure random passwords with customizable length, uppercase, lowercase, numbers, and special characters.",
    shortDescription: "Create strong, random passwords",
    keywords: ["password generator", "random password", "secure password", "strong password generator"],
    icon: "Lock",
    category: "generators",
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description:
      "Generate random UUID v4 identifiers instantly. Create single or bulk UUIDs with one click and copy to clipboard.",
    shortDescription: "Generate random UUIDs",
    keywords: ["uuid generator", "guid generator", "random uuid", "uuid v4"],
    icon: "Fingerprint",
    category: "generators",
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter & Validator",
    description:
      "Format, minify, and validate JSON data online. Paste your JSON to beautify it with proper indentation or compress it.",
    shortDescription: "Format, minify & validate JSON",
    keywords: ["json formatter", "json validator", "json beautifier", "json minifier"],
    icon: "Braces",
    category: "formatters",
  },
  {
    slug: "base64-codec",
    name: "Base64 Encode / Decode",
    description:
      "Encode text to Base64 or decode Base64 strings back to plain text. Supports UTF-8 encoding.",
    shortDescription: "Encode & decode Base64 strings",
    keywords: ["base64 encode", "base64 decode", "base64 converter", "base64 online"],
    icon: "Binary",
    category: "converters",
  },
  {
    slug: "word-counter",
    name: "Word & Character Counter",
    description:
      "Count words, characters, sentences, and paragraphs in your text. Includes reading time estimate.",
    shortDescription: "Count words, characters & more",
    keywords: ["word counter", "character counter", "letter counter", "word count online"],
    icon: "Type",
    category: "text",
  },
  {
    slug: "color-converter",
    name: "Color Picker & Converter",
    description:
      "Pick colors and convert between HEX, RGB, and HSL formats. Preview colors in real time.",
    shortDescription: "Convert HEX, RGB & HSL colors",
    keywords: ["color picker", "hex to rgb", "rgb to hex", "color converter", "hsl converter"],
    icon: "Palette",
    category: "converters",
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    description:
      "Generate placeholder lorem ipsum text by paragraphs, sentences, or words. Perfect for design mockups.",
    shortDescription: "Generate placeholder text",
    keywords: ["lorem ipsum generator", "placeholder text", "dummy text generator", "lipsum"],
    icon: "FileText",
    category: "generators",
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description:
      "Generate QR codes from any text or URL. Download as PNG image for free.",
    shortDescription: "Create QR codes from text or URLs",
    keywords: ["qr code generator", "qr code maker", "create qr code", "qr code online"],
    icon: "QrCode",
    category: "generators",
  },
  {
    slug: "url-codec",
    name: "URL Encode / Decode",
    description:
      "Encode or decode URLs and query strings online. Handles special characters and Unicode.",
    shortDescription: "Encode & decode URLs",
    keywords: ["url encode", "url decode", "url encoder", "percent encoding"],
    icon: "Link",
    category: "converters",
  },
  {
    slug: "markdown-preview",
    name: "Markdown Preview",
    description:
      "Write Markdown and see it rendered in real time. Features a formatting toolbar, table support, copy HTML output, download as .md, fullscreen mode, and word count. No signup required.",
    shortDescription: "Live Markdown editor & preview",
    keywords: ["markdown editor", "markdown preview", "markdown online", "markdown viewer", "markdown to html", "online markdown editor", "markdown renderer"],
    icon: "BookOpen",
    category: "text",
  },
  {
    slug: "text-case-converter",
    name: "Text Case Converter",
    description: "Convert text between camelCase, PascalCase, snake_case, kebab-case, UPPER_SNAKE_CASE, Title Case, UPPERCASE, and lowercase instantly.",
    shortDescription: "Convert between text case styles",
    keywords: ["text case converter", "camelcase converter", "snake case", "kebab case", "uppercase converter"],
    icon: "ALargeSmall",
    category: "text",
  },
  {
    slug: "unix-timestamp",
    name: "Unix Timestamp Converter",
    description: "Convert Unix timestamps to human-readable dates and times, or convert any date and time back to a Unix timestamp. Supports both seconds and milliseconds.",
    shortDescription: "Convert Unix timestamps to dates",
    keywords: ["unix timestamp converter", "epoch converter", "timestamp to date", "unix time"],
    icon: "Clock",
    category: "converters",
  },
  {
    slug: "number-base-converter",
    name: "Number Base Converter",
    description: "Convert numbers between decimal, binary, octal, and hexadecimal. Enter a value in any base and see the equivalent in all others instantly.",
    shortDescription: "Convert between decimal, binary, octal & hex",
    keywords: ["number base converter", "binary converter", "hex converter", "decimal to binary", "binary to decimal"],
    icon: "Hash",
    category: "converters",
  },
  {
    slug: "html-entity-codec",
    name: "HTML Entity Encoder / Decoder",
    description: "Encode special characters to HTML entities (&amp;, &lt;, &gt;) or decode HTML entities back to plain text. Safe for use in HTML attributes and content.",
    shortDescription: "Encode & decode HTML entities",
    keywords: ["html entity encoder", "html entity decoder", "html escape", "html unescape", "html entities"],
    icon: "Code",
    category: "converters",
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    description: "Generate SHA-256, SHA-1, and SHA-512 cryptographic hashes from any text input. Uses the browser's built-in Web Crypto API — nothing leaves your device.",
    shortDescription: "Generate SHA-256, SHA-1 & SHA-512 hashes",
    keywords: ["hash generator", "sha256 generator", "sha1 hash", "sha512 hash", "cryptographic hash"],
    icon: "Shield",
    category: "generators",
  },
  {
    slug: "diff-checker",
    name: "Diff Checker",
    description: "Compare two blocks of text and highlight the differences line by line. Instantly see which lines were added, removed, or unchanged between two versions.",
    shortDescription: "Compare two texts & highlight differences",
    keywords: ["diff checker", "text comparison", "compare text online", "find differences", "diff tool"],
    icon: "GitCompare",
    category: "text",
  },
  {
    slug: "csv-to-json",
    name: "CSV to JSON Converter",
    description: "Convert CSV data to JSON instantly. Paste your CSV with headers and get a JSON array of objects. Handles quoted fields and commas inside values.",
    shortDescription: "Convert CSV data to JSON",
    keywords: ["csv to json", "csv to json converter", "convert csv", "csv parser online"],
    icon: "Table",
    category: "converters",
  },
  {
    slug: "json-to-csv",
    name: "JSON to CSV Converter",
    description: "Convert a JSON array of objects to CSV format. Extracts all keys as headers and outputs clean, comma-separated values ready for Excel or Google Sheets.",
    shortDescription: "Convert JSON arrays to CSV",
    keywords: ["json to csv", "json to csv converter", "export json to csv", "json csv"],
    icon: "Table2",
    category: "converters",
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode JSON Web Tokens (JWT) to inspect the header and payload. Instantly see the claims inside any JWT without needing the secret key.",
    shortDescription: "Decode & inspect JWT tokens",
    keywords: ["jwt decoder", "jwt parser", "decode jwt", "json web token decoder", "jwt inspector"],
    icon: "Key",
    category: "formatters",
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    description: "Test regular expressions against sample text and see matches highlighted in real time. Supports JavaScript regex syntax with global, case-insensitive, multiline, and dotAll flags.",
    shortDescription: "Test & debug regular expressions",
    keywords: ["regex tester", "regex checker", "regular expression tester", "regex online", "javascript regex"],
    icon: "Search",
    category: "text",
  },
  {
    slug: "slug-generator",
    name: "Slug Generator",
    description: "Convert any title or phrase into a URL-friendly slug. Removes special characters, replaces spaces with hyphens, and lowercases everything for clean, SEO-friendly URLs.",
    shortDescription: "Generate URL-friendly slugs",
    keywords: ["slug generator", "url slug", "slugify", "url friendly text", "seo slug"],
    icon: "Link2",
    category: "generators",
  },
  {
    slug: "line-tools",
    name: "Line Tools",
    description: "Sort, deduplicate, reverse, and clean lines of text. Paste a list and sort it alphabetically, remove duplicate lines, reverse the order, or remove blank lines in one click.",
    shortDescription: "Sort, deduplicate & clean text lines",
    keywords: ["sort lines online", "remove duplicate lines", "line sorter", "text line tools", "deduplicate lines"],
    icon: "List",
    category: "text",
  },
  {
    slug: "binary-converter",
    name: "Binary / Hex Converter",
    description: "Convert text to binary or hexadecimal and back. See the binary representation of any character, or decode a binary or hex string back to readable text.",
    shortDescription: "Convert text to binary & hex",
    keywords: ["text to binary", "binary to text", "text to hex", "hex to text", "binary converter"],
    icon: "Cpu",
    category: "converters",
  },
  {
    slug: "html-minifier",
    name: "HTML Minifier",
    description: "Minify HTML by removing comments, collapsing whitespace, and stripping unnecessary characters. Reduce page size for faster load times.",
    shortDescription: "Minify HTML to reduce file size",
    keywords: ["html minifier", "minify html", "html compressor", "html optimizer", "compress html"],
    icon: "FileCode",
    category: "formatters",
  },
  {
    slug: "roman-numeral-converter",
    name: "Roman Numeral Converter",
    description: "Convert integers to Roman numerals and Roman numerals back to integers. Supports values from 1 to 3999 (I to MMMCMXCIX).",
    shortDescription: "Convert integers to & from Roman numerals",
    keywords: ["roman numeral converter", "roman numerals", "convert to roman numerals", "arabic to roman", "roman to arabic"],
    icon: "BookMarked",
    category: "converters",
  },
];

export const tools: ToolMeta[] = baseTools.map((t) => ({
  ...t,
  ...(toolsContent[t.slug] ?? {}),
}));
