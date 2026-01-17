// articles.ts
import type { Article, ArticleListItem } from "../shared/types";
import { API_BASE_URL } from "../config";

/* ---------- URL helpers ---------- */

function joinUrl(base: string, path: string) {
  const b = (base ?? "").trim();
  if (!b) return path.startsWith("/") ? path : `/${path}`;
  return `${b.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

async function readErrorBody(res: Response) {
  try {
    const text = await res.text();
    return text ? text.slice(0, 800) : "";
  } catch {
    return "";
  }
}

/* ---------- Normalization ---------- */

function normalizeArticleListItem(raw: any): ArticleListItem {
  return {
    slug: typeof raw?.slug === "string" ? raw.slug : "",
    title: typeof raw?.title === "string" ? raw.title : "",
    date: typeof raw?.date === "string" ? raw.date : "",
    summary: typeof raw?.summary === "string" ? raw.summary : "",
    tags: Array.isArray(raw?.tags)
      ? raw.tags.filter((t: unknown): t is string => typeof t === "string")
      : [],
  };
}

function normalizeArticle(raw: any): Article {
  return {
    ...normalizeArticleListItem(raw),
    contentHtml: typeof raw?.contentHtml === "string" ? raw.contentHtml : "",
  };
}

function coerceListPayload(raw: any): any[] {
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.items)) return raw.items; // common API shape
  if (raw && Array.isArray(raw.value)) return raw.value; // another common shape
  return [];
}

/* ---------- Public API ---------- */

export async function getArticles(): Promise<ArticleListItem[]> {
  const url = joinUrl(API_BASE_URL ?? "", "/api/articles");
  let res: Response;

  try {
    res = await fetch(url);
  } catch (e: any) {
    throw new Error(`Articles fetch failed (network). URL: ${url}. ${e?.message ?? ""}`);
  }

  if (!res.ok) {
    const body = await readErrorBody(res);
    throw new Error(`Articles fetch failed (${res.status}). URL: ${url}. ${body}`);
  }

  const raw = await res.json();
  return coerceListPayload(raw).map(normalizeArticleListItem);
}

export async function getArticle(slug: string): Promise<Article> {
  const safeSlug = encodeURIComponent(slug);
  const url = joinUrl(API_BASE_URL ?? "", `/api/articles/${safeSlug}`);
  let res: Response;

  try {
    res = await fetch(url);
  } catch (e: any) {
    throw new Error(`Article fetch failed (network). URL: ${url}. ${e?.message ?? ""}`);
  }

  if (!res.ok) {
    const body = await readErrorBody(res);
    throw new Error(`Article fetch failed (${res.status}). URL: ${url}. ${body}`);
  }

  const raw = await res.json();
  return normalizeArticle(raw);
}
