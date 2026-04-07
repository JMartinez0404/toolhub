import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_NAME}.`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">Privacy Policy</h1>
      <p className="mb-6 text-sm text-gray-500">Last updated: April 2026</p>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Overview
          </h2>
          <p>
            {SITE_NAME} is committed to protecting your privacy. All tools on
            this site run entirely in your browser. We do not collect, store, or
            transmit any data you enter into our tools.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Data Processing
          </h2>
          <p>
            All processing happens client-side in your web browser. No text,
            passwords, files, or other content you input is ever sent to our
            servers or any third party.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Advertising
          </h2>
          <p>
            We use Google AdSense to display advertisements. Google may use
            cookies to serve ads based on your prior visits to this or other
            websites. You can opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Google Ads Settings
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Analytics
          </h2>
          <p>
            We may use privacy-friendly analytics to understand how our site is
            used. This data is aggregated and does not identify individual
            visitors.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">Cookies</h2>
          <p>
            Our site itself does not set cookies. However, third-party services
            such as Google AdSense may set cookies for ad personalization and
            analytics purposes.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">Contact</h2>
          <p>
            If you have any questions about this privacy policy, please open an
            issue on our GitHub repository.
          </p>
        </section>
      </div>
    </div>
  );
}
