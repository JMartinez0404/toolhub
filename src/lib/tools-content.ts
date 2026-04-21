export interface ToolFaq {
  q: string;
  a: string;
}

export interface ToolContent {
  longDescription?: string;
  howTo?: string[];
  useCases?: string[];
  faqs?: ToolFaq[];
}

export const toolsContent: Record<string, ToolContent> = {
  "password-generator": {
    longDescription:
      "A password generator creates a random string of characters you can use as a secure password. Strong passwords are long, unpredictable, and mix uppercase letters, lowercase letters, numbers, and symbols, which makes them resistant to brute-force and dictionary attacks. This tool generates passwords entirely in your browser using the Web Crypto API, so the password is never sent over the network and never touches our servers. Pick a length, choose which character classes to include, click generate, and copy the result. Because the randomness happens on your device, the output is safe to use as a master password for a password manager, a new account password, or a one-off credential for an API key or database user.",
    howTo: [
      "Pick a length with the slider. 12 to 16 characters is a sensible minimum for everyday accounts; 20 or more for critical accounts like banking, email, and your password manager.",
      "Enable the character classes you want: uppercase, lowercase, numbers, and symbols. Turning on all four produces the strongest password for a given length.",
      "Click Generate to produce a random password.",
      "Click Copy to place it on your clipboard.",
      "Paste it into your password manager or the signup form you are filling out. Do not try to memorize it — let the manager remember it for you.",
    ],
    useCases: [
      "Creating a new account and needing a secure password immediately",
      "Rotating a password after a data breach notification",
      "Generating an API key, database user password, or service account credential",
      "Setting up a master password for a password manager such as Bitwarden or 1Password",
      "Creating a disposable password for a one-time signup you do not plan to return to",
    ],
    faqs: [
      {
        q: "How long should my password be?",
        a: "For routine accounts, at least 12 characters. For critical accounts such as email, banking, and your password manager, aim for 20 or more. Length matters more than complexity — a 20-character password of only lowercase letters is harder to brute-force than a 10-character password that uses every symbol class.",
      },
      {
        q: "Is this password generator safe to use?",
        a: "Yes. It uses your browser's built-in crypto.getRandomValues() API, which is a cryptographically secure source of randomness. Passwords are generated locally on your device and never leave the browser. You can verify this yourself by opening your browser's network tab — no network request is made when you click Generate.",
      },
      {
        q: "Should I include symbols?",
        a: "If the site accepts them, yes. Symbols increase the search space an attacker has to cover, which strengthens the password per character. Some older systems block certain symbols; if that happens, generate a longer password with only letters and numbers instead. Extra length compensates for reduced character variety.",
      },
      {
        q: "Can I reuse the same password on multiple sites?",
        a: "No. If one site is breached, every account sharing that password becomes reachable. Use a password manager (Bitwarden, 1Password, KeePass, or your browser's built-in manager) to store a unique password per site.",
      },
      {
        q: "What makes a password weak?",
        a: "Predictability. Dictionary words, birthdays, pet names, keyboard patterns like qwerty or 123456, and obvious leet-speak substitutions like P@ssw0rd all appear early in attacker wordlists. Anything a person would pick by hand tends to be weak — let a generator do it instead.",
      },
    ],
  },

  "uuid-generator": {
    longDescription:
      "A UUID (Universally Unique Identifier), sometimes called a GUID, is a 128-bit value designed to be unique across time and space without a central authority issuing it. This tool generates random UUID v4 values, which are produced from your browser's cryptographically secure random number generator and have a roughly 1-in-2^122 chance of colliding — in practice, unique forever. Use the output as a database primary key, a correlation ID in logs, a filename that will not collide, or anywhere you need a unique identifier that does not reveal creation time or ordering. UUIDs are generated locally in your browser; nothing is sent over the network.",
    howTo: [
      "Click Generate to produce a single UUID v4.",
      "To generate multiple at once, set the count and click Generate — each result appears on its own line for easy copy-paste.",
      "Click Copy to put the UUID (or the whole batch) on your clipboard.",
      "Paste it into your database seed, configuration file, URL, or wherever you need an identifier.",
    ],
    useCases: [
      "Seeding a database with unique primary keys before inserts",
      "Assigning a correlation or request ID to trace a call through logs and services",
      "Generating a filename that will not collide with existing files",
      "Creating an idempotency key for a payment or API request",
      "Producing short-lived session identifiers or invite tokens",
    ],
    faqs: [
      {
        q: "What is UUID v4?",
        a: "UUID version 4 is a variant generated almost entirely from random bits (six bits are reserved to mark it as v4). It carries no information about the machine, user, or time that produced it, unlike v1. Because it has 122 bits of entropy, two independently generated v4 UUIDs are practically guaranteed not to collide.",
      },
      {
        q: "Can two UUIDs ever be the same?",
        a: "In theory yes, in practice no. The probability of a collision among a billion UUIDs is lower than the probability of a hardware memory error corrupting the comparison. You do not need to check for uniqueness before inserting a random UUID into a database.",
      },
      {
        q: "Should I use a UUID as a database primary key?",
        a: "You can, and it has trade-offs. UUIDs let multiple services generate keys without coordination, which is useful for distributed systems. However, random UUIDs hurt B-tree index locality (inserts scatter across the index), so heavy-write tables sometimes prefer auto-increment integers or time-ordered alternatives like UUIDv7 or ULID.",
      },
      {
        q: "Are UUIDs safe to expose in URLs?",
        a: "v4 UUIDs are safe to expose — they leak no information about when or how they were created, and they cannot be guessed in any reasonable time. Do not use them as secrets, though: anyone who sees the URL can share it. For secret tokens, use a dedicated random token, not a UUID.",
      },
      {
        q: "What is the difference between UUID and GUID?",
        a: "They are the same thing. GUID (globally unique identifier) is Microsoft's term; UUID is the RFC 4122 term used elsewhere. The format and bit layout are identical — you can paste a GUID into any UUID parser and vice versa.",
      },
    ],
  },

  "json-formatter": {
    longDescription:
      "JSON (JavaScript Object Notation) is the dominant data format for APIs and configuration files, but minified JSON — one long line with no whitespace — is nearly impossible to read by eye. This formatter takes any valid JSON and rewrites it with consistent indentation so you can see the structure, spot missing commas, and diff it meaningfully. It can also do the opposite: strip every unnecessary byte to produce compact JSON for transport. The validator runs in parallel — if your input is malformed, you will see the line and column where the parser rejected it. Everything happens in your browser, so sensitive API responses and tokens never leave your device.",
    howTo: [
      "Paste your JSON into the input box. It can be a single object, an array, or a deeply nested structure.",
      "Click Format to pretty-print the JSON with 2-space indentation.",
      "Click Minify to strip non-essential whitespace — useful before pasting into a URL parameter or environment variable.",
      "If the JSON is invalid, the error message points at the line and column where parsing failed. Fix that character and try again.",
      "Click Copy to put the result on your clipboard.",
    ],
    useCases: [
      "Reading an API response that came back on a single line",
      "Debugging a webhook payload or a log line that contains embedded JSON",
      "Preparing JSON for inclusion in a config file where indentation matters",
      "Compressing a JSON blob before pasting it into an environment variable or URL",
      "Checking whether a string is valid JSON before embedding it in code",
    ],
    faqs: [
      {
        q: "Is my JSON data private?",
        a: "Yes. Parsing, formatting, and validation all happen in your browser using the native JSON parser. Nothing you paste is sent over the network or logged. You can safely paste JSON that contains API keys, production tokens, or personal data — it never leaves your device.",
      },
      {
        q: "Why is my JSON invalid?",
        a: "The most common mistakes are trailing commas (valid in JavaScript, invalid in JSON), single quotes instead of double quotes around keys and strings, unquoted keys, and unescaped backslashes or newlines inside strings. The error message will point at the offending character.",
      },
      {
        q: "Can this handle large JSON files?",
        a: "The formatter works on strings of several megabytes without trouble. For JSON measured in hundreds of megabytes the browser may slow down or run out of memory — at that size you'd typically stream the file with a command-line tool like jq instead.",
      },
      {
        q: "What is the difference between JSON and JSON5?",
        a: "JSON5 is a superset of JSON that allows trailing commas, comments, unquoted keys, and a few other niceties. This tool validates against strict JSON (RFC 8259), so if you paste JSON5 the extras will be flagged as errors.",
      },
      {
        q: "Does this tool sort keys?",
        a: "No — the default preserves the original key order, since key order is often meaningful to humans reading the output. Most JSON consumers treat key order as insignificant, so the pretty-printed result is semantically equivalent regardless.",
      },
    ],
  },

  "base64-codec": {
    longDescription:
      "Base64 is an encoding that represents binary data as ASCII text using 64 printable characters. It is used any time you need to embed bytes inside a context that expects text — email attachments, data URLs in HTML and CSS, tokens in URLs, and JSON fields that carry binary payloads. This tool encodes a plain string to Base64, or decodes Base64 back to the original text, using the browser's built-in TextEncoder so Unicode characters are handled correctly. Processing is entirely client-side; nothing you paste is transmitted anywhere.",
    howTo: [
      "Paste the text you want to encode into the Encode box — it accepts any UTF-8 string, including emoji and non-Latin scripts.",
      "Click Encode to see the Base64 representation.",
      "To decode, paste a Base64 string into the Decode box and click Decode. Invalid input is flagged with an error.",
      "Click Copy to put the result on your clipboard.",
      "Use the output anywhere a text-only context requires binary data (data URLs, JWT inspection, config files).",
    ],
    useCases: [
      "Embedding an image directly in an HTML or CSS file via a data URL",
      "Decoding the payload of a JWT or other opaque token to inspect its contents",
      "Preparing a binary value (certificate, key, small image) for inclusion in a JSON field",
      "Sending non-ASCII text through a transport that is not 8-bit clean, such as some email headers",
      "Quickly checking what a Base64 string you found in a log or config actually contains",
    ],
    faqs: [
      {
        q: "Is Base64 encryption?",
        a: "No. Base64 is an encoding, not encryption. Anyone who sees the output can decode it back to the original in one step. Never use Base64 to hide secrets — use a real encryption algorithm and a proper key if you need confidentiality.",
      },
      {
        q: "Why is Base64 output roughly 33% larger than the input?",
        a: "Base64 represents every three input bytes as four output characters (plus padding), a ratio of 4/3 or about 33% more size. That overhead is the cost of keeping the data text-safe.",
      },
      {
        q: "Does this handle Unicode correctly?",
        a: "Yes. The tool uses TextEncoder to convert your input to UTF-8 bytes before encoding, so emoji, accented characters, and non-Latin scripts round-trip faithfully. The older JavaScript btoa() function does not handle Unicode directly, which is why it often fails on characters outside Latin-1.",
      },
      {
        q: "What is the difference between Base64 and Base64url?",
        a: "Base64url replaces + and / with - and _ so the output is safe inside URL paths and query parameters without further escaping, and it often omits the = padding. This tool produces standard Base64; convert + to -, / to _, and strip = if you need the url-safe variant.",
      },
      {
        q: "Can this decode an image?",
        a: "It can decode the Base64 string back to raw bytes, but the output is displayed as text, so a binary image will look like garbage. To view an image from a Base64 data URL, paste the full data:image/...;base64,... string directly into a browser's address bar.",
      },
    ],
  },

  "word-counter": {
    longDescription:
      "A word counter does more than count words. It gives you a quick read on the shape of a piece of writing: length in characters with and without spaces, sentence count, paragraph count, and an estimated reading time based on an average adult reading speed of 200 to 250 words per minute. Use it to hit a word target for an essay or application, to size a blog post or email, or to check whether a tweet, meta description, or subject line fits a platform's limit. The text you paste stays in your browser — nothing is sent over the network — so you can count words in private notes, drafts, or confidential documents.",
    howTo: [
      "Paste or type your text into the input area.",
      "Counts update live as you type or edit.",
      "Use the result that matches your target: character count for text-length limits, word count for essays and posts, reading time for content planning.",
      "Select a portion of the text to get counts for just that section (where supported).",
      "Clear the box to start fresh.",
    ],
    useCases: [
      "Hitting a strict word count on an essay, grant application, or cover letter",
      "Trimming a social post to fit Twitter/X (280), SMS (160), or Facebook character limits",
      "Estimating reading time for a blog post before publishing",
      "Checking whether a meta description fits SEO best practice (150-160 characters)",
      "Measuring progress on a long piece of writing such as a book chapter or report",
    ],
    faqs: [
      {
        q: "How is a word counted?",
        a: "The counter splits your text on whitespace (spaces, tabs, newlines) and counts each non-empty run of characters as a word. Hyphenated terms like word-counter count as one word. Numbers count as words. Punctuation attached to a word is counted with the word, not separately.",
      },
      {
        q: "Are spaces counted as characters?",
        a: "Both numbers are shown — total characters including spaces, and characters excluding spaces. Word-limit forms almost always mean characters including spaces; text-message and tweet limits usually count every character the same.",
      },
      {
        q: "How accurate is the reading time estimate?",
        a: "It is a rough guide. The estimate assumes about 225 words per minute, which is typical for an adult reading English for leisure. Technical or academic text reads slower; skimming is faster. Expect the estimate to be within 20 to 30 percent of your actual pace.",
      },
      {
        q: "Can I count a specific section of my text?",
        a: "Yes — select the text you want to measure and the counts update to reflect only the selection. Deselect to go back to counting everything.",
      },
      {
        q: "Does this work with non-English languages?",
        a: "Whitespace-based word counting works well for English and most European languages. For Chinese, Japanese, and Korean, which typically do not separate words with spaces, the character count is more meaningful than the word count.",
      },
    ],
  },

  "color-converter": {
    longDescription:
      "Color formats are an everyday source of friction in design work: your design tool shows HEX, your CSS framework wants HSL, your designer sent an RGB value over Slack, and your accessibility checker reports contrast in a fourth format. This tool takes a color in any common format — HEX, RGB, or HSL — and shows it in all three at once with a live preview swatch. You can nudge lightness, saturation, or hue and see the other values update instantly, which makes it easy to generate a palette from a single brand color or hand-tune a shade to hit a contrast target.",
    howTo: [
      "Enter a color in any format: a hex code like #3B82F6, an RGB triple like rgb(59, 130, 246), or an HSL value like hsl(217, 91%, 60%).",
      "The other formats and a live swatch update as soon as the value parses.",
      "Use the picker to drag through the color space visually rather than typing.",
      "Adjust individual HSL channels to lighten, darken, or shift the hue of a base color.",
      "Click Copy next to the format you want for your code.",
    ],
    useCases: [
      "Converting a brand HEX color into HSL so you can tweak lightness in CSS",
      "Matching a color from a screenshot to its nearest standard code",
      "Generating a lighter or darker shade of a base color by adjusting HSL lightness",
      "Producing an RGB value for a library that does not accept HEX",
      "Checking that two colors are actually the same when one is written in HEX and the other in RGB",
    ],
    faqs: [
      {
        q: "What format should I use in CSS?",
        a: "All three are valid everywhere modern CSS runs. HEX is the most compact (#3B82F6) and is common in design tools. RGB is easiest to compute with (integers 0-255). HSL is easiest to reason about, since you can tweak hue, saturation, and lightness independently. Pick the one whose axes match the change you want to make.",
      },
      {
        q: "Why do HEX and RGB look identical but HSL looks different?",
        a: "HEX is just RGB written in hexadecimal — they encode exactly the same values. HSL reshapes the same color space around hue, saturation, and lightness, which are more perceptually intuitive but describe the same final pixel.",
      },
      {
        q: "What about alpha (transparency)?",
        a: "Alpha uses rgba() or hsla() in CSS, or an 8-digit HEX like #3B82F680 (the last two hex digits are the alpha channel). If the tool shows alpha controls, the output will include them; otherwise the values represent fully opaque colors.",
      },
      {
        q: "Are these values the same as what Photoshop or Figma shows?",
        a: "Yes, for sRGB colors — the default color space of the web and most design tools. If your design tool is configured for a wide-gamut space like Display P3, the numeric values may differ slightly when the color is converted to sRGB for the browser.",
      },
      {
        q: "Can I get a color from an image?",
        a: "This tool converts between formats; it does not sample colors from images. Use your operating system's screen color picker (Digital Color Meter on macOS, or PowerToys Color Picker on Windows) to grab a color off any pixel, then paste the HEX value here.",
      },
    ],
  },

  "lorem-ipsum-generator": {
    longDescription:
      "Lorem ipsum is filler text derived from a passage of Cicero's De finibus bonorum et malorum. Designers and developers use it to fill layouts with realistic-looking prose before the real content is written, because using real content too early leads to discussions about copy when you're trying to discuss design. This generator produces lorem ipsum by the word, sentence, or paragraph, with the classic 'Lorem ipsum dolor sit amet' opening or a fresh random arrangement of the same Latin word pool. Output is generated locally and has no usage limits — copy as much as you need.",
    howTo: [
      "Choose how much text you want: a number of words, sentences, or paragraphs.",
      "Decide whether the output should begin with the classic 'Lorem ipsum dolor sit amet' opening. For most mockups, yes — it is the universally recognized shorthand for filler text.",
      "Click Generate to produce the text.",
      "Click Copy to put the result on your clipboard.",
      "Paste it into your design tool, prototype, or HTML template and replace it with real content before you ship.",
    ],
    useCases: [
      "Filling a design mockup with realistic paragraphs before copy is delivered",
      "Seeding a CMS with placeholder posts for testing",
      "Demonstrating line-length, leading, and type-scale choices without the distraction of meaningful words",
      "Generating a fixed amount of text to measure layout behavior at an exact size",
      "Filling a form field with enough characters to test overflow and truncation",
    ],
    faqs: [
      {
        q: "Why use Latin gibberish instead of real text?",
        a: "Real text creates two problems during design review. Recognizable words draw the reader's eye to content and away from layout. And if the real content is used too early, stakeholders start debating the words instead of the design. Lorem ipsum has the letter frequency and word-length distribution of Latin, which looks enough like English to feel like prose but not enough to be readable.",
      },
      {
        q: "Does lorem ipsum actually mean something?",
        a: "The original passage does — it is from Cicero. The version used for typesetting has been corrupted over centuries of reprinting, so most of it is not grammatical Latin. It is now a conventional filler, not a meaningful text.",
      },
      {
        q: "Can I use lorem ipsum in production?",
        a: "No. Every designer and developer has a story about lorem ipsum accidentally shipping because someone forgot to replace a placeholder. Treat it as strictly pre-launch filler, and search for 'lorem' across your codebase before every deployment.",
      },
      {
        q: "Is there a variant that looks like English?",
        a: "Yes — 'bacon ipsum', 'hipster ipsum', and similar joke generators produce filler text that is English but still clearly placeholder. They are useful when you want the content to be readable during design review without using real copy.",
      },
      {
        q: "How much lorem ipsum do I need?",
        a: "Match the realistic length of the final content. If a card will display about two sentences of a blog post's opening, generate two sentences — not three paragraphs. Over-long placeholder text lets layout problems hide until you substitute real content.",
      },
    ],
  },

  "qr-code-generator": {
    longDescription:
      "A QR code is a two-dimensional barcode that encodes text — usually a URL — in a pattern a camera can read in under a second. QR codes work offline, survive being printed at small sizes, and don't require the user to type anything, which makes them ideal for menus, event tickets, Wi-Fi credentials, product packaging, and anywhere a screen meets a phone. This tool turns any text you paste into a QR code, renders it as an image in your browser, and lets you download it as a PNG. The text is encoded locally — nothing is sent over the network — so it's safe to generate codes that contain private links or credentials.",
    howTo: [
      "Paste the text or URL you want to encode. For URLs, include the https:// prefix so scanning apps open them correctly.",
      "The QR code renders below the input as you type.",
      "Adjust the size if you plan to print the code — larger codes scan more reliably at a distance or on uneven paper.",
      "Click Download to save the QR code as a PNG image.",
      "Test the code before you print or send it: open your phone's camera, point it at the screen, and make sure the captured text matches what you entered.",
    ],
    useCases: [
      "Putting a menu, feedback form, or Wi-Fi login on a physical sign",
      "Sharing a long URL on a business card, poster, or slide deck where scanning beats typing",
      "Generating event tickets or boarding passes that a scanner can read",
      "Adding a QR code to product packaging that links to setup instructions or warranty registration",
      "Sending a Wi-Fi password to guests by printing a single scannable code on a fridge magnet",
    ],
    faqs: [
      {
        q: "How much text can a QR code hold?",
        a: "A single QR code can hold up to around 4,000 characters, but the code becomes visually dense and harder to scan as the content grows. For URLs, aim to keep the encoded string short — use a URL shortener if you're encoding a long query string, so the code stays simple and robust.",
      },
      {
        q: "Do QR codes expire?",
        a: "The code itself does not expire — it is a static image. What can expire is the thing the code points at. If the code encodes a URL, the URL has to stay alive for the code to keep working. If you need to change the destination after printing, encode a URL you control (not the final target) and redirect it server-side.",
      },
      {
        q: "Can QR codes contain tracking?",
        a: "Only if the URL inside the code points at a tracking redirect. The code itself has no tracking — it is just an image. If you care about visitor privacy, encode a direct URL with no redirect, and the link will be as private as any other link on the web.",
      },
      {
        q: "Why does my QR code not scan?",
        a: "Common causes: low contrast between the code and its background (stick to dark on white), glare on a screen or glossy paper, a scanner that does not support the QR version used, or the code being printed too small for the amount of data encoded. Raising the size and the error-correction level usually fixes it.",
      },
      {
        q: "Are the downloaded PNG files safe to share?",
        a: "Yes — a PNG of a QR code is just an image. The only information it carries is whatever text you encoded into it. Scan it yourself first to confirm the encoded content is what you intended before distributing.",
      },
    ],
  },

  "url-codec": {
    longDescription:
      "URL encoding (also called percent-encoding) replaces characters that have a special meaning in a URL — spaces, slashes, question marks, ampersands, and non-ASCII characters — with a percent sign followed by two hex digits. Without it, a space in a search query or a plus sign in an email address would be misread by the server, turning one parameter into several or losing characters entirely. This tool encodes any string to its URL-safe form or decodes a percent-encoded string back to human-readable text. It correctly handles UTF-8, so non-Latin scripts and emoji round-trip faithfully. Everything happens locally in your browser.",
    howTo: [
      "Paste your string into the Encode box to convert special characters into percent-encoded form.",
      "Paste a percent-encoded string into the Decode box to see the original text.",
      "Choose between encoding for a URL component (escapes more characters) and encoding for a full URI (leaves :// , ?, and & alone). The component variant is the right choice for a value going inside a query parameter.",
      "Click Copy to put the result on your clipboard.",
      "Paste the output into your URL, config, or API request.",
    ],
    useCases: [
      "Building a URL with a query string that contains spaces, ampersands, or user input",
      "Debugging a webhook that is receiving oddly encoded characters in its payload",
      "Decoding a redirect URL embedded as a query parameter in a tracking link",
      "Safely including a file path or email address in a URL",
      "Round-tripping user input through a URL without losing non-ASCII characters",
    ],
    faqs: [
      {
        q: "What is the difference between encodeURI and encodeURIComponent?",
        a: "encodeURI assumes the string is a complete URI and leaves reserved characters (:, /, ?, #, &, =, +) alone so the URL structure is preserved. encodeURIComponent assumes the string is a single value going inside a URL and escapes every reserved character, so it is safe to paste into a query parameter. For user input, use the component variant unless you know better.",
      },
      {
        q: "Why are spaces sometimes encoded as %20 and sometimes as +?",
        a: "%20 is the canonical encoding for a space and works everywhere. The + form is a legacy from HTML form submissions, where query strings used application/x-www-form-urlencoded encoding. Modern code and URL libraries accept both, but %20 is safer in URL paths — only use + inside query strings, and only if you know the consumer accepts it.",
      },
      {
        q: "Does this handle Unicode?",
        a: "Yes. Non-ASCII characters are first encoded to UTF-8 bytes and then each byte is percent-encoded. Decoding reverses the process. A single emoji, which is four bytes in UTF-8, encodes to 12 percent-escaped characters and decodes back cleanly.",
      },
      {
        q: "Why do I see double-encoded text like %2520 in a URL?",
        a: "That is a value that got encoded twice — once by the original producer and again by something in the middle. Decoding %2520 once gives %20, which is the encoded form of a space. Decode twice to recover the literal space. Double encoding is almost always a bug somewhere in the pipeline.",
      },
      {
        q: "Is there a limit on URL length?",
        a: "The HTTP spec does not set one, but most browsers and web servers reject URLs longer than about 2,000 to 8,000 characters. If your encoded URL is approaching that range, move the data into a POST body instead of a query string.",
      },
    ],
  },

  "markdown-preview": {
    longDescription:
      "Markdown is a lightweight syntax for formatting text using plain-ASCII symbols: asterisks for emphasis, hash marks for headings, dashes for lists, backticks for code. It is the default format for README files, GitHub issues, chat messages on Slack and Discord, static site generators, and documentation sites. This editor renders your Markdown live in a side-by-side preview, so you can see exactly how the output will look before you commit it. The preview supports tables, code blocks with syntax highlighting, blockquotes, task lists, and links. Everything runs in your browser — your draft never touches a server — and you can copy the rendered HTML, download the Markdown as a .md file, or switch to fullscreen to focus on writing.",
    howTo: [
      "Start typing Markdown on the left. The preview on the right updates as you type.",
      "Use the toolbar at the top to insert common elements — headings, bold, italic, links, images, code blocks, tables — without having to remember the exact syntax.",
      "Click Copy HTML to grab the rendered output if you need to paste it into a CMS or email.",
      "Click Download to save your Markdown as a .md file.",
      "Toggle fullscreen to hide navigation when you want a distraction-free writing view.",
    ],
    useCases: [
      "Drafting a README before committing it, so you can see how the rendered page will look on GitHub",
      "Writing a blog post or documentation page for a static site generator (Next.js, Astro, Jekyll, Hugo)",
      "Composing a long GitHub issue, pull request description, or commit message body",
      "Checking that a Markdown-formatted Slack or Discord message will render the way you expect",
      "Converting a plain-Markdown document into rich HTML to paste into a WYSIWYG editor",
    ],
    faqs: [
      {
        q: "Which Markdown flavor does this support?",
        a: "It supports CommonMark plus the most common GitHub-Flavored Markdown extensions: tables, task lists, strikethrough, and fenced code blocks with language hints. Markdown written for GitHub, Slack, or Discord generally renders faithfully.",
      },
      {
        q: "Is my draft saved if I close the tab?",
        a: "The editor runs entirely in your browser and does not send anything to a server. Whether your draft survives a tab close depends on whether the tool saves to local storage — if the value reappears after a refresh, it does; if not, use Download to save a .md file before closing.",
      },
      {
        q: "Can I embed images?",
        a: "You can reference images by URL using the ![alt](url) syntax, and the preview will load them like any browser would. The tool does not host images, so upload them elsewhere (GitHub, an S3 bucket, Imgur) and paste the URL.",
      },
      {
        q: "How do I write a code block with syntax highlighting?",
        a: "Wrap the code in triple backticks and put the language name after the opening fence — for example, three backticks followed by 'js', your JavaScript, then three backticks to close. Recognised languages are highlighted automatically in the preview.",
      },
      {
        q: "Does this render HTML embedded inside the Markdown?",
        a: "Most HTML tags are passed through to the preview, since CommonMark allows inline HTML. For safety, script tags and on-* event attributes are stripped so pasted Markdown can't execute arbitrary code in your browser.",
      },
    ],
  },
};
