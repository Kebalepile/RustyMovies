package encrypt

type Link struct {
	Poster string `json:"poster"`
	Src string `json:"src"`
	Title string `json:"title"`
}

type Movies struct {
MovieLinks []Link `json:"movieLinks"`
}

