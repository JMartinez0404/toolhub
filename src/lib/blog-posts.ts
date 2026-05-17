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
  {
    slug: "how-jwt-authentication-works",
    title: "How JWT Authentication Works",
    date: "2025-12-10",
    excerpt:
      "JSON Web Tokens are the backbone of stateless authentication in modern web apps. This guide explains the structure, the signing process, and the security concerns you need to know.",
    content: [
      {
        type: "p",
        text: "JSON Web Tokens (JWTs) are a compact, self-contained format for representing claims between two parties. In web authentication, a server issues a JWT when a user logs in, and the client sends that token with every subsequent request so the server can verify the user's identity without querying a database. Understanding how JWTs work — and where they can go wrong — is essential for building secure applications.",
      },
      {
        type: "h2",
        text: "The Three Parts of a JWT",
      },
      {
        type: "p",
        text: "A JWT consists of three Base64url-encoded parts separated by dots: header.payload.signature. The header specifies the token type (JWT) and the signing algorithm (typically HS256 or RS256). The payload contains claims — key-value pairs that assert facts about the user, such as their user ID, email, roles, and the token's expiration time. The signature is computed over the header and payload using a secret key, and it is what allows the recipient to verify that the token has not been tampered with.",
      },
      {
        type: "ul",
        items: [
          "Header: algorithm and token type, Base64url-encoded JSON.",
          "Payload: claims (sub, iat, exp, custom fields), Base64url-encoded JSON.",
          "Signature: HMAC-SHA256 or RSA signature over header.payload, using the server's secret.",
        ],
      },
      {
        type: "h2",
        text: "How Verification Works",
      },
      {
        type: "p",
        text: "When a server receives a JWT, it splits the token at the dots, decodes the header to determine the algorithm, then recomputes the signature over the received header and payload using the server's secret key. If the computed signature matches the received signature, the token is valid and the payload can be trusted. If even one character of the header or payload was changed after signing, the signature will not match and the token is rejected.",
      },
      {
        type: "p",
        text: "This is why JWTs are called stateless — the server does not store sessions. The signed payload carries all the information the server needs, and the signature guarantees it has not been modified. There is no database lookup on every request.",
      },
      {
        type: "h2",
        text: "Common JWT Claims",
      },
      {
        type: "ul",
        items: [
          "sub (subject): the user's unique identifier.",
          "iat (issued at): Unix timestamp when the token was issued.",
          "exp (expiration): Unix timestamp after which the token is invalid.",
          "iss (issuer): the server that issued the token.",
          "aud (audience): the intended recipient of the token.",
          "Custom claims: roles, permissions, email — anything the application needs.",
        ],
      },
      {
        type: "h2",
        text: "Security Concerns",
      },
      {
        type: "p",
        text: "The algorithm confusion attack exploits servers that accept any algorithm specified in the token header. An attacker changes the header from RS256 (asymmetric) to HS256 (symmetric) and signs the token with the server's public key, which is publicly known. If the server naively uses the algorithm from the header, it verifies the signature using the public key as the HMAC secret and accepts the forged token. The fix is to never trust the algorithm field from the token — always verify with a hard-coded expected algorithm.",
      },
      {
        type: "p",
        text: "JWTs cannot be invalidated before they expire without maintaining a server-side blocklist, which partially defeats the stateless benefit. For this reason, keep JWT lifetimes short (15 minutes for access tokens) and use refresh tokens with longer lifetimes that can be stored server-side and revoked. Store JWTs in httpOnly cookies, not localStorage, to prevent JavaScript access and reduce XSS exposure.",
      },
    ],
  },
  {
    slug: "csv-vs-json",
    title: "CSV vs JSON: When to Use Each Format",
    date: "2025-12-17",
    excerpt:
      "CSV and JSON are both ubiquitous data formats, but they serve different use cases. Understanding the trade-offs will help you pick the right one for every situation.",
    content: [
      {
        type: "p",
        text: "CSV (Comma-Separated Values) and JSON (JavaScript Object Notation) are the two most common formats for exchanging structured data. Both are text-based, human-readable, and supported by virtually every programming language and tool. But they have fundamentally different designs that make each the right choice in different situations.",
      },
      {
        type: "h2",
        text: "What CSV Is Good At",
      },
      {
        type: "p",
        text: "CSV is a tabular format: rows of values separated by commas, with an optional header row. It is ideal for flat, rectangular data — the kind that fits naturally into a spreadsheet. Think exports from databases, financial records, bulk user imports, analytics reports, and scientific datasets. Every spreadsheet application on earth can open a CSV file. Data analysts and data scientists often prefer CSV for its simplicity and the ease of loading it into tools like pandas, R, or SQL.",
      },
      {
        type: "ul",
        items: [
          "Flat, tabular data with uniform columns.",
          "Spreadsheet import/export.",
          "Bulk data transfers between systems.",
          "Data science and analytics pipelines.",
          "Files that non-technical users will open in Excel.",
        ],
      },
      {
        type: "h2",
        text: "What JSON Is Good At",
      },
      {
        type: "p",
        text: "JSON supports nested objects and arrays, which makes it capable of representing hierarchical data that CSV cannot. A user record in JSON can include an array of addresses, each with its own nested fields, without splitting into multiple tables or flattening the structure. JSON is the native format of web APIs, JavaScript applications, and most NoSQL databases. It supports six value types: strings, numbers, booleans, null, objects, and arrays.",
      },
      {
        type: "ul",
        items: [
          "REST and GraphQL API responses.",
          "Hierarchical or nested data structures.",
          "Configuration files (package.json, tsconfig.json).",
          "Data with variable-length or optional fields.",
          "Anything consumed by JavaScript or Node.js.",
        ],
      },
      {
        type: "h2",
        text: "Key Differences",
      },
      {
        type: "p",
        text: "CSV has no standard way to represent nested data, dates, booleans, or null values — everything is a string, and the consumer must interpret the values. JSON has explicit types: true is a boolean, not the string 'true'; null is a null value, not an empty string; 1.5 is a number, not a string. This type richness makes JSON safer to parse and less ambiguous.",
      },
      {
        type: "p",
        text: "CSV is significantly more compact than JSON for tabular data because keys are not repeated on every row. A CSV file with 10,000 rows of user data might be half the size of the equivalent JSON. For bulk data transfers where bandwidth or storage cost matters, CSV wins on size. JSON's verbosity comes with the benefit of self-description — you do not need an external schema to understand the structure.",
      },
      {
        type: "h2",
        text: "Converting Between the Two",
      },
      {
        type: "p",
        text: "Converting flat JSON arrays to CSV is straightforward — each object becomes a row, and the object keys become column headers. The reverse is equally simple. The conversion breaks down when JSON is nested: there is no obvious way to represent {name: 'Alice', address: {city: 'Austin', zip: '78701'}} as a CSV row without either flattening the keys (address_city, address_zip) or dropping the nested data. For nested structures, JSON is the right format and CSV conversion should be avoided.",
      },
    ],
  },
  {
    slug: "html-special-characters-guide",
    title: "HTML Special Characters and Entities: A Complete Guide",
    date: "2026-01-07",
    excerpt:
      "HTML entities let you display characters that would otherwise confuse the parser. This guide covers the most common ones, why they exist, and when you actually need them.",
    content: [
      {
        type: "p",
        text: "HTML uses certain characters as part of its syntax: angle brackets delimit tags, ampersands introduce entities, and quotes delimit attribute values. If you want to display these characters as literal text in a webpage, you cannot simply type them — the browser will interpret them as markup. HTML entities are the solution: escape sequences that represent characters that would otherwise be ambiguous or illegal in HTML.",
      },
      {
        type: "h2",
        text: "The Essential Entities",
      },
      {
        type: "ul",
        items: [
          "&amp; — ampersand (&). Always escape & in HTML content and attribute values.",
          "&lt; — less-than (<). Required to display < without starting a tag.",
          "&gt; — greater-than (>). Technically safe unescaped in most contexts, but good practice to escape.",
          "&quot; — double quote (\"). Required inside double-quoted attributes.",
          "&apos; — apostrophe ('). Required inside single-quoted attributes; not valid in HTML4.",
          "&nbsp; — non-breaking space. Prevents a line break at this space; also displays as a visible space.",
        ],
      },
      {
        type: "h2",
        text: "Named vs. Numeric Entities",
      },
      {
        type: "p",
        text: "HTML defines named character references like &copy; for © and &mdash; for —. You can also reference any Unicode character by its code point: &#169; is the decimal form of ©, and &#xA9; is the hexadecimal form. Named entities are easier to read; numeric entities work for any Unicode character, including those without named equivalents. Both forms are terminated by a semicolon.",
      },
      {
        type: "h2",
        text: "When You Actually Need Entities",
      },
      {
        type: "p",
        text: "In modern web development, if your HTML file is saved as UTF-8 and served with the correct Content-Type header or a <meta charset='UTF-8'> declaration, you can include any Unicode character directly in your HTML source — no entity needed. You can type © directly instead of &copy;, type — instead of &mdash;, and type emoji directly. The only characters that truly require entities are the ones with syntactic meaning: &, <, and > in content, and additionally &, <, >, ', and \" inside attribute values.",
      },
      {
        type: "p",
        text: "The &nbsp; entity is a special case. It is not just a space — it is a non-breaking space, which prevents the browser from inserting a line break between the words it connects. Use it intentionally, not as a way to add extra horizontal spacing. For spacing in CSS, use margin, padding, or gap instead.",
      },
      {
        type: "h2",
        text: "Common Mistakes",
      },
      {
        type: "p",
        text: "The most common mistake is forgetting to escape & in URLs inside HTML. href='/search?q=cats&amp;page=2' should have &amp; where the & appears, not a raw &. Browsers are often lenient about this, but validators will flag it and some parsers will misread the attribute. The second common mistake is over-escaping — converting every apostrophe, dash, and quote to an entity when the character could just be typed directly with a UTF-8 encoded file.",
      },
    ],
  },
  {
    slug: "unix-file-permissions-explained",
    title: "Unix File Permissions Explained",
    date: "2026-01-14",
    excerpt:
      "The rwxr-xr-x you see in ls output is not arbitrary — it encodes a precise permission model. This guide explains what it means and how to use chmod correctly.",
    content: [
      {
        type: "p",
        text: "Every file and directory on a Unix or Linux system has an associated set of permissions that control who can read, write, or execute it. When you run ls -l, you see a string like -rwxr-xr-x at the start of each line. Understanding this notation — and the underlying permission model — is essential for any developer or system administrator working with Unix-like systems.",
      },
      {
        type: "h2",
        text: "The Permission String",
      },
      {
        type: "p",
        text: "The permission string has ten characters. The first character indicates the file type: - for a regular file, d for a directory, l for a symbolic link. The remaining nine characters are three groups of three, representing permissions for the owner, the group, and everyone else (other). Each group has three bits: r (read), w (write), and x (execute). A dash in a position means that permission is not granted.",
      },
      {
        type: "ul",
        items: [
          "r (read): view file contents or list directory contents.",
          "w (write): modify file contents or create/delete files in a directory.",
          "x (execute): run a file as a program, or enter a directory with cd.",
          "Owner (user): the user who owns the file.",
          "Group: users who belong to the file's group.",
          "Other: everyone else on the system.",
        ],
      },
      {
        type: "h2",
        text: "Octal Notation",
      },
      {
        type: "p",
        text: "Each permission group maps to a 3-bit number. Read is 4 (binary 100), write is 2 (binary 010), execute is 1 (binary 001). Add them together to get the octal digit for each group. rwx is 4+2+1=7, r-x is 4+0+1=5, r-- is 4+0+0=4. The full permission string rwxr-xr-x becomes 755. This octal notation is what you use with chmod: chmod 755 script.sh sets those permissions.",
      },
      {
        type: "h2",
        text: "Common Permission Patterns",
      },
      {
        type: "ul",
        items: [
          "644 (-rw-r--r--): owner can read/write; others can only read. Standard for web files and config files.",
          "755 (-rwxr-xr-x): owner can read/write/execute; others can read/execute. Standard for scripts and directories.",
          "600 (-rw-------): only the owner can read/write. Used for private key files (SSH keys).",
          "700 (-rwx------): only the owner has any access. Used for private directories.",
          "777 (-rwxrwxrwx): everyone has full access. Avoid this; it is a security risk.",
        ],
      },
      {
        type: "h2",
        text: "Symbolic chmod Syntax",
      },
      {
        type: "p",
        text: "chmod also accepts symbolic notation: chmod u+x script.sh adds execute permission for the owner (u). chmod go-w file.txt removes write permission from group and other. chmod a+r file.txt adds read permission for all. The letters are u (user/owner), g (group), o (other), and a (all). The operators are + (add), - (remove), and = (set exactly). Symbolic notation is easier to read than octal for incremental changes.",
      },
      {
        type: "h2",
        text: "Directory Permissions",
      },
      {
        type: "p",
        text: "Directory permissions work differently from file permissions. Read on a directory allows listing its contents (ls). Write on a directory allows creating, deleting, and renaming files inside it — regardless of the permissions on those files. Execute on a directory allows entering it and accessing files inside it by path. You can have a directory where you can enter it (x) and access files by name but cannot list what is inside (no r). This is used to share specific files without exposing the full directory listing.",
      },
    ],
  },
  {
    slug: "how-qr-codes-work",
    title: "How QR Codes Work",
    date: "2026-01-21",
    excerpt:
      "QR codes are everywhere, but how do they actually store and encode data? This guide explains the structure, error correction, and encoding behind the ubiquitous black-and-white squares.",
    content: [
      {
        type: "p",
        text: "QR codes (Quick Response codes) are two-dimensional barcodes that can store significantly more data than the one-dimensional barcodes on product packaging. A QR code can encode a URL, contact information, Wi-Fi credentials, or any short text string. Smartphones can decode them instantly using the camera. Understanding how they work illuminates a piece of engineering that is both elegant and clever.",
      },
      {
        type: "h2",
        text: "The Structure of a QR Code",
      },
      {
        type: "p",
        text: "A QR code is a square grid of black and white modules (pixels). The three large square patterns in the corners are finder patterns — they allow a scanner to locate and orient the code even if it is photographed at an angle. The small square near the bottom-right is the alignment pattern, used to correct for image distortion. Timing patterns (alternating black and white modules running between the finder patterns) help the scanner determine the module grid. All of these are fixed; the remaining modules encode the actual data.",
      },
      {
        type: "h2",
        text: "How Data Is Encoded",
      },
      {
        type: "p",
        text: "QR codes support several encoding modes optimized for different content. Numeric mode stores digits 0–9 using approximately 3.3 bits per character. Alphanumeric mode stores A–Z, 0–9, and a handful of symbols (space, $, %, *, +, -, ., /, :) using about 5.5 bits per character. Byte mode stores arbitrary bytes as 8 bits each, which allows any UTF-8 text. Kanji mode compresses Japanese characters to 13 bits each. The encoder automatically selects the most efficient mode for the input.",
      },
      {
        type: "h2",
        text: "Error Correction",
      },
      {
        type: "p",
        text: "One of the most important features of QR codes is error correction. QR codes use Reed-Solomon error correction, which adds redundant data so the code can be decoded even if part of it is obscured, dirty, or damaged. There are four error correction levels: L (low, recovers 7% damage), M (medium, 15%), Q (quartile, 25%), and H (high, 30%). A higher level means more redundancy and a larger code for the same data. This is why QR codes with logos embedded in the center still scan — the logo covers part of the data, but error correction fills in the gaps.",
      },
      {
        type: "h2",
        text: "QR Code Versions and Capacity",
      },
      {
        type: "p",
        text: "QR codes come in 40 versions, from Version 1 (21×21 modules) to Version 40 (177×177 modules). Each increase in version adds four modules per side. Higher versions can store more data but are larger and harder to scan at small sizes. A Version 1 code with maximum error correction can store only 7 numeric characters. A Version 40 code with minimum error correction can store 7,089 numeric characters or 4,296 alphanumeric characters. For typical use cases — a URL under 100 characters — Version 5 or lower is sufficient.",
      },
      {
        type: "h2",
        text: "Generating and Scanning",
      },
      {
        type: "p",
        text: "QR code generation is entirely client-side — no network request is needed, and the generated code never leaves the user's device. Modern browsers can generate QR codes using JavaScript libraries that implement the encoding and Reed-Solomon math directly. Scanning is handled by the device camera and image processing; the scanner locates the finder patterns, extracts the grid, decodes the data, and applies error correction to recover the payload.",
      },
    ],
  },
  {
    slug: "markdown-syntax-guide",
    title: "Markdown Syntax Guide: Everything You Need to Know",
    date: "2026-01-28",
    excerpt:
      "Markdown is the writing format of the web — used in GitHub, documentation sites, note-taking apps, and chat platforms. This guide covers the full syntax with examples.",
    content: [
      {
        type: "p",
        text: "Markdown is a lightweight markup language that converts plain text to HTML. Invented by John Gruber in 2004, it was designed to be readable as plain text while also being easily converted to formatted HTML. Today it is the default writing format for GitHub READMEs, documentation, Stack Overflow answers, Reddit posts, Slack messages, and countless other platforms. Learning Markdown is one of the highest-leverage writing skills for developers.",
      },
      {
        type: "h2",
        text: "Headings and Paragraphs",
      },
      {
        type: "p",
        text: "Headings are created with hash signs: # for H1, ## for H2, up to ###### for H6. Leave a blank line between paragraphs — a single line break within a paragraph is treated as a space, not a new paragraph. This mirrors how HTML block elements work.",
      },
      {
        type: "h2",
        text: "Inline Formatting",
      },
      {
        type: "ul",
        items: [
          "Bold: **bold text** or __bold text__",
          "Italic: *italic text* or _italic text_",
          "Bold and italic: ***bold italic*** or ___bold italic___",
          "Strikethrough: ~~strikethrough~~ (supported in GFM)",
          "Inline code: `code` — rendered in a monospace font",
          "Links: [link text](https://example.com)",
          "Images: ![alt text](image.png)",
        ],
      },
      {
        type: "h2",
        text: "Lists",
      },
      {
        type: "p",
        text: "Unordered lists use -, *, or + as bullet markers. Ordered lists use numbers followed by a period. The actual numbers do not matter — Markdown will render them in sequence regardless. Lists can be nested by indenting with two or four spaces. A blank line before a list item makes it a 'loose' list, which wraps each item in a paragraph tag.",
      },
      {
        type: "h2",
        text: "Code Blocks",
      },
      {
        type: "p",
        text: "Inline code uses single backticks: `code`. Code blocks use triple backticks (fenced code blocks) with an optional language identifier for syntax highlighting: ```javascript. Alternatively, indent each line of a code block by four spaces. Fenced code blocks are preferred in modern Markdown because they support language specification and work more reliably with surrounding content.",
      },
      {
        type: "h2",
        text: "Tables, Blockquotes, and Horizontal Rules",
      },
      {
        type: "p",
        text: "Tables are a GitHub Flavored Markdown (GFM) extension: columns are separated by |, and the header row is separated from the body by a row of dashes. Colons in the separator row control alignment (left, center, right). Blockquotes use > at the start of a line and can be nested with >>. Horizontal rules are three or more dashes, asterisks, or underscores on a line by themselves.",
      },
      {
        type: "h2",
        text: "Escaping Special Characters",
      },
      {
        type: "p",
        text: "To display a character that Markdown would otherwise interpret as syntax — *, _, #, [, ] — prefix it with a backslash: \\* displays a literal asterisk. This is only necessary when the character appears in a context where Markdown would interpret it. Inside a code span or code block, no escaping is needed — everything is treated as literal text.",
      },
    ],
  },
  {
    slug: "how-version-control-diffs-work",
    title: "How Version Control Diffs Work",
    date: "2026-02-04",
    excerpt:
      "When git shows you a diff, it is doing more than highlighting changes. Understanding the algorithm behind diffs makes you better at reading them and resolving conflicts.",
    content: [
      {
        type: "p",
        text: "A diff is a description of the changes between two versions of a file. When you run git diff or look at a pull request, you see added lines in green (prefixed with +) and removed lines in red (prefixed with -). This output is human-readable, but it is generated by an algorithm that solves a non-trivial problem: given two sequences of lines, find the smallest set of changes that transforms one into the other.",
      },
      {
        type: "h2",
        text: "The Longest Common Subsequence Problem",
      },
      {
        type: "p",
        text: "At the core of most diff algorithms is the Longest Common Subsequence (LCS) problem. Given two sequences, find the longest subsequence of elements that appears in both in the same order (but not necessarily consecutively). The elements that appear in both sequences are the lines that did not change. The elements that appear only in the first sequence are deletions; elements only in the second are additions.",
      },
      {
        type: "p",
        text: "For files with thousands of lines, computing the exact LCS is expensive — the naive algorithm is O(n*m) in time and space. Practical diff tools use optimized algorithms. The Myers diff algorithm, used by git, runs in O(n+d) time where d is the number of differences, making it fast when files are similar (small d) even if they are long.",
      },
      {
        type: "h2",
        text: "The Unified Diff Format",
      },
      {
        type: "p",
        text: "The output format you see from git diff is called unified diff format. It starts with --- (old file) and +++ (new file) headers. Then it shows one or more hunks — sections of the file where changes occur. Each hunk starts with a @@ line that shows the line number ranges in the old and new file, followed by context lines (no prefix), deleted lines (-), and added lines (+). By default, three lines of context are shown around each change.",
      },
      {
        type: "h2",
        text: "Conflict Markers",
      },
      {
        type: "p",
        text: "When git cannot automatically merge two branches because both modify the same region of a file, it inserts conflict markers. <<<<<<< HEAD shows the start of your changes, ======= separates them from the incoming changes, and >>>>>>> branch-name marks the end. Everything between the markers is the content of both versions, and you must edit the file to resolve the conflict by keeping the correct content and removing the markers.",
      },
      {
        type: "h2",
        text: "Word-Level and Character-Level Diffs",
      },
      {
        type: "p",
        text: "Standard git diffs operate at the line level — an entire line is marked as changed even if only one word within it was modified. For prose documents or long lines, this can make changes hard to read. git diff --word-diff computes the diff at the word level, highlighting which words changed within a line. Many code review tools go further and highlight the specific characters that changed within a modified line, which is the most precise way to review small edits.",
      },
    ],
  },
  {
    slug: "understanding-character-encoding",
    title: "Understanding Character Encoding: ASCII, Unicode, and UTF-8",
    date: "2026-02-11",
    excerpt:
      "Character encoding bugs — garbled text, question mark boxes, mojibake — all have the same root cause. This guide explains how character encoding works and how to avoid these problems.",
    content: [
      {
        type: "p",
        text: "If you have ever seen text display as ??? or â€™ instead of an apostrophe, you have encountered a character encoding mismatch. Character encoding is the system that maps characters — letters, digits, symbols, emoji — to binary values that computers can store and transmit. When the encoder and decoder disagree on which system to use, the result is garbled text. Understanding the history and mechanics of encoding fixes this class of bugs permanently.",
      },
      {
        type: "h2",
        text: "ASCII: The Foundation",
      },
      {
        type: "p",
        text: "ASCII (American Standard Code for Information Interchange), defined in 1963, maps 128 characters — uppercase and lowercase English letters, digits, punctuation, and control characters — to 7-bit values (0–127). ASCII is the foundation of nearly every encoding system that came after it. The letter A is 65, a is 97, the digit 0 is 48. ASCII is universal: every modern encoding system agrees on these 128 assignments.",
      },
      {
        type: "h2",
        text: "The Problem With Extended ASCII",
      },
      {
        type: "p",
        text: "The 8th bit in a byte gave room for 128 more characters (128–255), and many competing standards emerged to use that space: ISO-8859-1 (Latin-1) for Western European languages, Windows-1252 for Windows, KOI8-R for Russian. These 'code pages' were incompatible — byte 0x91 meant a curly quote in Windows-1252 and a different character in ISO-8859-1. Documents exchanged between systems displayed wrong characters unless both systems agreed on which code page to use. Asian languages needed even more characters than a single byte could hold and required multi-byte encodings like Shift-JIS and GB2312, which had their own incompatibilities.",
      },
      {
        type: "h2",
        text: "Unicode: One Universal Standard",
      },
      {
        type: "p",
        text: "Unicode assigns a unique number (code point) to every character in every writing system on earth, plus emoji, mathematical symbols, and more — over 140,000 characters in the current standard. Code points are written as U+ followed by a hexadecimal number: A is U+0041, the Euro sign is U+20AC, and the snowman emoji is U+2603. Unicode does not specify how to store these numbers as bytes — that is the role of encoding forms.",
      },
      {
        type: "h2",
        text: "UTF-8: The Dominant Encoding",
      },
      {
        type: "p",
        text: "UTF-8 is a variable-length encoding of Unicode. Characters in the ASCII range (U+0000 to U+007F) are stored as a single byte, identical to ASCII. Characters from U+0080 to U+07FF use two bytes. Characters from U+0800 to U+FFFF use three bytes. Characters above U+FFFF (including most emoji) use four bytes. This design means ASCII text is valid UTF-8, which allowed UTF-8 to be adopted incrementally alongside legacy ASCII systems.",
      },
      {
        type: "p",
        text: "UTF-8 is now the dominant encoding on the web — over 98% of websites use it. Always declare your encoding explicitly: in HTML with <meta charset='UTF-8'>, in HTTP responses with Content-Type: text/html; charset=UTF-8, and in database connections with the appropriate character set setting. When the encoding is not declared, parsers guess, and they sometimes guess wrong.",
      },
      {
        type: "h2",
        text: "Diagnosing Encoding Problems",
      },
      {
        type: "p",
        text: "The pattern â€™ appearing instead of ' is a classic encoding mismatch: the apostrophe was stored as UTF-8 (three bytes: 0xE2 0x80 0x99) and then decoded as Windows-1252, which maps those three bytes to â, €, and ™. If you see this pattern, find where the text crosses a system boundary (file read, database query, HTTP response, email) without an explicit encoding declaration, and add one. The fix is always to declare UTF-8 consistently at every layer: source file, database, HTTP header, and HTML meta tag.",
      },
    ],
  },
  {
    slug: "what-is-a-rest-api",
    title: "What Is a REST API?",
    date: "2026-02-18",
    excerpt:
      "REST is the architectural style behind most of the web's APIs. This guide explains the core principles, HTTP methods, status codes, and what makes an API truly RESTful.",
    content: [
      {
        type: "p",
        text: "REST (Representational State Transfer) is an architectural style for building networked applications, described by Roy Fielding in his 2000 doctoral dissertation. A REST API uses HTTP as its communication protocol and organizes data around resources — things like users, products, or orders — each identified by a URL. REST is not a standard or a protocol; it is a set of constraints that, when followed, produce APIs that are scalable, stateless, and easy to consume.",
      },
      {
        type: "h2",
        text: "Resources and URLs",
      },
      {
        type: "p",
        text: "In a REST API, every piece of data is a resource, and every resource has a unique URL. /users identifies the collection of all users. /users/42 identifies the user with ID 42. /users/42/orders identifies the orders belonging to that user. URLs should be nouns, not verbs — the action is expressed by the HTTP method, not the URL. /users/42/delete is not RESTful; DELETE /users/42 is.",
      },
      {
        type: "h2",
        text: "HTTP Methods",
      },
      {
        type: "ul",
        items: [
          "GET: retrieve a resource or collection. Safe and idempotent — should never modify data.",
          "POST: create a new resource. The response typically includes the new resource with its assigned ID.",
          "PUT: replace a resource entirely. Idempotent — sending the same request twice has the same effect as once.",
          "PATCH: partially update a resource. Send only the fields you want to change.",
          "DELETE: remove a resource. Idempotent — deleting something that does not exist should return 404 or 204, not an error.",
        ],
      },
      {
        type: "h2",
        text: "Status Codes",
      },
      {
        type: "p",
        text: "HTTP status codes communicate the outcome of a request. The 2xx range indicates success: 200 OK (generic success), 201 Created (new resource created), 204 No Content (success with no body, common for DELETE). The 4xx range indicates client errors: 400 Bad Request (malformed input), 401 Unauthorized (authentication required), 403 Forbidden (authenticated but not allowed), 404 Not Found, 422 Unprocessable Entity (validation failure). The 5xx range indicates server errors: 500 Internal Server Error, 503 Service Unavailable.",
      },
      {
        type: "h2",
        text: "Statelessness",
      },
      {
        type: "p",
        text: "A core REST constraint is that each request must contain all the information needed to process it — the server does not store session state between requests. Authentication credentials or tokens must be sent with every request. This makes REST APIs horizontally scalable: any server can handle any request without needing access to session storage. Statelessness also makes APIs easier to test and debug, since each request is self-contained.",
      },
      {
        type: "h2",
        text: "REST vs. GraphQL vs. gRPC",
      },
      {
        type: "p",
        text: "GraphQL lets clients specify exactly which fields they need, reducing over-fetching and under-fetching. It is a good fit for complex, relationship-heavy data graphs and clients with varying data needs (mobile vs. web). gRPC uses Protocol Buffers for efficient binary serialization and is suited for high-performance internal service communication. REST remains the right default for public APIs, browser-consumed APIs, and any situation where HTTP's caching, tooling, and ubiquitous support are valuable.",
      },
    ],
  },
  {
    slug: "dns-explained",
    title: "DNS Explained: How Your Browser Finds Websites",
    date: "2026-02-25",
    excerpt:
      "Every time you type a URL, DNS translates it to an IP address. This guide explains the full resolution process, record types, and why DNS problems cause so much internet trouble.",
    content: [
      {
        type: "p",
        text: "DNS (Domain Name System) is the internet's phone book. When you type quicktoolsonline.org into your browser, DNS translates that human-readable name into the numeric IP address of the server that hosts it — something like 76.76.21.21. Without DNS, you would need to remember IP addresses for every website you visit. The translation process happens in milliseconds and involves multiple servers working together.",
      },
      {
        type: "h2",
        text: "The Resolution Process",
      },
      {
        type: "p",
        text: "When your browser needs to resolve a domain, it first checks its local cache. If the answer is there and has not expired, it is used immediately. Otherwise, the request goes to a recursive resolver — usually provided by your ISP or a public resolver like 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare). The recursive resolver does the heavy lifting: it queries the root name servers to find the authoritative server for the top-level domain (.org, .com), then queries that server to find the authoritative server for the second-level domain (quicktoolsonline.org), then queries that server for the final IP address.",
      },
      {
        type: "h2",
        text: "DNS Record Types",
      },
      {
        type: "ul",
        items: [
          "A record: maps a domain to an IPv4 address. The most common record type.",
          "AAAA record: maps a domain to an IPv6 address.",
          "CNAME record: alias from one domain to another. Cannot coexist with other records at the same name.",
          "MX record: specifies mail servers for the domain, with priority values.",
          "TXT record: stores arbitrary text. Used for domain verification, SPF, DKIM, and other policies.",
          "NS record: specifies the authoritative name servers for the domain.",
          "SOA record: Start of Authority — metadata about the zone, including the primary name server and TTL defaults.",
        ],
      },
      {
        type: "h2",
        text: "TTL and Caching",
      },
      {
        type: "p",
        text: "Every DNS record has a TTL (Time to Live) value, in seconds, that tells resolvers how long to cache the answer. A TTL of 3600 means the record can be cached for one hour before the resolver must query again. Short TTLs (60–300 seconds) allow rapid propagation of changes — useful when you are migrating a site and need to cut over quickly. Long TTLs (86400 seconds = one day) reduce DNS query load and improve response time for users, but mean changes take longer to propagate worldwide. When preparing for a migration, lower the TTL days in advance so the change propagates quickly when you make it.",
      },
      {
        type: "h2",
        text: "Why DNS Problems Are Frustrating",
      },
      {
        type: "p",
        text: "DNS problems feel mysterious because the effects are delayed and inconsistent. When you update a DNS record, resolvers around the world continue serving the old answer until their cached copy expires. Two users in different cities can get different answers for the same domain at the same time, depending on which resolver they use and when its cache was last refreshed. Tools like dig and nslookup let you query specific resolvers to see what they are returning, which helps diagnose propagation issues.",
      },
      {
        type: "h2",
        text: "DNS Security",
      },
      {
        type: "p",
        text: "Classic DNS queries are sent in plaintext UDP, which means they can be observed and spoofed. DNS spoofing (cache poisoning) inserts false records into a resolver's cache, redirecting users to malicious servers. DNSSEC adds cryptographic signatures to DNS records so resolvers can verify they have not been tampered with. DNS-over-HTTPS (DoH) and DNS-over-TLS (DoT) encrypt the query itself so observers cannot see which domains you are resolving. Major browsers and operating systems increasingly support DoH by default.",
      },
    ],
  },
];
