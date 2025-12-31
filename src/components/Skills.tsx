interface SkillsProps {
  skills: string[];
}

export function Skills({ skills }: SkillsProps) {
  if (skills.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold">Skills</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded bg-neutral-800 px-3 py-1 text-sm text-neutral-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
