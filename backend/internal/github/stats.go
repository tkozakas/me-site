package github

import (
	"fmt"
	"sort"
	"time"
)

func (c *Client) GetProfile() (*Profile, error) {
	var profile Profile
	if err := c.request("/users/"+c.username, &profile); err != nil {
		return nil, err
	}
	return &profile, nil
}

func (c *Client) GetRepositories() ([]Repository, error) {
	var repos []Repository
	if err := c.request(fmt.Sprintf("/users/%s/repos?sort=updated&per_page=100", c.username), &repos); err != nil {
		return nil, err
	}

	var filtered []Repository
	for _, r := range repos {
		if !r.Fork && !r.Archived {
			filtered = append(filtered, r)
		}
	}

	if len(filtered) > 20 {
		filtered = filtered[:20]
	}

	return filtered, nil
}

func (c *Client) GetContributions() ([]ContributionWeek, int, error) {
	query := fmt.Sprintf(`{
		user(login: "%s") {
			contributionsCollection {
				contributionCalendar {
					totalContributions
					weeks {
						contributionDays {
							contributionCount
							date
							contributionLevel
						}
					}
				}
			}
		}
	}`, c.username)

	var result struct {
		Data struct {
			User struct {
				ContributionsCollection struct {
					ContributionCalendar struct {
						TotalContributions int `json:"totalContributions"`
						Weeks              []struct {
							ContributionDays []struct {
								ContributionCount int    `json:"contributionCount"`
								Date              string `json:"date"`
								ContributionLevel string `json:"contributionLevel"`
							} `json:"contributionDays"`
						} `json:"weeks"`
					} `json:"contributionCalendar"`
				} `json:"contributionsCollection"`
			} `json:"user"`
		} `json:"data"`
	}

	if err := c.graphql(query, &result); err != nil {
		return nil, 0, err
	}

	calendar := result.Data.User.ContributionsCollection.ContributionCalendar
	weeks := make([]ContributionWeek, len(calendar.Weeks))

	for i, w := range calendar.Weeks {
		days := make([]ContributionDay, len(w.ContributionDays))
		for j, d := range w.ContributionDays {
			days[j] = ContributionDay{
				Date:  d.Date,
				Count: d.ContributionCount,
				Level: levelToNumber(d.ContributionLevel),
			}
		}
		weeks[i] = ContributionWeek{Days: days}
	}

	return weeks, calendar.TotalContributions, nil
}

func levelToNumber(level string) int {
	levels := map[string]int{
		"NONE":            0,
		"FIRST_QUARTILE":  1,
		"SECOND_QUARTILE": 2,
		"THIRD_QUARTILE":  3,
		"FOURTH_QUARTILE": 4,
	}
	if n, ok := levels[level]; ok {
		return n
	}
	return 0
}

func (c *Client) GetCommits(repo, branch string, since time.Time) ([]Commit, error) {
	endpoint := fmt.Sprintf("/repos/%s/%s/commits?per_page=100", c.username, repo)
	if branch != "" {
		endpoint += "&sha=" + branch
	}
	if !since.IsZero() {
		endpoint += "&since=" + since.Format(time.RFC3339)
	}

	var response []struct {
		SHA    string `json:"sha"`
		Commit struct {
			Message string `json:"message"`
			Author  struct {
				Name  string `json:"name"`
				Email string `json:"email"`
				Date  string `json:"date"`
			} `json:"author"`
		} `json:"commit"`
		HTMLURL string `json:"html_url"`
	}

	if err := c.request(endpoint, &response); err != nil {
		return nil, err
	}

	commits := make([]Commit, len(response))
	for i, r := range response {
		date, _ := time.Parse(time.RFC3339, r.Commit.Author.Date)
		commits[i] = Commit{
			SHA:     r.SHA,
			Message: r.Commit.Message,
			Author:  r.Commit.Author.Name,
			Email:   r.Commit.Author.Email,
			Date:    date,
			URL:     r.HTMLURL,
			Repo:    repo,
		}
	}

	return commits, nil
}

func (c *Client) GetAllCommits(repos []Repository, since time.Time) ([]Commit, error) {
	var allCommits []Commit

	for _, repo := range repos {
		commits, err := c.GetCommits(repo.Name, "", since)
		if err != nil {
			continue
		}
		allCommits = append(allCommits, commits...)
	}

	sort.Slice(allCommits, func(i, j int) bool {
		return allCommits[i].Date.After(allCommits[j].Date)
	})

	return allCommits, nil
}

func (c *Client) GetStats() (*Stats, error) {
	profile, err := c.GetProfile()
	if err != nil {
		return nil, fmt.Errorf("failed to get profile: %w", err)
	}

	repos, err := c.GetRepositories()
	if err != nil {
		return nil, fmt.Errorf("failed to get repositories: %w", err)
	}

	contributions, total, err := c.GetContributions()
	if err != nil {
		return nil, fmt.Errorf("failed to get contributions: %w", err)
	}

	languages := c.CalculateLanguages(repos)
	streak := calculateStreak(contributions, total)

	return &Stats{
		Profile:       *profile,
		Repositories:  repos,
		Contributions: contributions,
		Languages:     languages,
		Streak:        streak,
		UpdatedAt:     time.Now(),
	}, nil
}

func (c *Client) GetLanguagesWithColors() (map[string]string, error) {
	query := fmt.Sprintf(`{
		user(login: "%s") {
			repositories(first: 100, ownerAffiliations: OWNER) {
				nodes {
					languages(first: 10) {
						edges {
							node {
								name
								color
							}
							size
						}
					}
				}
			}
		}
	}`, c.username)

	var result struct {
		Data struct {
			User struct {
				Repositories struct {
					Nodes []struct {
						Languages struct {
							Edges []struct {
								Node struct {
									Name  string `json:"name"`
									Color string `json:"color"`
								} `json:"node"`
								Size int `json:"size"`
							} `json:"edges"`
						} `json:"languages"`
					} `json:"nodes"`
				} `json:"repositories"`
			} `json:"user"`
		} `json:"data"`
	}

	if err := c.graphql(query, &result); err != nil {
		return nil, err
	}

	colors := make(map[string]string)
	for _, repo := range result.Data.User.Repositories.Nodes {
		for _, edge := range repo.Languages.Edges {
			if edge.Node.Color != "" {
				colors[edge.Node.Name] = edge.Node.Color
			}
		}
	}

	return colors, nil
}

func (c *Client) CalculateLanguages(repos []Repository) []LanguageStats {
	langCount := make(map[string]int)
	total := 0

	for _, repo := range repos {
		if repo.Language != "" {
			langCount[repo.Language]++
			total++
		}
	}

	if total == 0 {
		return nil
	}

	colors, err := c.GetLanguagesWithColors()
	if err != nil {
		colors = make(map[string]string)
	}

	var stats []LanguageStats
	for name, count := range langCount {
		color := colors[name]
		if color == "" {
			color = "#8b8b8b"
		}
		stats = append(stats, LanguageStats{
			Name:       name,
			Percentage: (count * 100) / total,
			Color:      color,
		})
	}

	sort.Slice(stats, func(i, j int) bool {
		return stats[i].Percentage > stats[j].Percentage
	})

	return stats
}

func calculateStreak(contributions []ContributionWeek, total int) StreakStats {
	var allDays []ContributionDay
	for _, w := range contributions {
		allDays = append(allDays, w.Days...)
	}

	currentStreak := 0
	longestStreak := 0
	tempStreak := 0

	today := time.Now().Format("2006-01-02")

	sort.Slice(allDays, func(i, j int) bool {
		return allDays[i].Date > allDays[j].Date
	})

	for _, day := range allDays {
		if day.Count > 0 {
			tempStreak++
			if day.Date == today || currentStreak > 0 {
				currentStreak = tempStreak
			}
		} else {
			if tempStreak > longestStreak {
				longestStreak = tempStreak
			}
			tempStreak = 0
			if day.Date < today {
				currentStreak = max(currentStreak, 0)
			}
		}
	}

	if tempStreak > longestStreak {
		longestStreak = tempStreak
	}

	return StreakStats{
		CurrentStreak:      currentStreak,
		LongestStreak:      longestStreak,
		TotalContributions: total,
	}
}
