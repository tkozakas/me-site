package api

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strings"
	"time"

	"me-site/backend/internal/cache"
	"me-site/backend/internal/github"
	"me-site/backend/internal/search"
)

type Handler struct {
	gh            *github.Client
	store         *cache.Store
	webhookSecret string
}

func NewHandler(gh *github.Client, store *cache.Store, webhookSecret string) *Handler {
	return &Handler{
		gh:            gh,
		store:         store,
		webhookSecret: webhookSecret,
	}
}

func (h *Handler) Health(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("ok"))
}

func (h *Handler) GetStats(w http.ResponseWriter, r *http.Request) {
	stats := h.store.GetStats()
	if stats == nil {
		http.Error(w, "stats not available", http.StatusServiceUnavailable)
		return
	}

	lang := r.URL.Query().Get("language")
	if lang != "" {
		stats = filterStatsByLanguage(stats, lang)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stats)
}

func filterStatsByLanguage(stats *github.Stats, lang string) *github.Stats {
	filtered := *stats
	var repos []github.Repository

	for _, repo := range stats.Repositories {
		if strings.EqualFold(repo.Language, lang) {
			repos = append(repos, repo)
		}
	}

	filtered.Repositories = repos
	return &filtered
}

func (h *Handler) Search(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("q")
	if query == "" {
		http.Error(w, "query parameter 'q' required", http.StatusBadRequest)
		return
	}

	commits := h.store.GetCommits()
	if commits == nil {
		http.Error(w, "commits not indexed yet", http.StatusServiceUnavailable)
		return
	}

	results, err := search.FilterCommits(commits, query)
	if err != nil {
		log.Printf("search error: %v", err)
		http.Error(w, "search failed", http.StatusInternalServerError)
		return
	}

	if len(results) > 50 {
		results = results[:50]
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]any{
		"query":   query,
		"count":   len(results),
		"results": results,
	})
}

func (h *Handler) Webhook(w http.ResponseWriter, r *http.Request) {
	if h.webhookSecret != "" {
		signature := r.Header.Get("X-Hub-Signature-256")
		if signature == "" {
			http.Error(w, "missing signature", http.StatusUnauthorized)
			return
		}

		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "failed to read body", http.StatusBadRequest)
			return
		}

		if !verifySignature(body, signature, h.webhookSecret) {
			http.Error(w, "invalid signature", http.StatusUnauthorized)
			return
		}
	}

	event := r.Header.Get("X-GitHub-Event")
	log.Printf("Received webhook event: %s", event)

	go func() {
		if err := h.RefreshStats(); err != nil {
			log.Printf("Failed to refresh stats: %v", err)
		}
	}()

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("ok"))
}

func (h *Handler) RefreshStats() error {
	log.Println("Refreshing GitHub stats...")

	stats, err := h.gh.GetStats()
	if err != nil {
		return err
	}

	h.store.SetStats(stats)

	since := time.Now().AddDate(0, -3, 0)
	commits, err := h.gh.GetAllCommits(stats.Repositories, since)
	if err != nil {
		log.Printf("Warning: failed to fetch commits: %v", err)
	} else {
		h.store.SetCommits(commits)
		log.Printf("Indexed %d commits", len(commits))
	}

	log.Println("Stats refreshed successfully")
	return nil
}

func verifySignature(payload []byte, signature, secret string) bool {
	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write(payload)
	expected := "sha256=" + hex.EncodeToString(mac.Sum(nil))
	return hmac.Equal([]byte(expected), []byte(signature))
}
