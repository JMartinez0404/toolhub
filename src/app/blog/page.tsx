import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog",
  description: `Articles about developer tools, encoding, security, and web development — from the ${SITE_NAME} team.`,
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-3 text-3xl font-bold text-gray-900 dark:text-gray-100">Blog</h1>
      <p className="mb-10 text-gray-600 dark:text-gray-400">
        Practical articles about developer tools, encoding, security, and the web.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-lg border border-gray-200 p-5 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
          >
            <p className="mb-1 text-xs text-gray-400 dark:text-gray-500">{post.date}</p>
            <h2 className="mb-2 font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400 leading-snug">
              {post.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{post.excerpt}</p>
            <span className="mt-3 inline-block text-sm text-blue-600 dark:text-blue-400">Read more →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
