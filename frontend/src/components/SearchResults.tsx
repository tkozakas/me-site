"use client";

import type { Commit } from "@/lib/types";

interface SearchResultsProps {
  results: Commit[];
  onClose: () => void;
}

export function SearchResults({ results, onClose }: SearchResultsProps) {
  if (results.length === 0) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  const firstLine = (msg: string) => msg.split("\n")[0].trim();

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/95 p-4 backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-neutral-400">
          {results.length} result{results.length !== 1 ? "s" : ""}
        </span>
        <button
          onClick={onClose}
          className="text-neutral-500 hover:text-neutral-300"
        >
          ✕
        </button>
      </div>
      <div className="max-h-96 space-y-2 overflow-y-auto">
        {results.map((commit) => (
          <a
            key={commit.sha}
            href={commit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border border-neutral-800 p-3 transition-colors hover:border-neutral-700 hover:bg-neutral-800/50"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-neutral-200">
                  {firstLine(commit.message)}
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
                  <span className="font-mono">{commit.sha.slice(0, 7)}</span>
                  <span>•</span>
                  <span>{commit.repo}</span>
                  <span>•</span>
                  <span>{formatDate(commit.date)}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
