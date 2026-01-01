import type { ContributionWeek } from "@/lib/types";

interface ContributionGraphProps {
  contributions: ContributionWeek[];
  loading?: boolean;
}

const levelColors = [
  "bg-neutral-800",
  "bg-emerald-900",
  "bg-emerald-700",
  "bg-emerald-500",
  "bg-emerald-400",
];

function ContributionSkeleton() {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
      <div className="mb-4 h-6 w-44 animate-pulse rounded bg-neutral-800" />
      <div className="overflow-x-auto">
        <div className="flex gap-1">
          {Array.from({ length: 52 }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((_, dayIndex) => (
                <div
                  key={dayIndex}
                  className="h-3 w-3 animate-pulse rounded-sm bg-neutral-800"
                  style={{
                    animationDelay: `${(weekIndex * 7 + dayIndex) * 2}ms`,
                    opacity: 0.3 + Math.random() * 0.7,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 text-xs text-neutral-500">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-3 w-3 animate-pulse rounded-sm bg-neutral-800" style={{ animationDelay: `${i * 50}ms` }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

export function ContributionGraph({ contributions, loading }: ContributionGraphProps) {
  if (loading) {
    return <ContributionSkeleton />;
  }

  if (!contributions?.length) return null;

  const recentWeeks = contributions.slice(-52);

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
      <h2 className="mb-4 text-lg font-semibold text-neutral-200">
        Contribution Activity
      </h2>
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
    </div>
  );
}
