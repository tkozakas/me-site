import type { StreakStats as StreakStatsType } from "@/lib/types";

interface StreakStatsProps {
  streak: StreakStatsType;
}

export function StreakStats({ streak }: StreakStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 text-center">
        <div className="text-4xl font-bold text-emerald-400">
          {streak.currentStreak}
        </div>
        <div className="mt-1 text-sm text-neutral-400">Current Streak</div>
        <div className="text-xs text-neutral-500">days</div>
      </div>
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 text-center">
        <div className="text-4xl font-bold text-amber-400">
          {streak.longestStreak}
        </div>
        <div className="mt-1 text-sm text-neutral-400">Longest Streak</div>
        <div className="text-xs text-neutral-500">days</div>
      </div>
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 text-center">
        <div className="text-4xl font-bold text-blue-400">
          {streak.totalContributions.toLocaleString()}
        </div>
        <div className="mt-1 text-sm text-neutral-400">Total Contributions</div>
        <div className="text-xs text-neutral-500">this year</div>
      </div>
    </div>
  );
}
