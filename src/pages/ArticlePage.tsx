import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { getArticle } from "../api/articles";
import type { Article } from "../shared/types";
import { useMetadata } from "../shared/useMetadata";
import { estimateReadingTimeFromHtml } from "../shared/readingTime";
import { copyToClipboard } from "../shared/copyToClipboard";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();

  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [copied, setCopied] = useState(false);

  const pageUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, []);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    getArticle(slug)
      .then(setArticle)
      .catch((err) => setError(err?.message ?? String(err)))
      .finally(() => setLoading(false));
  }, [slug]);

  useMetadata({
    title: article ? `${article.title} | Mariano Rodríguez` : "Article | Mariano Rodríguez",
    description: article?.summary ?? "",
  });

  const readingTime = article ? estimateReadingTimeFromHtml(article.contentHtml) : 0;

  if (error) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </p>
      </div>
    );
  }

  if (loading || !article) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <div className="h-6 w-40 rounded bg-white/10" />
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="h-8 w-5/6 rounded bg-white/10" />
          <div className="mt-3 h-4 w-48 rounded bg-white/10" />
          <div className="mt-8 space-y-3">
            <div className="h-4 w-full rounded bg-white/10" />
            <div className="h-4 w-11/12 rounded bg-white/10" />
            <div className="h-4 w-10/12 rounded bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:max-w-4xl">
      {/* Back link */}
      <div className="mb-6">
        <Link
          to="/articles"
          className="text-sm text-white/60 transition hover:text-white"
        >
          ← Back to Articles
        </Link>
      </div>

      {/* Article container */}
      <article className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur md:p-8">
        {/* Title */}
        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
          {article.title}
        </h1>

        {/* Meta row */}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/55">
          <span>{article.date}</span>

          {readingTime > 0 && (
            <>
              <span className="text-white/30">·</span>
              <span>{readingTime} min read</span>
            </>
          )}

          <span className="text-white/30">·</span>

          <button
            type="button"
            onClick={onCopyLink}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          >
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>

        {/* Content (readability-tuned typography) */}
        <div
          className={[
            // Typography base (requires @tailwindcss/typography, which you already use)
            "prose prose-invert max-w-none",
            // Responsive reading size
            "prose-base md:prose-lg",
            // Measure + spacing for comfortable reading
            "prose-p:leading-7 md:prose-p:leading-8",
            "prose-p:my-5",
            // Headings: clearer hierarchy + breathing room
            "prose-headings:tracking-tight",
            "prose-h2:mt-12 prose-h2:mb-4",
            "prose-h3:mt-10 prose-h3:mb-3",
            // Links: calm underline
            "prose-a:text-white prose-a:underline prose-a:decoration-white/30 hover:prose-a:decoration-white/70",
            // Lists: slightly more readable
            "prose-ul:my-5 prose-ol:my-5",
            "prose-li:my-1.5",
            // Blockquotes: subtle, readable
            "prose-blockquote:border-l-white/15 prose-blockquote:text-white/75 prose-blockquote:not-italic",
            // Horizontal rules
            "prose-hr:border-white/10",
            // Inline code: readable, not too loud
            "prose-code:text-white prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
            "prose-code:before:content-none prose-code:after:content-none",
            // Code blocks
            "prose-pre:border prose-pre:border-white/10 prose-pre:bg-black/30",
            "prose-pre:rounded-xl prose-pre:px-4 prose-pre:py-3",
            "prose-pre:overflow-x-auto",
            // Tables (if any)
            "prose-table:border-collapse",
            "prose-th:border prose-th:border-white/10 prose-th:bg-white/5 prose-th:p-2",
            "prose-td:border prose-td:border-white/10 prose-td:p-2",
          ].join(" ")}
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
      </article>

      {/* Small bottom breathing room on mobile */}
      <div className="h-8" />
    </div>
  );

  async function onCopyLink() {
    try {
      await copyToClipboard(pageUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // noop
    }
  }
}
