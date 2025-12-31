"use client";

import { useState } from "react";
import type { Commit } from "@/lib/types";

interface SearchBarProps {
  onResults: (results: Commit[]) => void;
}

export function SearchBar({ onResults }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const res = await fetch(
        `${apiUrl}/api/search?q=${encodeURIComponent(query)}`
      );
      if (res.ok) {
        const data = await res.json();
        onResults(data.results || []);
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search commits..."
        className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 pl-10 text-neutral-100 placeholder-neutral-500 outline-none transition-all focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600"
      />
      <svg
        className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-600 border-t-neutral-300" />
        </div>
      )}
    </form>
  );
}
