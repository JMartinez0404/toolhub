export interface ToolMeta {
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  keywords: string[];
  icon: string;
  category: "generators" | "converters" | "formatters" | "text";
}

export const tools: ToolMeta[] = [
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
      "Write Markdown and see it rendered in real time. Supports headings, lists, code blocks, links, and more.",
    shortDescription: "Live Markdown editor & preview",
    keywords: ["markdown editor", "markdown preview", "markdown online", "markdown viewer"],
    icon: "BookOpen",
    category: "text",
  },
];
