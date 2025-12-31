export interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  company: string;
  blog: string;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
}

export interface Repository {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  archived: boolean;
  fork: boolean;
}

export interface Commit {
  sha: string;
  message: string;
  author: string;
  email: string;
  date: string;
  url: string;
  repo: string;
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

export interface GitHubStats {
  profile: GitHubProfile;
  repositories: Repository[];
  contributions: ContributionWeek[];
  languages: LanguageStats[];
  streak: StreakStats;
  updatedAt: string;
}

export interface SearchResult {
  query: string;
  count: number;
  results: Commit[];
}
