package github

import "time"

type Profile struct {
	Login       string `json:"login"`
	Name        string `json:"name"`
	AvatarURL   string `json:"avatar_url"`
	Bio         string `json:"bio"`
	Location    string `json:"location"`
	Company     string `json:"company"`
	Blog        string `json:"blog"`
	Followers   int    `json:"followers"`
	Following   int    `json:"following"`
	PublicRepos int    `json:"public_repos"`
	CreatedAt   string `json:"created_at"`
}

type Repository struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	URL         string `json:"html_url"`
	Stars       int    `json:"stargazers_count"`
	Forks       int    `json:"forks_count"`
	Language    string `json:"language"`
	UpdatedAt   string `json:"updated_at"`
	Fork        bool   `json:"fork"`
	Archived    bool   `json:"archived"`
}

type Commit struct {
	SHA     string    `json:"sha"`
	Message string    `json:"message"`
	Author  string    `json:"author"`
	Email   string    `json:"email"`
	Date    time.Time `json:"date"`
	URL     string    `json:"url"`
	Repo    string    `json:"repo"`
}

type ContributionDay struct {
	Date  string `json:"date"`
	Count int    `json:"count"`
	Level int    `json:"level"`
}

type ContributionWeek struct {
	Days []ContributionDay `json:"days"`
}

type LanguageStats struct {
	Name       string `json:"name"`
	Percentage int    `json:"percentage"`
	Color      string `json:"color"`
}

type StreakStats struct {
	CurrentStreak      int `json:"currentStreak"`
	LongestStreak      int `json:"longestStreak"`
	TotalContributions int `json:"totalContributions"`
}

type Stats struct {
	Profile       Profile            `json:"profile"`
	Repositories  []Repository       `json:"repositories"`
	Contributions []ContributionWeek `json:"contributions"`
	Languages     []LanguageStats    `json:"languages"`
	Streak        StreakStats        `json:"streak"`
	UpdatedAt     time.Time          `json:"updatedAt"`
}
