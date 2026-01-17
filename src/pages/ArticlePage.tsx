import { useParams, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { getArticle } from "../api/articles";
import type { Article } from "../shared/types";
import { useMetadata } from "../shared/useMetadata";
import { estimateReadingTimeFromHtml } from "../shared/readingTime";
import { useMemo } from "react";
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
        getArticle(slug)
            .then(setArticle)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [slug]);


    useMetadata({
        title: article
            ? `${article.title} | Mariano Rodríguez`
            : "Article | Mariano Rodríguez",
        description: article?.summary ?? ""
    });

    const readingTime = article
        ? estimateReadingTimeFromHtml(article.contentHtml)
        : 0;


    if (error) return <p className="text-red-400">{error}</p>;

    if (loading || !article) {
        return (
            <div className="mx-auto w-full max-w-3xl px-4 py-10">
                <div className="h-7 w-2/3 rounded bg-white/10" />
                <div className="mt-3 h-4 w-28 rounded bg-white/10" />
                <div className="mt-8 space-y-3">
                    <div className="h-4 w-full rounded bg-white/10" />
                    <div className="h-4 w-11/12 rounded bg-white/10" />
                    <div className="h-4 w-10/12 rounded bg-white/10" />
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-3xl px-4 py-10">
            <div className="mb-6">
                <Link to="/articles" className="text-sm text-white/60 hover:text-white">
                    ← Back to Articles
                </Link>
            </div>

            <article
                className={[
                    // Typography:
                    "prose prose-invert max-w-none",
                    // Tighter headings:
                    "prose-headings:tracking-tight prose-h1:mb-2 prose-h2:mt-10 prose-h2:mb-3",
                    // Links:
                    "prose-a:text-white prose-a:underline prose-a:decoration-white/30 hover:prose-a:decoration-white/70",
                    // Code blocks:
                    "prose-pre:border prose-pre:border-white/10 prose-pre:bg-black/30",
                    "prose-code:text-white prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
                    "prose-code:before:content-none prose-code:after:content-none",
                    // Lists + hr:
                    "prose-hr:border-white/10",
                ].join(" ")}
            >
                <h1>{article.title}</h1>
                <div className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/55">
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
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70 transition hover:bg-white/10 hover:text-white"
                    >
                        {copied ? "Copied" : "Copy link"}
                    </button>
                </div>


                <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
            </article>
        </div>
    );

    async function onCopyLink() {
        try {
            await copyToClipboard(pageUrl);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1200);
        } catch {
            // If it fails, do nothing (or you can show a tiny error toast later)
        }
    }

}

