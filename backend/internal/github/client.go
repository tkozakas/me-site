package github

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

type Client struct {
	token    string
	username string
	http     *http.Client
}

func NewClient(token, username string) *Client {
	return &Client{
		token:    token,
		username: username,
		http:     &http.Client{Timeout: 30 * time.Second},
	}
}

func (c *Client) Username() string {
	return c.username
}

func (c *Client) request(endpoint string, result any) error {
	url := "https://api.github.com" + endpoint

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return err
	}

	req.Header.Set("Authorization", "Bearer "+c.token)
	req.Header.Set("Accept", "application/vnd.github+json")

	resp, err := c.http.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("GitHub API error %d: %s", resp.StatusCode, string(body))
	}

	return json.NewDecoder(resp.Body).Decode(result)
}

func (c *Client) graphql(query string, result any) error {
	return c.graphqlWithVars(query, nil, result)
}

func (c *Client) graphqlWithVars(query string, variables map[string]any, result any) error {
	url := "https://api.github.com/graphql"

	payload := map[string]any{"query": query}
	if variables != nil {
		payload["variables"] = variables
	}

	body, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	req, err := http.NewRequest("POST", url, nil)
	if err != nil {
		return err
	}

	req.Body = io.NopCloser(jsonReader(body))
	req.Header.Set("Authorization", "Bearer "+c.token)
	req.Header.Set("Content-Type", "application/json")

	resp, err := c.http.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		respBody, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("GitHub GraphQL error %d: %s", resp.StatusCode, string(respBody))
	}

	return json.NewDecoder(resp.Body).Decode(result)
}

type jsonReaderType []byte

func (j jsonReaderType) Read(p []byte) (n int, err error) {
	return copy(p, j), io.EOF
}

func jsonReader(data []byte) io.Reader {
	return &bytesReader{data: data}
}

type bytesReader struct {
	data []byte
	pos  int
}

func (r *bytesReader) Read(p []byte) (n int, err error) {
	if r.pos >= len(r.data) {
		return 0, io.EOF
	}
	n = copy(p, r.data[r.pos:])
	r.pos += n
	return n, nil
}
