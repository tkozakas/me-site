import { getGitHubData } from "@/lib/github";
import {
  Profile,
  ContributionGraph,
  TopRepos,
  Languages,
  RecentCommits,
  StreakStats,
} from "@/components";

export default async function Home() {
  const data = await getGitHubData();

  return (
    <main className="min-h-screen bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Profile profile={data.profile} />

        <div className="mt-12 space-y-8">
          <StreakStats streak={data.streak} />
          <ContributionGraph contributions={data.contributions} />

          <div className="grid gap-8 lg:grid-cols-2">
            <Languages languages={data.languages} />
            <RecentCommits commits={data.recentCommits} />
          </div>

          <TopRepos repositories={data.repositories} />
        </div>

        <footer className="mt-20 border-t border-neutral-900 pt-8 text-center text-sm text-neutral-600">
          <a
            href={`https://github.com/${data.profile.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-neutral-400"
          >
            @{data.profile.login}
          </a>
        </footer>
      </div>
    </main>
  );
}
