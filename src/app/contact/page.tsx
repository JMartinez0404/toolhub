import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${SITE_NAME} team. Report a bug, request a new tool, or ask a question.`,
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Contact</h1>

      <div className="space-y-5 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          Have a question, found a bug, or want to request a new tool? We would
          love to hear from you. The best ways to reach us are listed below.
        </p>

        <h2 className="pt-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Report a bug or request a feature
        </h2>
        <p>
          The fastest way to get a response is to open an issue on GitHub. This
          keeps bug reports and feature requests public and trackable so other
          users can follow along and add their input.
        </p>
        <p>
          <a
            href="https://github.com/JMartinez0404/toolhub/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Open an issue on GitHub →
          </a>
        </p>

        <h2 className="pt-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Email
        </h2>
        <p>
          For privacy-related inquiries or anything you would prefer not to
          discuss publicly, you can reach us by email at{" "}
          <a
            href="mailto:thecowboycat44@gmail.com"
            className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
          >
            thecowboycat44@gmail.com
          </a>
          . We aim to respond within a few business days.
        </p>

        <h2 className="pt-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Suggest a tool
        </h2>
        <p>
          {SITE_NAME} grows based on what users actually need. If there is a
          utility you wish existed here, open an issue on GitHub with the title
          &ldquo;Tool request: [name]&rdquo; and describe what you want it to do.
          Popular requests are prioritised.
        </p>

        <h2 className="pt-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Privacy questions
        </h2>
        <p>
          All tools on this site run entirely in your browser — no data you enter
          is sent to our servers. If you have a question about how the site
          handles data, please read our{" "}
          <Link
            href="/privacy"
            className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
          >
            privacy policy
          </Link>{" "}
          first. If your question is not answered there, send us an email.
        </p>
      </div>
    </div>
  );
}
