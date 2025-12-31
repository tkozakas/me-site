import { getProfile, getDotfilesConfig } from "@/lib/config";
import { Header, Skills, Experience, Projects, Dotfiles } from "@/components";

export default function Home() {
  const profile = getProfile();
  const dotfiles = getDotfilesConfig();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Header
        name={profile.name}
        title={profile.title}
        bio={profile.bio}
        location={profile.location}
        email={profile.email}
        social={profile.social}
      />

      <div className="mt-12 space-y-12">
        <Skills skills={profile.skills} />
        <Dotfiles config={dotfiles} />
        <Experience experience={profile.experience} />
        <Projects projects={profile.projects} />
      </div>

      <footer className="mt-16 border-t border-neutral-800 pt-8 text-center text-sm text-neutral-500">
        Built with Next.js • Source on{" "}
        <a
          href="https://github.com/tkozakas/me-site"
          className="hover:text-neutral-300"
        >
          GitHub
        </a>
      </footer>
    </main>
  );
}
