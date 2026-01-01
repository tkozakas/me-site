package search

import (
	"strings"
	"sync"

	"me-site/backend/internal/github"
)

type Index struct {
	mu      sync.RWMutex
	ready   bool
	commits []github.Commit
}

var globalIndex = &Index{}

func BuildIndex(commits []github.Commit) error {
	globalIndex.mu.Lock()
	defer globalIndex.mu.Unlock()

	globalIndex.commits = commits
	globalIndex.ready = true
	return nil
}

func IsIndexReady() bool {
	globalIndex.mu.RLock()
	defer globalIndex.mu.RUnlock()
	return globalIndex.ready
}

func FilterCommits(commits []github.Commit, query string) ([]github.Commit, error) {
	if query == "" {
		return commits, nil
	}

	globalIndex.mu.RLock()
	defer globalIndex.mu.RUnlock()

	if globalIndex.ready && len(globalIndex.commits) > 0 {
		commits = globalIndex.commits
	}

	return filterSimple(commits, query), nil
}

func filterSimple(commits []github.Commit, query string) []github.Commit {
	query = strings.ToLower(query)
	var results []github.Commit

	for _, c := range commits {
		if strings.Contains(strings.ToLower(c.Message), query) ||
			strings.Contains(strings.ToLower(c.Repo), query) ||
			strings.Contains(strings.ToLower(c.Author), query) {
			results = append(results, c)
		}
	}

	return results
}
