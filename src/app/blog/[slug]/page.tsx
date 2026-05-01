import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, type ContentBlock } from "@/lib/blog-posts";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: `${post.title} | ${SITE_NAME}`,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
    },
  };
}

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "p":
      return (
        <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2 key={index} className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-3">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul key={index} className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 mb-4">
          {block.items?.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    case "ol":
      return (
        <ol key={index} className="list-decimal pl-6 space-y-1 text-gray-700 dark:text-gray-300 mb-4">
          {block.items?.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-gray-700 dark:hover:text-gray-200">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-gray-100">{post.title}</span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
        {post.title}
      </h1>
      <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">{post.date}</p>

      <article>{post.content.map((block, i) => renderBlock(block, i))}</article>

      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
        <Link
          href="/blog"
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}
