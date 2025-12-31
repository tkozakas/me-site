import type { LanguageStats } from "@/lib/types";

interface LanguagesProps {
  languages: LanguageStats[];
}

export function Languages({ languages }: LanguagesProps) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
      <h2 className="mb-4 text-lg font-semibold text-neutral-200">Languages</h2>
      <div className="mb-4 flex h-4 overflow-hidden rounded-full">
        {languages.map((lang) => (
          <div
            key={lang.name}
            className="transition-all hover:opacity-80"
            style={{
              width: `${lang.percentage}%`,
              backgroundColor: lang.color,
            }}
            title={`${lang.name}: ${lang.percentage}%`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {languages.map((lang) => (
          <div key={lang.name} className="flex items-center gap-2 text-sm">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: lang.color }}
            />
            <span className="text-neutral-300">{lang.name}</span>
            <span className="text-neutral-500">{lang.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
