import type { GitHubStats, SearchResult } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getStats(language?: string): Promise<GitHubStats> {
  const url = new URL(`${API_URL}/api/stats`);
  if (language) {
    url.searchParams.set("language", language);
  }

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch stats: ${res.statusText}`);
  }

  return res.json();
}

export async function searchCommits(query: string): Promise<SearchResult> {
  const url = new URL(`${API_URL}/api/search`);
  url.searchParams.set("q", query);

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Search failed: ${res.statusText}`);
  }

  return res.json();
}
