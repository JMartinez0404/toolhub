import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { tools } from "@/lib/tools-registry";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE_NAME} — a free, fast, privacy-first collection of online utility tools that run entirely in your browser.`,
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
        About {SITE_NAME}
      </h1>
      <div className="space-y-5 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          {SITE_NAME} is a free collection of online utility tools built for
          developers, designers, writers, students, and anyone who needs a
          quick, reliable utility without installing anything. Every tool on
          the site works the moment the page loads, with no signup, no account,
          and no email required.
        </p>

        <h2 className="pt-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Our approach
        </h2>
        <p>
          Every tool on this site runs entirely in your browser. When you paste
          JSON into the formatter, generate a password, or encode a URL, the
          computation happens on your own device using JavaScript. The input
          you type and the output you receive never travel across the network
          to any server we operate. We do not store your data, because we never
          receive it in the first place.
        </p>
        <p>
          This client-side approach has real consequences: we cannot see what
          you generate, we cannot leak what we do not have, and the tools keep
          working even if your connection drops partway through.
        </p>

        <h2 className="pt-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Who runs this site
        </h2>
        <p>
          {SITE_NAME} is built and maintained by an independent developer as an
          open project. The source code is available on GitHub at{" "}
          <a
            href="https://github.com/JMartinez0404/toolhub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
          >
            github.com/JMartinez0404/toolhub
          </a>
          , so you can read exactly what each tool does before you use it.
        </p>

        <h2 className="pt-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
          How the site is funded
        </h2>
        <p>
          Hosting, a domain name, and development time cost money. To keep the
          site free and the tools unrestricted, we display ads through Google
          AdSense. Ads are clearly labelled and separated from the tool
          interface. We do not use affiliate links inside the tools themselves,
          and we do not sell visitor data. Full details are in our{" "}
          <Link
            href="/privacy"
            className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
          >
            privacy policy
          </Link>
          .
        </p>

        <h2 className="pt-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
          What is available today
        </h2>
        <p>
          There are currently {tools.length} tools on the site, split across
          generators, converters, formatters, and text utilities:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          {tools.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/tools/${tool.slug}`}
                className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
              >
                {tool.name}
              </Link>
              {" — "}
              {tool.shortDescription}
            </li>
          ))}
        </ul>

        <h2 className="pt-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
          What is coming
        </h2>
        <p>
          New tools are added as they are requested or as gaps become obvious.
          The roadmap is not fixed. If there is a utility you wish existed on a
          site like this, open an issue on the GitHub repository and it will be
          considered.
        </p>

        <h2 className="pt-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Contact
        </h2>
        <p>
          The best way to report a bug, request a tool, or raise a privacy
          question is to open an issue at{" "}
          <a
            href="https://github.com/JMartinez0404/toolhub/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
          >
            github.com/JMartinez0404/toolhub/issues
          </a>
          .
        </p>
      </div>
    </div>
  );
}
