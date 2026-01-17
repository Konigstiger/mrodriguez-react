

import { useEffect, useState } from "react";
import { getArticles } from "../api/articles";
import type { ArticleListItem } from "../shared/types";
import { Link } from "react-router-dom";
import { useMetadata } from "../shared/useMetadata";

import { useMemo } from "react";

function safeParseDate(dateStr: string): number | null {
  const t = Date.parse(dateStr);
  return Number.isFinite(t) ? t : null;
}

export default function ArticlesPage() {
  useMetadata({
    title: "Articles | Mariano Rodríguez",
    description:
      "Technical articles about Azure, .NET, React, and building small, maintainable systems.",
  });

  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    getArticles()
      .then(setArticles)
      .catch((err) => setError(err?.message ?? String(err)))
      .finally(() => setLoading(false));
  }, []);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const a of articles) {
      for (const t of a.tags ?? []) set.add(t);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [articles]);

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    let list = [...articles];

    // Sort newest first if parseable
    list.sort((a, b) => {
      const ta = safeParseDate(a.date);
      const tb = safeParseDate(b.date);
      if (ta === null && tb === null) return 0;
      if (ta === null) return 1;
      if (tb === null) return -1;
      return tb - ta;
    });

    if (activeTag) {
      list = list.filter((a) => (a.tags ?? []).includes(activeTag));
    }

    if (normalizedQuery) {
      list = list.filter((a) => {
        const haystack = [
          a.title,
          a.summary,
          (a.tags ?? []).join(" "),
          a.date,
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      });
    }

    return list;
  }, [articles, activeTag, normalizedQuery]);

  function clearFilters() {
    setQuery("");
    setActiveTag(null);
  }

  if (error) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">Articles</h1>
        <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Articles</h1>
        <p className="mt-2 text-sm text-white/60">
          Notes about Azure, .NET, React, and shipping maintainable systems.
        </p>
      </header>

      {/* Controls */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, summary, tags…"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/20"
            />
          </div>

          {(query || activeTag) && (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Tag chips */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {allTags.map((t) => {
              const isActive = activeTag === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveTag(isActive ? null : t)}
                  className={[
                    "rounded-full border px-3 py-1 text-xs transition",
                    isActive
                      ? "border-white/25 bg-white/15 text-white"
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                >
                  {t}
                </button>
              );
            })}
          </div>
        )}

        {/* Result count */}
        {!loading && (
          <div className="text-xs text-white/50">
            Showing <span className="text-white/80">{filtered.length}</span>{" "}
            article{filtered.length === 1 ? "" : "s"}
            {activeTag ? (
              <>
                {" "}
                in <span className="text-white/80">{activeTag}</span>
              </>
            ) : null}
            {normalizedQuery ? (
              <>
                {" "}
                matching <span className="text-white/80">“{query.trim()}”</span>
              </>
            ) : null}
            .
          </div>
        )}
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <div className="h-5 w-2/3 rounded bg-white/10" />
              <div className="mt-3 h-4 w-24 rounded bg-white/10" />
              <div className="mt-4 h-4 w-full rounded bg-white/10" />
              <div className="mt-2 h-4 w-5/6 rounded bg-white/10" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
          No articles found.
          {(query || activeTag) && (
            <>
              {" "}
              Try adjusting your search or{" "}
              <button
                type="button"
                onClick={clearFilters}
                className="underline decoration-white/30 hover:decoration-white/70"
              >
                clear filters
              </button>
              .
            </>
          )}
        </div>
      ) : (
        <ul className="space-y-4">
          {filtered.map((a) => (
            <li
              key={a.slug}
              className="rounded-xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/7"
            >
              <Link
                to={`/articles/${a.slug}`}
                className="text-xl font-semibold tracking-tight hover:underline"
              >
                {a.title}
              </Link>

              <div className="mt-2 text-xs text-white/55">{a.date}</div>

              <p className="mt-3 text-sm leading-6 text-white/75">
                {a.summary}
              </p>

              {a.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {a.tags.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setActiveTag(activeTag === t ? null : t)}
                      className={[
                        "rounded-full border px-2.5 py-1 text-xs transition",
                        activeTag === t
                          ? "border-white/25 bg-white/15 text-white"
                          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
                      ].join(" ")}
                      title="Filter by tag"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
