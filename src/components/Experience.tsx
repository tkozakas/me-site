import type { Experience as ExperienceType } from "@/lib/types";

interface ExperienceProps {
  experience: ExperienceType[];
}

export function Experience({ experience }: ExperienceProps) {
  if (experience.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold">Experience</h2>
      <div className="mt-4 space-y-6">
        {experience.map((exp) => (
          <div key={`${exp.company}-${exp.period}`}>
            <div className="flex items-baseline justify-between">
              <h3 className="font-medium">{exp.role}</h3>
              <span className="text-sm text-neutral-500">{exp.period}</span>
            </div>
            <p className="text-neutral-400">{exp.company}</p>
            <p className="mt-2 text-sm text-neutral-300">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
