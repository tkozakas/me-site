"use client";

import { useState, useEffect } from "react";
import type { ContributionWeek } from "@/lib/types";
import { getUserContributions } from "@/lib/api";

interface ContributionGraphProps {
  contributions: ContributionWeek[];
  username: string;
  totalContributions?: number;
  createdAt?: string;
}

const levelColors = [
  "bg-neutral-800",
  "bg-emerald-900",
  "bg-emerald-700",
  "bg-emerald-500",
  "bg-emerald-400",
];

export function ContributionGraph({
  contributions: initialContributions,
  username,
  totalContributions: initialTotal,
  createdAt,
}: ContributionGraphProps) {
  const currentYear = new Date().getFullYear();
  const startYear = createdAt ? new Date(createdAt).getFullYear() : 2008;
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => currentYear - i
  );

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [contributions, setContributions] = useState(initialContributions);
  const [totalContributions, setTotalContributions] = useState(initialTotal ?? 0);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (selectedYear === null) {
      setContributions(initialContributions);
      setTotalContributions(initialTotal ?? 0);
      return;
    }

    setLoading(true);
    getUserContributions(username, selectedYear)
      .then((data) => {
        setContributions(data.contributions);
        setTotalContributions(data.totalContributions);
      })
      .catch((err) => {
        console.error("Failed to fetch contributions:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedYear, username, initialContributions, initialTotal]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-dropdown]")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (!contributions?.length && !loading) return null;

  const recentWeeks = contributions.slice(-52);

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-neutral-200">
            Contribution Activity
          </h2>
          {totalContributions > 0 && (
            <span className="rounded-full bg-emerald-900/50 px-2.5 py-0.5 text-sm text-emerald-400">
              {totalContributions.toLocaleString()} contributions
            </span>
          )}
        </div>
        <div className="relative" data-dropdown>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-sm text-neutral-200 transition-colors hover:border-neutral-600"
          >
            <span>{selectedYear ?? "Last 12 months"}</span>
            <svg
              className={`h-4 w-4 text-neutral-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 z-50 mt-2 max-h-64 w-40 overflow-y-auto rounded-lg border border-neutral-700 bg-neutral-800">
              <button
                onClick={() => {
                  setSelectedYear(null);
                  setDropdownOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-neutral-700 ${
                  selectedYear === null ? "bg-neutral-700 text-emerald-400" : "text-neutral-200"
                }`}
              >
                Last 12 months
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                    setDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-neutral-700 ${
                    selectedYear === year ? "bg-neutral-700 text-emerald-400" : "text-neutral-200"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex h-24 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <div className="flex gap-1">
              {recentWeeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.days.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`h-3 w-3 rounded-sm ${levelColors[day.level]} transition-all hover:scale-125`}
                      title={`${day.date}: ${day.count} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end gap-2 text-xs text-neutral-500">
            <span>Less</span>
            {levelColors.map((color, i) => (
              <div key={i} className={`h-3 w-3 rounded-sm ${color}`} />
            ))}
            <span>More</span>
          </div>
        </>
      )}
    </div>
  );
}
