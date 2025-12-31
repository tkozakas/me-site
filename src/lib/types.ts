export interface GitHubProfile {
  login: string;
  name: string;
  avatarUrl: string;
  bio: string;
  location: string;
  company: string;
  blog: string;
  followers: number;
  following: number;
  publicRepos: number;
  createdAt: string;
}

export interface Repository {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  updatedAt: string;
  isArchived: boolean;
  isFork: boolean;
}

export interface Commit {
  sha: string;
  message: string;
  repo: string;
  date: string;
  url: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface LanguageStats {
  name: string;
  percentage: number;
  color: string;
}

export interface StreakStats {
  currentStreak: number;
  longestStreak: number;
  totalContributions: number;
}

export interface GitHubData {
  profile: GitHubProfile;
  repositories: Repository[];
  recentCommits: Commit[];
  contributions: ContributionWeek[];
  languages: LanguageStats[];
  streak: StreakStats;
}
