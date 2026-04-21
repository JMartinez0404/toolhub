import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_NAME}. How we handle data, cookies, and third-party advertising.`,
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
        Privacy Policy
      </h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        Last updated: April 16, 2026
      </p>

      <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Overview
          </h2>
          <p>
            {SITE_NAME} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;)
            operates the website at{" "}
            <a
              href={SITE_URL}
              className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
            >
              {SITE_URL.replace(/^https?:\/\//, "")}
            </a>
            . This policy explains what information is and is not collected when
            you visit the site and use the tools we provide.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            What data we collect
          </h2>
          <p>
            The tools on this site run entirely in your web browser. We do not
            collect, store, or transmit any text, passwords, files, images, or
            other input you enter into the tools. That content never leaves your
            device. We do not operate user accounts, and we do not require
            signup or login.
          </p>
          <p className="mt-2">
            We do not sell personal information.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Third-party advertising
          </h2>
          <p>
            We use Google AdSense, a third-party advertising service provided by
            Google LLC, to display advertisements on this site.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              Third-party vendors, including Google, use cookies and similar
              technologies to serve ads based on a user&apos;s prior visits to
              this website and other websites on the internet.
            </li>
            <li>
              Google&apos;s use of advertising cookies enables it and its
              partners to serve ads to users based on their visits to this site
              and/or other sites on the internet.
            </li>
            <li>
              You may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
              >
                Google Ads Settings
              </a>
              , or opt out of a third-party vendor&apos;s use of cookies for
              personalized advertising at{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
              >
                aboutads.info/choices
              </a>
              .
            </li>
            <li>
              More information about how Google uses data from this site is
              available in Google&apos;s{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
              >
                &ldquo;How Google uses information from sites or apps that use
                our services&rdquo;
              </a>{" "}
              page and the{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
              >
                Google Advertising Policies
              </a>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Cookies
          </h2>
          <p>
            {SITE_NAME} itself does not set first-party cookies for tracking or
            profiling. Third-party services embedded on this site, including
            Google AdSense, may set cookies for ad personalization, frequency
            capping, fraud prevention, and measurement. You can manage or block
            cookies in your browser&apos;s privacy settings at any time.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Analytics
          </h2>
          <p>
            We may use privacy-friendly analytics to understand how pages on the
            site are used in aggregate (for example, which tools are most
            visited). Any data collected in this way is aggregated and does not
            identify individual visitors.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Visitors in the EEA, United Kingdom, and Switzerland (GDPR)
          </h2>
          <p>
            If you are located in the European Economic Area, the United
            Kingdom, or Switzerland, the General Data Protection Regulation
            (GDPR) and equivalent laws give you rights over your personal data,
            including the right to access, correct, delete, restrict processing,
            and object to processing.
          </p>
          <p className="mt-2">
            Where ads are personalized, Google and its partners rely on consent
            as the legal basis, collected through a Google-certified Consent
            Management Platform when you first visit the site. You can withdraw
            consent at any time using the same consent interface or your
            browser&apos;s cookie controls. Non-personalized ads, which rely on
            contextual signals rather than profiling, may still be shown.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Visitors in California (CCPA / CPRA)
          </h2>
          <p>
            California residents have the right under the California Consumer
            Privacy Act (as amended by the CPRA) to know what personal
            information is collected, to request deletion, to correct
            inaccurate information, and to opt out of the sale or sharing of
            personal information. {SITE_NAME} does not sell personal
            information. To exercise any of these rights, use the contact
            method below.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Children&apos;s privacy
          </h2>
          <p>
            This site is not directed to children under 13, and we do not
            knowingly collect personal information from children under 13. If
            you believe a child has provided personal information, please
            contact us and we will take steps to remove that information.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Changes to this policy
          </h2>
          <p>
            We may update this privacy policy from time to time to reflect
            changes to our services or to legal requirements. When we do, we
            will update the &ldquo;Last updated&rdquo; date at the top of this
            page. Material changes will be highlighted on the site.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Contact
          </h2>
          <p>
            Questions or privacy requests can be raised by opening an issue on
            the project&apos;s public GitHub repository at{" "}
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
        </section>
      </div>
    </div>
  );
}
