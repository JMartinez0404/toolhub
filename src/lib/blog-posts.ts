export interface ContentBlock {
  type: "p" | "h2" | "ul" | "ol";
  text?: string;
  items?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: ContentBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-create-a-strong-password",
    title: "How to Create a Strong Password",
    date: "2025-10-15",
    excerpt:
      "Most people know passwords should be strong, but few know what that actually means. Here is a practical guide to creating passwords that hold up against modern attacks.",
    content: [
      {
        type: "p",
        text: "Most people know their passwords should be strong. Fewer know what that actually means. A password that feels strong — one that has a capital letter, a number, and a symbol — may still be cracked in hours if it follows a predictable pattern. This guide covers the properties that make passwords genuinely hard to break, what to avoid, and how to manage them without going mad.",
      },
      {
        type: "h2",
        text: "Length Matters More Than Complexity",
      },
      {
        type: "p",
        text: "The single most important property of a password is length. Each additional character multiplies the number of possible combinations an attacker has to check. A 20-character password made of only lowercase letters has more possible values than a 10-character password that uses every character class. Modern GPUs can check billions of passwords per second — short passwords, no matter how complex, fall in hours.",
      },
      {
        type: "p",
        text: "For routine accounts, 12 to 16 characters is a reasonable minimum. For critical accounts — email, banking, your password manager — aim for 20 or more. If a service caps passwords at 8 or 10 characters, that is a red flag about their security practices.",
      },
      {
        type: "h2",
        text: "Which Characters to Include",
      },
      {
        type: "p",
        text: "Using all four character classes — uppercase, lowercase, digits, and symbols — adds meaningful entropy per character. Symbols like !, @, and # are not magic; they help because they expand the character set an attacker has to consider. But extra length gives more benefit than extra complexity per character, so if you have to choose between a 16-character lowercase-only password and a 10-character mixed-everything password, pick the longer one.",
      },
      {
        type: "ul",
        items: [
          "Uppercase A–Z adds 26 characters to the possible set.",
          "Digits 0–9 add 10.",
          "Common symbols add 32 or more depending on which set is allowed.",
          "Some sites block certain symbols — if generation fails, remove symbols and compensate with extra length.",
        ],
      },
      {
        type: "h2",
        text: "Patterns to Avoid",
      },
      {
        type: "p",
        text: "Attackers do not try every possible combination in order — that would take too long even for short passwords. Instead, they use wordlists and rule sets that encode how humans actually choose passwords. Dictionary words, names, sports teams, dates, and keyboard patterns (qwerty, 123456, asdfgh) all appear early in these lists. Common substitutions — P@ssw0rd, L3tMe1n — are also in every serious cracking ruleset.",
      },
      {
        type: "ul",
        items: [
          "Avoid any word that appears in a dictionary, in any language.",
          "Do not use names, birthdays, anniversaries, or addresses.",
          "Keyboard walks (qwerty, 12345) are cracked in seconds.",
          "Do not append a number or year to a word — it is the first thing rules try.",
          "Do not use the same password, or obvious variations, across multiple sites.",
        ],
      },
      {
        type: "h2",
        text: "Using a Password Manager",
      },
      {
        type: "p",
        text: "The right solution to strong passwords is a password manager. A manager generates and stores a unique, random password for every account. You only need to remember one master password. Free options include Bitwarden (open source, cross-platform) and KeePass (local only). Paid options like 1Password offer polished apps and sharing features. Browser built-in managers from Chrome, Firefox, and Safari are also genuinely good and free.",
      },
      {
        type: "p",
        text: "The master password for your manager deserves special attention. It should be long, random, and not based on anything personal. A passphrase — four to six random words chosen from a large wordlist — is both memorable and extremely hard to crack. 'correct horse battery staple' is the famous example; the actual words should be random, not that phrase.",
      },
      {
        type: "h2",
        text: "Two-Factor Authentication",
      },
      {
        type: "p",
        text: "Even a perfect password can be compromised: phishing attacks trick users into entering credentials on fake sites, and data breaches expose hashed passwords to offline cracking. Two-factor authentication (2FA) adds a second requirement — something you have — so a stolen password alone is not enough to access your account.",
      },
      {
        type: "p",
        text: "Prefer an authenticator app (Google Authenticator, Authy, Bitwarden Authenticator) over SMS codes. SMS 2FA is better than nothing, but phone numbers can be hijacked. Hardware security keys (YubiKey, Google Titan) are the strongest option and resistant to phishing. Enable 2FA on every account that offers it, starting with email, banking, and your password manager.",
      },
    ],
  },
  {
    slug: "what-is-base64-encoding",
    title: "What Is Base64 Encoding and When Should You Use It?",
    date: "2025-10-22",
    excerpt:
      "Base64 appears everywhere in web development — JWT tokens, email attachments, data URLs — but it is frequently misunderstood. Here is what it actually does and when to use it.",
    content: [
      {
        type: "p",
        text: "Base64 shows up constantly in web development. You see it in JWT tokens, email attachments, data URLs in HTML, and API authentication headers. But most developers learn to copy-paste it rather than understanding what it actually does. This article explains the mechanics, the common uses, and the important limits of Base64.",
      },
      {
        type: "h2",
        text: "How Base64 Works",
      },
      {
        type: "p",
        text: "Base64 is an encoding scheme that represents binary data as ASCII text. It does this by taking three bytes (24 bits) of input at a time and splitting them into four 6-bit groups. Each 6-bit group maps to one of 64 printable characters: A–Z, a–z, 0–9, +, and /. The name comes from this 64-character alphabet.",
      },
      {
        type: "p",
        text: "Because three bytes become four characters, Base64-encoded data is always approximately one-third larger than the original. If the input is not a multiple of three bytes, padding characters (=) are added to make the output length a multiple of four. Decoding is the reverse: strip padding, convert each character back to its 6-bit value, reassemble the 24-bit groups, and split them back into bytes.",
      },
      {
        type: "h2",
        text: "Common Uses for Base64",
      },
      {
        type: "p",
        text: "Base64 exists because many data transport channels were originally designed to carry text, not arbitrary binary data. Email infrastructure, for example, was built for 7-bit ASCII and cannot reliably pass binary bytes. Embedding an image or PDF in an email requires encoding the binary data as text that survives transit intact.",
      },
      {
        type: "ul",
        items: [
          "Email attachments use MIME's Base64 Content-Transfer-Encoding to send binary files.",
          "Data URLs (data:image/png;base64,...) embed images directly in HTML and CSS without a separate HTTP request.",
          "JWT tokens encode their JSON header and payload as Base64url (a URL-safe variant).",
          "HTTP Basic Authentication encodes username:password in Base64 in the Authorization header.",
          "Binary values in JSON fields (such as encrypted data or file contents) are Base64-encoded because JSON has no binary type.",
        ],
      },
      {
        type: "h2",
        text: "Base64 Is Not Encryption",
      },
      {
        type: "p",
        text: "This is the most important point. Base64 is an encoding, not encryption. It has no key, no secret, and no security. Anyone who sees a Base64-encoded value can decode it in one step using any Base64 decoder. The encoding is completely reversible and standardized — there is nothing secret about how it works.",
      },
      {
        type: "p",
        text: "You will occasionally see credentials, tokens, or configuration values stored as Base64 as if it provides some protection. It does not. If a secret is Base64-encoded, it is effectively in plaintext. Always use actual encryption (AES, RSA) with a proper key when confidentiality is required.",
      },
      {
        type: "h2",
        text: "Base64url: The URL-Safe Variant",
      },
      {
        type: "p",
        text: "Standard Base64 uses + and / as two of its 64 characters. These characters have special meaning in URLs: + is interpreted as a space in some contexts, and / is a path separator. Base64url replaces + with - and / with _ to produce output that can appear in URLs and filenames without encoding. It also typically omits the trailing = padding.",
      },
      {
        type: "p",
        text: "JWT tokens use Base64url encoding for their header and payload segments. If you are decoding a JWT manually, remember to replace - with + and _ with / before feeding the string to a standard Base64 decoder.",
      },
      {
        type: "h2",
        text: "When to Avoid Base64",
      },
      {
        type: "p",
        text: "For small values (icons, small images) in a performance-critical page, data URLs can save HTTP requests and improve load time. But Base64 increases size by 33%, and that overhead adds up. Encoding a 100 KB image as a Base64 data URL produces a 133 KB string that must be parsed as text before the browser can decode and render it. For images larger than a few kilobytes, serving them as separate files with proper caching is almost always faster.",
      },
    ],
  },
  {
    slug: "url-encoding-explained",
    title: "URL Encoding Explained",
    date: "2025-11-05",
    excerpt:
      "URL encoding — or percent-encoding — is one of those things every developer encounters but few fully understand. Here is a complete, practical explanation.",
    content: [
      {
        type: "p",
        text: "URL encoding, formally called percent-encoding, is the mechanism that makes it safe to include arbitrary text inside a URL. You encounter it constantly: spaces become %20, ampersands in query parameters become %26, and non-ASCII characters turn into multi-character sequences starting with %. Understanding how and why it works prevents a class of subtle bugs in URL construction.",
      },
      {
        type: "h2",
        text: "Why URLs Have Restrictions",
      },
      {
        type: "p",
        text: "A URL is a structured string. Certain characters play structural roles: / separates path segments, ? separates path from query, & separates query parameters, # introduces the fragment, and : separates the scheme from the host. If any of these characters appear literally in a path segment or parameter value, the parser cannot tell whether they are structure or content.",
      },
      {
        type: "p",
        text: "Additionally, URLs were originally defined to carry only ASCII characters. Non-ASCII characters — accented letters, Chinese, Arabic, emoji — have no direct representation and must be encoded to be transmitted safely across all the systems (browsers, servers, proxies, load balancers) that handle HTTP traffic.",
      },
      {
        type: "h2",
        text: "How Percent-Encoding Works",
      },
      {
        type: "p",
        text: "Percent-encoding replaces each byte that needs encoding with a percent sign (%) followed by two uppercase hexadecimal digits representing the byte value. A space (byte value 32, or 0x20 in hex) becomes %20. A left angle bracket (byte value 60, 0x3C) becomes %3C. The percent sign itself becomes %25.",
      },
      {
        type: "p",
        text: "For non-ASCII characters, the process has an extra step. The character is first encoded to UTF-8, which may produce multiple bytes, and then each byte is percent-encoded individually. The emoji 😀 encodes to four UTF-8 bytes (0xF0, 0x9F, 0x98, 0x80), producing %F0%9F%98%80 in a URL.",
      },
      {
        type: "h2",
        text: "Reserved vs. Unreserved Characters",
      },
      {
        type: "p",
        text: "RFC 3986 divides characters into three categories. Unreserved characters — letters (A–Z, a–z), digits (0–9), and the four symbols - . _ ~ — can appear in any part of a URL without encoding. Reserved characters — : / ? # [ ] @ ! $ & ' ( ) * + , ; = — have specific structural meanings in URLs and must be encoded when used as data. Everything else must be percent-encoded.",
      },
      {
        type: "h2",
        text: "encodeURI vs. encodeURIComponent",
      },
      {
        type: "p",
        text: "JavaScript provides two encoding functions with importantly different behaviors. encodeURI(url) assumes its argument is a complete URL and leaves structural characters alone — it will not encode ://?#&= because those are needed for the URL to function. encodeURIComponent(value) assumes its argument is a single value that will go inside a URL and encodes every character that has structural meaning, including & and =.",
      },
      {
        type: "ul",
        items: [
          "Use encodeURI when encoding a full URL you have constructed yourself.",
          "Use encodeURIComponent when encoding a single query parameter value or path segment.",
          "Never use encodeURI to encode a user-supplied value that will go inside a URL — it will miss & and = and allow injection.",
          "Most modern frameworks and fetch APIs encode values automatically; check the documentation before encoding manually.",
        ],
      },
      {
        type: "h2",
        text: "Common URL Encoding Mistakes",
      },
      {
        type: "p",
        text: "Double encoding happens when a value that is already percent-encoded gets encoded again. A space becomes %20, then %20 becomes %2520 (because % is encoded as %25). The receiver decodes once and sees %20 as a literal string instead of a space. The fix is to encode exactly once, at the boundary where you construct the URL.",
      },
      {
        type: "p",
        text: "The + vs. %20 confusion comes from HTML form encoding (application/x-www-form-urlencoded), which uses + for spaces in query strings. Servers that parse query strings often handle both. URL paths, however, should always use %20 for spaces — + in a path is a literal plus sign, not a space.",
      },
    ],
  },
  {
    slug: "json-formatting-best-practices",
    title: "JSON Formatting Best Practices",
    date: "2025-11-12",
    excerpt:
      "JSON is the dominant data format on the web, but it has strict rules and common pitfalls. Here is a guide to writing clean, valid JSON.",
    content: [
      {
        type: "p",
        text: "JSON (JavaScript Object Notation) is the standard data exchange format for web APIs, configuration files, and application data. Despite its simplicity, JSON has strict syntax rules that trip up developers, and common formatting choices affect readability, debuggability, and compatibility. This guide covers the rules, the conventions, and the edge cases worth knowing.",
      },
      {
        type: "h2",
        text: "JSON Syntax Rules",
      },
      {
        type: "p",
        text: "JSON is a strict subset of JavaScript object notation, but with important differences. Strings must use double quotes — not single quotes. Object keys must be strings, also in double quotes. Trailing commas after the last item in an object or array are not allowed. Comments are not allowed. These rules catch most developers who are used to JavaScript's more lenient syntax.",
      },
      {
        type: "ul",
        items: [
          "Strings: double quotes only. 'hello' is invalid; \"hello\" is correct.",
          "Keys: must be strings in double quotes. {name: \"Alice\"} is invalid; {\"name\": \"Alice\"} is correct.",
          "No trailing commas: [1, 2, 3,] is invalid.",
          "No comments: // and /* */ are not supported.",
          "Numbers: no leading zeros (01 is invalid), no NaN, no Infinity.",
          "Values: string, number, object, array, true, false, or null — nothing else.",
        ],
      },
      {
        type: "h2",
        text: "Pretty-Print vs. Minified",
      },
      {
        type: "p",
        text: "Pretty-printed JSON has consistent indentation (typically 2 or 4 spaces) and each key-value pair on its own line. It is easy to read and diff, which makes it the right choice for configuration files that humans edit, API responses in development, and documentation examples. Minified JSON removes all non-essential whitespace, reducing file size at the cost of human readability.",
      },
      {
        type: "p",
        text: "For production API responses, minified JSON reduces bytes transferred. However, if HTTP compression (gzip or Brotli) is enabled — which it should be — the difference in compressed size is minimal, because the compressor handles redundant whitespace efficiently. In practice, always serve compressed responses and do not worry about JSON minification for API responses. Reserve minification for tokens, cookies, and contexts where compression is not available.",
      },
      {
        type: "h2",
        text: "Key Naming Conventions",
      },
      {
        type: "p",
        text: "JSON itself has no opinion on key naming. In practice, the convention follows the language of the API consumer. JavaScript and Node.js APIs typically use camelCase (firstName, userId). Python and Ruby APIs often use snake_case (first_name, user_id). Public APIs should document their convention and apply it consistently — mixing both in the same API is a source of constant friction.",
      },
      {
        type: "p",
        text: "Keep key names concise but descriptive. Abbreviations save a few bytes but hurt readability; with compression, the transfer savings are negligible. Avoid names that conflict with JavaScript reserved words if the API will be consumed in JavaScript, and avoid starting names with numbers or including spaces, which require unusual handling in every consumer.",
      },
      {
        type: "h2",
        text: "Common Type Pitfalls",
      },
      {
        type: "p",
        text: "JSON has no date type. Dates are typically serialized as ISO 8601 strings (\"2025-11-12T00:00:00Z\") or as Unix timestamps (numbers). Pick one convention and document it. Parsing ISO strings to Date objects works reliably; parsing Unix timestamps requires knowing whether they are in seconds or milliseconds.",
      },
      {
        type: "p",
        text: "JSON also has no distinction between integers and floats — they are all numbers. Very large integers (above 2^53 - 1) lose precision when parsed by JavaScript's JSON.parse(), because they are stored as IEEE 754 doubles. APIs that deal with large identifiers (such as Twitter/X's tweet IDs) often serialize them as strings to avoid this problem.",
      },
      {
        type: "h2",
        text: "When to Use JSON5 or JSONC",
      },
      {
        type: "p",
        text: "JSON5 is a superset of JSON that adds trailing commas, single-quoted strings, comments, and unquoted keys. JSONC (JSON with Comments) adds only comments. Both are useful for configuration files that humans edit — tsconfig.json, VS Code settings, and many other developer tools use JSONC. They are not appropriate for API responses, which must be consumed by standard JSON parsers.",
      },
    ],
  },
  {
    slug: "what-is-a-uuid",
    title: "What Is a UUID and When Should You Use One?",
    date: "2025-11-19",
    excerpt:
      "UUIDs are everywhere in software — database primary keys, correlation IDs, session tokens. This guide explains the format, the versions, and when UUIDs are the right tool.",
    content: [
      {
        type: "p",
        text: "UUID stands for Universally Unique Identifier. It is a 128-bit value, typically written as 32 hexadecimal characters in five groups separated by hyphens: 550e8400-e29b-41d4-a716-446655440000. The design goal is that independently generated UUIDs should never collide — no central authority is needed to coordinate the assignment of unique identifiers.",
      },
      {
        type: "h2",
        text: "The UUID Format",
      },
      {
        type: "p",
        text: "The canonical UUID format is eight hexadecimal digits, a hyphen, four digits, a hyphen, four digits, a hyphen, four digits, a hyphen, twelve digits: xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx. The M position indicates the version (1–8) and the N position indicates the variant (most UUIDs use variant 2, indicated by a leading 1, 0, or c bit pattern in N).",
      },
      {
        type: "h2",
        text: "UUID Versions Explained",
      },
      {
        type: "p",
        text: "There are several UUID versions, each with a different generation strategy. Version 1 uses the current timestamp and the MAC address of the generating machine. This produces sortable UUIDs but leaks the machine identity and exact creation time, which is a privacy concern. Version 4 is generated from cryptographically random bits — it carries no information about when or where it was generated, just 122 bits of randomness. Version 5 is a deterministic UUID produced by hashing a namespace and a name with SHA-1, useful when you want the same input to always produce the same UUID. Version 7, introduced in 2024, combines a millisecond-precision timestamp with random bits, giving time-ordered UUIDs that are better for database indexing.",
      },
      {
        type: "ul",
        items: [
          "v1: timestamp + MAC address. Sortable but exposes metadata.",
          "v4: random. Best for most uses — no metadata leakage.",
          "v5: SHA-1 hash of namespace + name. Deterministic.",
          "v7: timestamp prefix + random suffix. Time-ordered, database-friendly.",
        ],
      },
      {
        type: "h2",
        text: "UUID as a Primary Key",
      },
      {
        type: "p",
        text: "Using UUIDs as database primary keys has significant advantages: multiple services can generate keys independently without coordination, keys can be assigned before a database insert, and keys do not expose row counts or insertion order to clients. These properties make UUIDs attractive for distributed systems and for APIs where you do not want to leak how many records exist.",
      },
      {
        type: "p",
        text: "The main downside is index performance. B-tree indexes in relational databases perform best when new keys are sequential — each new key is appended at the right end of the index. Random v4 UUIDs scatter inserts across the entire index, causing page splits and fragmenting the index. For high-write tables, this is a real performance cost. UUID v7, which starts with a timestamp, largely solves this problem while keeping the coordination-free benefits of UUIDs.",
      },
      {
        type: "h2",
        text: "Alternatives to UUID",
      },
      {
        type: "p",
        text: "ULID (Universally Unique Lexicographically Sortable Identifier) is a 128-bit identifier that encodes a millisecond timestamp in its first 48 bits and random bits in its remaining 80 bits, represented in a 26-character base-32 string. It sorts lexicographically by creation time and is URL-safe. CUID2 and NanoID are shorter alternatives designed for different trade-offs. Auto-increment integers remain the right choice for single-node databases where insert performance matters most and exposing row counts is not a concern.",
      },
      {
        type: "h2",
        text: "Are UUIDs Safe to Expose?",
      },
      {
        type: "p",
        text: "v4 UUIDs are safe to expose in URLs and API responses — they leak no information about creation time or machine identity, and with 122 bits of randomness, guessing a valid UUID is not feasible. However, do not rely on UUIDs as access control. A UUID in a URL is an identifier, not a secret. If a user should not be able to access a resource by guessing or enumerating IDs, enforce that with authorization checks on the server, not by making the ID hard to guess.",
      },
    ],
  },
  {
    slug: "regular-expressions-basics",
    title: "Regular Expressions: A Practical Beginner's Guide",
    date: "2025-12-03",
    excerpt:
      "Regular expressions look intimidating, but a small set of patterns covers most real-world uses. This guide walks through the core syntax with practical examples.",
    content: [
      {
        type: "p",
        text: "Regular expressions (regex) are a pattern language for matching text. They let you describe what a string should look like rather than writing imperative code to check it character by character. A regex can find every phone number in a document, validate that an email address has roughly the right format, or replace every occurrence of a pattern in one operation. They are available in every mainstream programming language and many command-line tools.",
      },
      {
        type: "h2",
        text: "What Is a Regular Expression?",
      },
      {
        type: "p",
        text: "A regex is a string of characters that describes a pattern. When you apply a regex to a text, the regex engine searches for substrings that match the pattern. The simplest regex is a literal string: the pattern cat matches the substring 'cat' anywhere in the text — in 'scattered', 'category', and 'cats'. Most of a regex's power comes from special characters that let you describe variable patterns rather than fixed strings.",
      },
      {
        type: "h2",
        text: "The Basic Building Blocks",
      },
      {
        type: "p",
        text: "The dot (.) matches any single character except a newline. A character class in square brackets matches any one character from a set: [aeiou] matches any vowel, [0-9] matches any digit, [a-zA-Z] matches any letter. A caret inside the brackets negates the set: [^0-9] matches any character that is not a digit.",
      },
      {
        type: "ul",
        items: [
          ". — any character (except newline by default)",
          "[abc] — any one of a, b, or c",
          "[^abc] — any character except a, b, or c",
          "[a-z] — any lowercase letter",
          "\\d — any digit (shorthand for [0-9])",
          "\\w — any word character (letters, digits, underscore)",
          "\\s — any whitespace character (space, tab, newline)",
          "\\D, \\W, \\S — the negations of \\d, \\w, \\s",
        ],
      },
      {
        type: "h2",
        text: "Quantifiers and Anchors",
      },
      {
        type: "p",
        text: "Quantifiers specify how many times the preceding element must match. The asterisk (*) means zero or more times. The plus (+) means one or more times. The question mark (?) means zero or one time. Curly braces specify exact counts: {3} means exactly three times, {2,5} means between two and five times, {3,} means three or more times.",
      },
      {
        type: "p",
        text: "Anchors do not match characters — they match positions. The caret (^) anchors to the start of the string (or line, with multiline mode). The dollar sign ($) anchors to the end. Without anchors, a pattern can match anywhere in the string. With anchors, it must match at the specified position. ^\\d+$ means the entire string consists of one or more digits, with no other characters before or after.",
      },
      {
        type: "h2",
        text: "Five Practical Examples",
      },
      {
        type: "ol",
        items: [
          "Email format check: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/ — one or more non-whitespace, non-@ characters, then @, then a domain part with at least one dot.",
          "Extract URLs from text: /https?:\\/\\/[^\\s]+/g — http or https, ://, then non-whitespace characters.",
          "Match a date in YYYY-MM-DD format: /\\d{4}-\\d{2}-\\d{2}/ — four digits, hyphen, two digits, hyphen, two digits.",
          "Find US phone numbers: /\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}/ — handles (555) 123-4567, 555-123-4567, 5551234567.",
          "Remove leading/trailing whitespace: /^\\s+|\\s+$/g with an empty replacement — matches whitespace at start or end.",
        ],
      },
      {
        type: "h2",
        text: "Common Mistakes to Avoid",
      },
      {
        type: "p",
        text: "Forgetting to escape special characters is the most common mistake. The characters . * + ? ^ $ { } [ ] ( ) | \\ all have special meaning. To match a literal dot, write \\.. To match a literal parenthesis, write \\(. When a regex is not matching as expected, check whether any special characters in your pattern need to be escaped.",
      },
      {
        type: "p",
        text: "Catastrophic backtracking is a performance trap in complex patterns. Patterns like (a+)+ applied to a long non-matching string cause the engine to explore exponentially many paths before giving up. If your regex runs against user-supplied input and performance matters, test it against inputs designed to trigger worst-case backtracking — a long string of 'a' characters followed by a character that does not match is a classic test. Rewrite nested quantifiers as flat patterns whenever possible.",
      },
    ],
  },
];
