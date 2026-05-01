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

  "text-case-converter": {
    longDescription:
      "Programming, writing, and API design all use different text case conventions. A variable might be camelCase in JavaScript, snake_case in Python, kebab-case in CSS, and PascalCase in C#. Switching between them by hand is tedious and error-prone — this tool does it in one click. Paste any text and convert it to any of nine common formats: camelCase, PascalCase, snake_case, kebab-case, UPPER_SNAKE_CASE, Title Case, Sentence case, UPPERCASE, and lowercase. The conversion handles spaces, punctuation, and existing case patterns, so you can paste a sentence, a heading, or a mixed-case identifier and get clean output.",
    howTo: [
      "Paste or type your text into the input box.",
      "Click the button for the case style you want: camelCase, snake_case, kebab-case, PascalCase, UPPER_SNAKE, Title Case, Sentence case, UPPERCASE, or lowercase.",
      "The converted text appears in the output box.",
      "Click Copy to put the result on your clipboard.",
    ],
    useCases: [
      "Renaming a JSON field or database column to match a different language's naming convention",
      "Converting a blog post title to a kebab-case URL slug",
      "Transforming a list of human-readable labels into camelCase JavaScript variable names",
      "Converting SCREAMING_SNAKE_CASE constants back to sentence-readable text",
      "Preparing enum values in PascalCase from a plain English list",
    ],
    faqs: [
      {
        q: "What is camelCase?",
        a: "camelCase is a naming convention where the first word is lowercase and every subsequent word starts with an uppercase letter, with no spaces or separators. It is the default for variables and functions in JavaScript, Java, and many other languages. 'myVariableName' and 'getUserById' are camelCase.",
      },
      {
        q: "What is the difference between snake_case and kebab-case?",
        a: "Both separate words with a single character. snake_case uses an underscore and is common in Python, Ruby, and database column names. kebab-case uses a hyphen and is common in CSS class names, HTML attributes, and URL paths.",
      },
      {
        q: "When should I use PascalCase vs camelCase?",
        a: "PascalCase (every word capitalized, no separator) is used for class names, types, React components, and constructors in most languages. camelCase is used for variables and functions. In TypeScript: 'interface UserProfile' is PascalCase, while 'const getUserProfile' is camelCase.",
      },
      {
        q: "Does this preserve acronyms?",
        a: "Acronyms like 'URL', 'API', or 'HTML' are treated as words. In camelCase, 'parseURL' might become 'parseUrl'. If strict acronym preservation is required, review the output — different codebases handle this differently.",
      },
    ],
  },

  "unix-timestamp": {
    longDescription:
      "A Unix timestamp is the number of seconds (or milliseconds) that have elapsed since January 1, 1970, at 00:00:00 UTC — the Unix epoch. Almost every programming language, database, and API uses Unix time internally because it is a single integer with no timezone ambiguity. This tool converts any Unix timestamp to a readable date and time in UTC and your local timezone, and it converts any date and time back to a Unix timestamp. It supports both second-precision (10-digit) and millisecond-precision (13-digit) timestamps, which are the two most common formats in production systems.",
    howTo: [
      "To convert a timestamp to a date: paste your Unix timestamp into the first input and click Convert. The result shows UTC, local, and ISO 8601 formats.",
      "To convert a date to a timestamp: use the date-time picker in the second section to select a date and time, then click Convert.",
      "The tool auto-detects whether your input is seconds or milliseconds based on the number of digits.",
      "Click Copy next to any result to put it on your clipboard.",
    ],
    useCases: [
      "Decoding a timestamp from an API response or database record to see when something happened",
      "Generating a future timestamp for setting a token expiration or scheduled job",
      "Debugging log files where events are recorded as Unix timestamps",
      "Converting a known date (such as a deadline or release date) into a timestamp for use in code",
      "Checking whether a timestamp is in seconds or milliseconds by seeing the result of both interpretations",
    ],
    faqs: [
      {
        q: "What is the Unix epoch?",
        a: "The Unix epoch is the point in time from which Unix timestamps are counted: midnight at the start of January 1, 1970, in UTC. It was chosen when Unix was designed as a fixed reference point. There is nothing technically special about that date — it is purely a convention.",
      },
      {
        q: "Are timestamps in seconds or milliseconds?",
        a: "Both are common. Most system calls and server logs use seconds (a 10-digit number). JavaScript's Date.now() and many web APIs return milliseconds (a 13-digit number). The converter accepts both and auto-detects based on digit count.",
      },
      {
        q: "Do Unix timestamps account for timezones?",
        a: "No — a Unix timestamp always represents an absolute moment in UTC. The timezone does not affect the number, only how you display it. Two users in different timezones who record the same event get the same timestamp.",
      },
      {
        q: "What is the Year 2038 problem?",
        a: "Old 32-bit systems stored Unix timestamps as a signed 32-bit integer, which overflows in January 2038. Modern 64-bit systems can represent timestamps billions of years into the future. Most modern software is not affected.",
      },
    ],
  },

  "number-base-converter": {
    longDescription:
      "Computers represent all data in binary (base 2), but humans typically read numbers in decimal (base 10). Programmers frequently work with hexadecimal (base 16) for memory addresses, color codes, and binary data, and sometimes octal (base 8) for Unix file permissions. Converting between these by hand requires arithmetic most people have not practiced since school. This tool converts a number entered in any base — decimal, binary, octal, or hexadecimal — into all four representations at once so you can see the relationships and copy the value you need.",
    howTo: [
      "Enter a number in the decimal, binary, octal, or hexadecimal field.",
      "The other three fields update immediately to show the equivalent value in each base.",
      "Hex input accepts both uppercase and lowercase letters (A–F or a–f).",
      "Binary input accepts only 0 and 1.",
      "Click Copy next to any field to copy that representation.",
    ],
    useCases: [
      "Looking up a memory address in a debugger and converting it from hex to decimal",
      "Setting Unix file permissions using octal values (chmod 755 means binary 111 101 101)",
      "Understanding a hex color code by seeing its decimal RGB components",
      "Confirming that a binary value matches an expected decimal or hex constant",
      "Converting a decimal number to binary for low-level bit manipulation work",
    ],
    faqs: [
      {
        q: "Why is hexadecimal so common in programming?",
        a: "One hex digit represents exactly four binary bits (a nibble), so two hex digits represent one byte. That makes hex compact and directly mappable to binary — 0xFF is 11111111 in binary, 255 in decimal. Memory addresses, byte values, color codes, and binary protocols are all easier to read in hex.",
      },
      {
        q: "What is the largest value this converter handles?",
        a: "The converter uses JavaScript's native number type, which handles integers exactly up to 2^53 - 1. Numbers above that may lose precision. For very large integers, use a dedicated big-integer library.",
      },
      {
        q: "What is octal used for?",
        a: "Octal (base 8) is mainly used for Unix and Linux file permission bits. A permission string like 0755 means the owner has read/write/execute (7 = 111 in binary), and the group and others have read/execute (5 = 101 in binary).",
      },
      {
        q: "How do I recognize which base a number is in?",
        a: "Programming languages use prefixes: 0b for binary, 0o or a leading 0 for octal, and 0x for hexadecimal. Without a prefix, a number is decimal by convention. In HTML and CSS, # introduces a hex color code.",
      },
    ],
  },

  "html-entity-codec": {
    longDescription:
      "HTML reserves certain characters for its own syntax: angle brackets for tags, the ampersand for entities, and quotes for attribute values. Including these characters literally in HTML content can cause the browser to misparse them. The solution is HTML entity encoding, which replaces each reserved character with a safe escape sequence — < becomes &lt;, > becomes &gt;, & becomes &amp;. This tool encodes any text to its HTML-safe form or decodes HTML entities back to plain text. Use it to safely display code snippets, user-generated content, or any text that may contain reserved characters inside an HTML page.",
    howTo: [
      "To encode: paste your text in the left box and click Encode. Reserved HTML characters are replaced with entity equivalents.",
      "To decode: paste HTML-encoded text in the right box and click Decode. Entities like &amp;lt; are restored to their original characters.",
      "Click Copy to put the result on your clipboard.",
      "Use the encoded output inside HTML content or attributes to prevent markup parsing issues.",
    ],
    useCases: [
      "Safely embedding user-submitted text in an HTML page to prevent XSS injection",
      "Displaying code examples in a blog post without the browser interpreting the HTML tags",
      "Decoding HTML entities from a scraped webpage or email body to read the original text",
      "Preparing content for an HTML email template where certain characters must be encoded",
      "Converting a string containing quotes and ampersands for safe use in HTML attributes",
    ],
    faqs: [
      {
        q: "What is the most important HTML entity?",
        a: "The ampersand (&) is the most critical, because it starts every other entity. Always encode & as &amp; in HTML text content and attribute values to prevent misinterpretation.",
      },
      {
        q: "Does HTML encoding prevent XSS attacks?",
        a: "HTML-encoding user input before rendering it in the page is the primary defense against reflected and stored XSS. It ensures that a user who submits <script>alert(1)</script> sees that text on the page rather than having it execute. Modern frameworks like React apply this automatically.",
      },
      {
        q: "What is the difference between HTML encoding and URL encoding?",
        a: "HTML encoding makes text safe for HTML markup. URL encoding (percent-encoding) makes text safe for URLs. The two use completely different escape sequences and are not interchangeable.",
      },
      {
        q: "Can I use numeric entities instead of named ones?",
        a: "Yes. Every character has a numeric entity using its Unicode code point: &#60; for < (decimal) or &#x3C; for < (hex). Both forms are universally supported for common characters.",
      },
    ],
  },

  "hash-generator": {
    longDescription:
      "A cryptographic hash function takes any input and produces a fixed-length output — the hash or digest — that is unique to that input. Change one character in the input and the entire hash changes. Hashes are used to verify data integrity (confirming a downloaded file has not been tampered with), to store passwords safely (by hashing before saving), and to produce fingerprints for content addressing. This tool generates SHA-256, SHA-1, and SHA-512 hashes using your browser's built-in Web Crypto API. The input never leaves your device, so you can safely hash sensitive strings to inspect what a stored hash should look like.",
    howTo: [
      "Type or paste the text you want to hash into the input area.",
      "Select the algorithm: SHA-256 for most uses, SHA-512 for higher security, SHA-1 for legacy compatibility checking.",
      "Click Generate to compute the hash. The output is a hexadecimal string.",
      "Click Copy to put the hash on your clipboard.",
    ],
    useCases: [
      "Verifying that a downloaded file has not been modified by comparing its SHA-256 hash to the official checksum",
      "Generating the expected hash of a value to compare to what is stored in a database during debugging",
      "Producing a content fingerprint for cache busting — the hash changes only when the content changes",
      "Checking that two strings are identical without directly comparing their contents",
      "Learning how small input changes produce completely different hashes (the avalanche effect)",
    ],
    faqs: [
      {
        q: "Can I reverse a hash to get the original input?",
        a: "No. Cryptographic hash functions are one-way by design. There is no mathematical operation that recovers the input from the hash. Attackers recover passwords from hashes using precomputed tables or brute force — which is why password hashes should use bcrypt, scrypt, or Argon2, not raw SHA.",
      },
      {
        q: "Which algorithm should I use?",
        a: "SHA-256 is the right choice for most uses: file integrity checking, HMAC signatures, content fingerprinting. SHA-1 is cryptographically broken for collision resistance and should only be used for legacy compatibility, not new security-sensitive work.",
      },
      {
        q: "Is this safe to use for password hashing in production?",
        a: "No. Raw SHA hashes should not be used for password storage. SHA is too fast — an attacker can compute billions per second. Use bcrypt, scrypt, or Argon2, which are intentionally slow and include built-in salting.",
      },
      {
        q: "What is a hash collision?",
        a: "A collision is when two different inputs produce the same hash output. The security of a hash function depends on how hard it is to find a collision intentionally. SHA-1 has known collision attacks; SHA-256 and SHA-512 are considered collision-resistant.",
      },
    ],
  },

  "diff-checker": {
    longDescription:
      "Comparing two versions of a document — to see what changed between a first draft and a revision, to review what a config change actually modifies, or to check that two files that should be identical really are — is a fundamental task in software and writing. This diff checker compares two blocks of text line by line and highlights the differences: lines only in the first version are shown as deletions (red), lines only in the second are shown as additions (green), and lines in both are shown unchanged. The comparison happens entirely in your browser.",
    howTo: [
      "Paste the original text in the left panel.",
      "Paste the modified text in the right panel.",
      "Click Compare to compute the diff.",
      "Red lines exist only in the original; green lines exist only in the modified version; unmarked lines are unchanged.",
    ],
    useCases: [
      "Reviewing what changed between two versions of a configuration file before deploying",
      "Comparing a draft document to a revised version to see which sentences were added or removed",
      "Checking that two files that were supposed to be synced are actually identical",
      "Spotting unintended changes after a search-and-replace operation",
      "Auditing a generated file against a hand-written reference",
    ],
    faqs: [
      {
        q: "Is this a line-by-line or character-by-character diff?",
        a: "Line-by-line. A line is shown as added if it appears in the second input but not the first, and as removed if it appears in the first but not the second.",
      },
      {
        q: "Does whitespace affect the diff?",
        a: "Yes by default — a line with a trailing space differs from the same line without one. Normalize whitespace first if your files may differ only in indentation or line endings.",
      },
      {
        q: "What algorithm does this use?",
        a: "A longest-common-subsequence (LCS) algorithm, the same approach used by the Unix diff command. It finds the minimum set of insertions and deletions needed to transform the original into the modified version.",
      },
      {
        q: "Can I diff code files?",
        a: "Yes — the tool is plain-text, so it works on source code, JSON, YAML, SQL, or any other text format. For large multi-file reviews, a dedicated tool like git diff is more efficient.",
      },
    ],
  },

  "csv-to-json": {
    longDescription:
      "CSV (comma-separated values) is the universal export format for spreadsheets and databases, but most APIs and web applications expect JSON. Converting between them by writing a parser is repetitive work; this tool does it instantly. Paste any CSV with a header row and click Convert — each row becomes a JSON object, with the column headers as keys. The output is a JSON array ready to paste into an API call, a seed file, or a configuration. The parser handles quoted fields, commas inside quoted values, and Windows line endings.",
    howTo: [
      "Paste your CSV data into the input box. The first row must be the header row — its values become the JSON keys.",
      "Click Convert to produce the JSON array.",
      "Each row in the CSV becomes one object in the array. Empty fields become empty strings.",
      "Click Copy to put the JSON on your clipboard.",
    ],
    useCases: [
      "Exporting a spreadsheet from Excel or Google Sheets and converting it to JSON for an API payload",
      "Seeding a database from a CSV export by converting to a format a migration script can consume",
      "Transforming a product catalog CSV into a JSON array for a web storefront",
      "Converting exported contact data (CSV) into JSON for import into a CRM or email tool",
      "Prototyping with a static JSON dataset that was originally maintained as a spreadsheet",
    ],
    faqs: [
      {
        q: "Does this handle quoted commas inside fields?",
        a: "Yes. Fields that contain commas must be wrapped in double quotes in standard CSV. The parser recognizes these quoted fields and preserves the contents, including embedded commas.",
      },
      {
        q: "What if my CSV uses a semicolon or tab as the delimiter?",
        a: "The tool defaults to comma as the delimiter. For semicolon-delimited files (common in European locales), do a find-and-replace before pasting.",
      },
      {
        q: "Are all values returned as strings?",
        a: "Yes. CSV has no type system — everything is text. If your application needs typed values, add a post-processing step to cast fields to the correct types.",
      },
      {
        q: "What happens if rows have different numbers of columns?",
        a: "If a row has fewer columns than the header, the missing fields are omitted. If a row has more columns, the extra values are ignored.",
      },
    ],
  },

  "json-to-csv": {
    longDescription:
      "JSON arrays of objects are the standard output format for APIs and databases, but spreadsheet users and reporting tools expect CSV. This tool takes a JSON array where each element is an object and produces a CSV with the keys from the first object as headers and each object's values as a row. The output is clean, comma-separated, and ready to open in Excel, Google Sheets, or any data tool. Nested objects and arrays in the values are serialized as JSON strings so no data is lost.",
    howTo: [
      "Paste your JSON array into the input box. The input must be an array of objects (starting with '[' and ending with ']').",
      "Click Convert to generate the CSV.",
      "The first row of the output is the header row, taken from the keys of the first object.",
      "Click Copy to put the CSV on your clipboard.",
    ],
    useCases: [
      "Exporting API data for analysis in a spreadsheet without writing a script",
      "Preparing a report from a JSON data source for a non-technical stakeholder",
      "Converting a database query result (returned as JSON) into a CSV for a data analyst",
      "Exporting a list of users, orders, or products from a JSON-based API",
      "Creating a CSV seed file for a CMS or bulk-import tool from a JSON data model",
    ],
    faqs: [
      {
        q: "What if my objects have different keys?",
        a: "The converter uses the keys from the first object as column headers. If later objects have additional keys, those columns are not included. If they are missing keys, those cells are left empty.",
      },
      {
        q: "How are nested objects handled?",
        a: "Nested objects and arrays are serialized as JSON strings in the CSV cell. If you need nested fields flattened into separate columns, preprocess the JSON before converting.",
      },
      {
        q: "Are values with commas or quotes handled correctly?",
        a: "Yes. The converter wraps any value containing a comma, double quote, or newline in double quotes, and escapes embedded double quotes as two double quotes — the standard CSV escaping convention.",
      },
      {
        q: "Can I convert a single JSON object, not an array?",
        a: "Not directly. Wrap it in an array first: paste [{...your object...}] and the converter will produce a single-row CSV.",
      },
    ],
  },

  "jwt-decoder": {
    longDescription:
      "A JSON Web Token (JWT) is a compact, URL-safe token that encodes claims as a JSON object and signs them so the receiver can verify they have not been tampered with. JWTs have three parts separated by dots: the header (which describes the signing algorithm), the payload (which contains the claims, such as user ID, roles, and expiration time), and the signature. The header and payload are Base64url-encoded, not encrypted, which means anyone with the token can read the claims without the secret key. This tool decodes the header and payload of any JWT so you can inspect what is inside.",
    howTo: [
      "Paste a JWT into the input box. It should look like three base64-encoded strings separated by dots.",
      "The tool auto-decodes as you type, showing the header and payload as formatted JSON.",
      "The header shows the algorithm (alg) and token type (typ). The payload contains claims including 'sub', 'iat', and 'exp'.",
      "If the token is expired, a warning banner is shown.",
    ],
    useCases: [
      "Inspecting a JWT returned by an authentication API to verify it contains the expected claims",
      "Debugging an authorization problem by checking what roles or permissions a token actually contains",
      "Checking the expiration time of a token to understand why a session ended unexpectedly",
      "Verifying that a token uses the expected signing algorithm (HS256, RS256, etc.)",
      "Learning about the JWT format and understanding what information is embedded in a bearer token",
    ],
    faqs: [
      {
        q: "Is a JWT encrypted?",
        a: "Not by default. Standard JWTs (JWS — JSON Web Signature) are signed but not encrypted. The payload is Base64url-encoded, which anyone can decode. Do not put sensitive information like passwords in a JWT payload unless you also encrypt the token (JWE).",
      },
      {
        q: "Can this tool verify a JWT signature?",
        a: "No. Verifying a signature requires the secret key (for HMAC algorithms) or the public key (for RSA/EC algorithms). This tool only decodes the header and payload, which does not require any key.",
      },
      {
        q: "What is the difference between 'iat', 'exp', and 'nbf'?",
        a: "'iat' (issued at) is when the token was created. 'exp' (expiration) is when it expires. 'nbf' (not before) is a timestamp before which the token should not be accepted. All three are standard JWT claims defined in RFC 7519.",
      },
      {
        q: "Can I create a JWT with this tool?",
        a: "No — this tool only decodes existing tokens. Creating a JWT requires a signing key, which should never be shared with a browser tool. Use your server-side JWT library to issue tokens.",
      },
    ],
  },

  "regex-tester": {
    longDescription:
      "Regular expressions are a compact language for describing text patterns — they let you match, extract, and validate strings in ways that simple string comparisons cannot. A regex can find all email addresses in a block of text, validate that a phone number fits a specific format, or replace every occurrence of a pattern at once. The challenge is that regex syntax is dense and a small mistake produces wrong or no matches. This tester lets you write a JavaScript regex pattern, set flags, and immediately see which parts of a test string match, updated live as you type.",
    howTo: [
      "Enter your regex pattern in the Pattern field. Do not include the leading and trailing slashes — just the pattern itself.",
      "Check the flags you want: g (global), i (case-insensitive), m (multiline), s (dotAll).",
      "Type or paste your test string in the Test String box.",
      "Matches are listed below with their position and any captured groups.",
    ],
    useCases: [
      "Validating that a user-entered email, phone number, or postal code matches an expected format",
      "Extracting all URLs, dates, or IP addresses from a block of unstructured text",
      "Writing a search-and-replace pattern for a code editor before applying it",
      "Debugging a regex from a codebase that is not matching what it should",
      "Learning regex syntax by seeing live feedback on how each token affects what is matched",
    ],
    faqs: [
      {
        q: "What regex flavor does this use?",
        a: "JavaScript's built-in RegExp. The syntax supports character classes, quantifiers, anchors, groups, and lookaheads. It does not support some Perl or PCRE features like variable-width lookbehinds in older environments.",
      },
      {
        q: "What is the 'g' flag and when do I need it?",
        a: "The global flag (g) makes the regex find all matches instead of stopping at the first one. Use g when you want to highlight, count, or process every occurrence of a pattern in the text.",
      },
      {
        q: "Why does my pattern work here but fail in my code?",
        a: "Common causes: different flags in the code; backslashes need doubling in strings (new RegExp(\"\\\\d+\")) vs. regex literals (/\\d+/); different methods like match() vs. exec() behave slightly differently.",
      },
      {
        q: "How do I match a literal dot or parenthesis?",
        a: "Special regex characters must be escaped with a backslash. To match a literal dot, write \\. To match a literal parenthesis, write \\( and \\). Without the backslash, . matches any character and ( starts a group.",
      },
    ],
  },

  "slug-generator": {
    longDescription:
      "A URL slug is the part of a URL that identifies a specific page in a human-readable form — for example, 'how-to-generate-url-slugs' in 'example.com/blog/how-to-generate-url-slugs'. Good slugs are lowercase, contain only letters, numbers, and hyphens, and have no consecutive or leading/trailing hyphens. They affect both usability (readable URLs are easier to share and remember) and SEO (search engines use URL words as a relevance signal). This tool converts any title or phrase into a clean, URL-safe slug: it lowercases everything, replaces spaces with hyphens, removes punctuation, strips accents from accented characters, and trims the result.",
    howTo: [
      "Type or paste a title or phrase into the input box.",
      "The slug appears instantly below the input.",
      "Choose a separator: hyphen (recommended) or underscore.",
      "Click Copy to put the slug on your clipboard.",
    ],
    useCases: [
      "Generating a URL slug for a new blog post or article from its title",
      "Creating a unique, URL-safe key for a database record from a human-readable name",
      "Producing a file name from a document title without special characters or spaces",
      "Generating route paths in a web application from category or product names",
    ],
    faqs: [
      {
        q: "Does the slug affect SEO?",
        a: "Yes, meaningfully. Search engines read the words in a URL as a relevance signal. Clean slugs also improve click-through rates in search results because they tell users what a page is about before they click. Keep slugs focused on the most important 3–5 keywords.",
      },
      {
        q: "Should I use hyphens or underscores?",
        a: "Hyphens. Google treats hyphens as word separators, making 'how-to-bake-bread' equivalent to three separate words in the URL. Underscores are treated as word joiners. Hyphens are the modern standard for slugs.",
      },
      {
        q: "What happens to accented characters like é or ü?",
        a: "The tool converts accented Latin characters to their ASCII equivalents: é becomes e, ü becomes u. This produces slugs that work on all servers without percent-encoding.",
      },
      {
        q: "How long should a slug be?",
        a: "Most practitioners aim for 3 to 5 meaningful words — long enough to be readable, short enough to be shareable. Drop stop words (a, the, and, or) unless they are critical to meaning.",
      },
    ],
  },

  "line-tools": {
    longDescription:
      "Text lists are everywhere: log outputs, database exports, email lists, config values, and anything pasted from a terminal. Manually sorting, deduplicating, or rearranging lines is slow and error-prone. This tool applies common list operations to any block of text in a single click: sort alphabetically or reverse-alphabetically, remove duplicate lines, reverse the order of lines, remove blank lines, and trim leading and trailing whitespace from each line. Everything runs in your browser — your text never leaves the page.",
    howTo: [
      "Paste your text (one item per line) into the input box.",
      "Click the operation you want: Sort A→Z, Sort Z→A, Remove Duplicates, Reverse Order, Remove Empty Lines, or Trim Whitespace.",
      "The result appears in the output box.",
      "Click Copy to put the result on your clipboard.",
    ],
    useCases: [
      "Deduplicating a list of email addresses or usernames before importing them",
      "Sorting a word list or tag list alphabetically for a configuration file",
      "Reversing a chronological log output to read the most recent events first",
      "Removing blank lines from a pasted CSV or config file",
      "Cleaning up a list copied from a spreadsheet that has extra whitespace around values",
    ],
    faqs: [
      {
        q: "Is the sort case-sensitive?",
        a: "The sort is case-sensitive, which means uppercase lines come before lowercase in alphabetical order. To sort case-insensitively, convert all lines to the same case first, then sort.",
      },
      {
        q: "How does duplicate detection work?",
        a: "Two lines are duplicates if they are exactly identical, including capitalization and whitespace. 'Apple' and 'apple' are not duplicates.",
      },
      {
        q: "Can I sort numerically?",
        a: "The tool sorts lexicographically (as text), so '10' comes before '9'. For numeric sorting, pad numbers with leading zeros first, or use a spreadsheet.",
      },
      {
        q: "What counts as an empty line?",
        a: "A line containing no characters at all, or only whitespace characters. Remove Empty Lines removes both fully empty lines and whitespace-only lines.",
      },
    ],
  },

  "binary-converter": {
    longDescription:
      "At the hardware level, computers represent every character as a number, and every number as a sequence of binary digits (bits). ASCII assigns a number from 0 to 127 to each printable character; Unicode extends this to cover every writing system. Hexadecimal is a compact way to write binary data — one hex digit represents exactly four bits, so a full byte is two hex digits. This converter translates any text string into its binary representation (space-separated 8-bit groups, one per character) and into hexadecimal, and decodes binary or hex back to text.",
    howTo: [
      "Select the direction: Text→Binary, Binary→Text, Text→Hex, or Hex→Text.",
      "Paste your input into the input box.",
      "Click Convert to see the result.",
      "Click Copy to put the output on your clipboard.",
    ],
    useCases: [
      "Seeing the binary or hex representation of characters to understand character encoding",
      "Checking the byte values of a string when debugging a binary protocol or file format",
      "Encoding a short message in binary for a puzzle, quiz, or educational exercise",
      "Understanding why a character outside the ASCII range takes more than one byte",
    ],
    faqs: [
      {
        q: "Why does an emoji produce so many binary groups?",
        a: "Emojis are encoded in UTF-8 as multiple bytes — typically 3 or 4. Each byte becomes one 8-bit binary group. The number of groups equals the UTF-8 byte count of the input, not the character count.",
      },
      {
        q: "What encoding does this use?",
        a: "UTF-8. ASCII characters are represented as a single byte. Non-ASCII characters use 2 to 4 bytes.",
      },
      {
        q: "What is the relationship between binary and hex?",
        a: "Each hex digit represents exactly four bits. The hex digit A (10 in decimal) is always 1010 in binary. The byte 0xFF (255 in decimal) is 11111111 in binary — two F digits, eight 1-bits.",
      },
      {
        q: "Can this handle binary that was not generated from text?",
        a: "The tool interprets binary and hex as UTF-8 text bytes. If the binary represents something other than text (like an image header), the decoded output will be garbled. This tool is for text encoding.",
      },
    ],
  },

  "html-minifier": {
    longDescription:
      "HTML files often contain comments, extra whitespace, indentation, and blank lines added for readability by developers. All of this adds bytes that the browser ignores when rendering the page. Removing them reduces the size of each HTML response, which means faster downloads on slow connections or for pages requested millions of times per day. This tool minifies HTML by stripping HTML comments, collapsing multiple whitespace characters to a single space, and removing whitespace between tags. It is useful for inlining HTML into JavaScript strings, comparing HTML before and after minification, or understanding what a bundler removes.",
    howTo: [
      "Paste your HTML into the input box.",
      "Click Minify to remove comments and collapse whitespace.",
      "The output shows the minified HTML and the size reduction in bytes and percentage.",
      "Click Copy to put the minified HTML on your clipboard.",
    ],
    useCases: [
      "Reducing the size of an HTML email template before sending",
      "Inlining a snippet of HTML into a JavaScript string or template literal without indentation",
      "Comparing the output of two HTML generators to see if they produce equivalent minified results",
      "Understanding what characters are removed by a build pipeline's HTML minification step",
    ],
    faqs: [
      {
        q: "Does minification break the page?",
        a: "Minifying standard HTML does not change how the browser renders the page. However, whitespace-sensitive elements like <pre> and <textarea> should not have their internal whitespace collapsed. For production HTML, use a proper build tool like html-minifier-terser that handles these edge cases.",
      },
      {
        q: "Should I minify HTML in production?",
        a: "It depends. With gzip or Brotli compression enabled, HTML minification saves little additional space — compression already removes redundant characters efficiently. The bigger wins are from JavaScript and CSS minification.",
      },
      {
        q: "Are HTML comments always safe to remove?",
        a: "Almost always. The main exception is Internet Explorer conditional comments. If you are not targeting IE, removing all comments is safe.",
      },
      {
        q: "What is the difference between minification and compression?",
        a: "Minification removes redundant characters (whitespace, comments) without changing the structure. Compression (gzip, Brotli) encodes the byte stream more efficiently using repetition patterns. Both reduce transfer size; compression usually gives larger savings.",
      },
    ],
  },

  "roman-numeral-converter": {
    longDescription:
      "Roman numerals use seven letters — I (1), V (5), X (10), L (50), C (100), D (500), and M (1000) — and an additive-subtractive system to represent numbers from 1 to 3999. They appear on clock faces, book chapter headings, movie release years, Super Bowl numbering, and formal outlines. The subtractive notation (IV for 4, IX for 9, XL for 40, XC for 90, CD for 400, CM for 900) trips people up. This tool converts integers from 1 to 3999 to their Roman numeral representation and converts any valid Roman numeral string back to an integer.",
    howTo: [
      "To convert an integer to Roman numerals: enter a number from 1 to 3999 and click Convert.",
      "To convert Roman numerals to an integer: enter the Roman numeral string (e.g., MMXXIV) and click Convert.",
      "Both directions validate the input and show errors for invalid or out-of-range values.",
      "Click Copy to put the result on your clipboard.",
    ],
    useCases: [
      "Looking up what year a Roman numeral at the end of a film's credits represents",
      "Writing a chapter or section heading in a document that uses Roman numeral formatting",
      "Checking the correct Roman numeral for a specific year for a title or publication",
      "Converting a Super Bowl number, Olympics year, or monarch's regnal number",
    ],
    faqs: [
      {
        q: "Why does 4 use IV instead of IIII?",
        a: "Subtractive notation avoids four repeated symbols in a row. When a smaller value precedes a larger one, the smaller is subtracted: IV means 5 − 1 = 4, IX means 10 − 1 = 9. IIII still appears on many clock faces, but the subtractive form is the modern standard.",
      },
      {
        q: "What is the largest number that can be represented?",
        a: "With standard notation (up to three consecutive identical symbols), the largest number is 3999 (MMMCMXCIX). Numbers 4000 and above require extended notation with overlines.",
      },
      {
        q: "Is zero representable in Roman numerals?",
        a: "No. Roman numerals have no symbol for zero. The concept of zero as a number was introduced from Indian mathematics through Arabic scholars and adopted in Europe during the Middle Ages.",
      },
      {
        q: "How do I read a Roman numeral year in a film credit?",
        a: "Add up the values from right to left, subtracting when a smaller value precedes a larger one. MMXXIV: M(1000)+M(1000)+X(10)+X(10)+IV(4) = 2024.",
      },
    ],
  },
};
