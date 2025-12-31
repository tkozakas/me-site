import type { Social } from "@/lib/types";

interface HeaderProps {
  name: string;
  title: string;
  bio: string;
  location?: string;
  email?: string;
  social: Social;
}

export function Header({
  name,
  title,
  bio,
  location,
  email,
  social,
}: HeaderProps) {
  return (
    <header className="border-b border-neutral-800 pb-8">
      <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
      <p className="mt-2 text-xl text-neutral-400">{title}</p>
      <p className="mt-4 max-w-2xl text-neutral-300">{bio}</p>

      <div className="mt-6 flex flex-wrap gap-4 text-sm text-neutral-400">
        {location && <span>{location}</span>}
        {email && (
          <a href={`mailto:${email}`} className="hover:text-neutral-100">
            {email}
          </a>
        )}
      </div>

      <div className="mt-4 flex gap-4">
        {social.github && (
          <a
            href={`https://github.com/${social.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-100"
          >
            GitHub
          </a>
        )}
        {social.linkedin && (
          <a
            href={`https://linkedin.com/in/${social.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-100"
          >
            LinkedIn
          </a>
        )}
        {social.twitter && (
          <a
            href={`https://twitter.com/${social.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-100"
          >
            Twitter
          </a>
        )}
        {social.website && (
          <a
            href={social.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-100"
          >
            Website
          </a>
        )}
      </div>
    </header>
  );
}
