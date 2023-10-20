package types

import (
	"sync"
)

// movie info
type MovieInfo struct {
	Title     string `json:"title"`
	Poster    string `json:"poster"`
	Href      string `json:"href"`
	IframeSrc string `json:"iframeSrc"`
}

// movie categories
type Categories struct {
	Latest   []MovieInfo `json:"latest"`
	Featured []MovieInfo `json:"featured"`
}

// series info
type Series struct {
}

type TVSeries struct {
	StreamingSeries []Series `json:"streamingSeries"`
}

// interface for spider
type Spider interface {
	Init(wg *sync.WaitGroup)
}
