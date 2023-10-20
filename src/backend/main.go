package main

import (
	streamlord "backend/spiders/streamlord"
	"backend/types"
	"log"
	"sync"
)

func main() {

	log.Println("Movie info scrapper initiated.")
	
	streamlordSpider := streamlord.Spider{
		Name: "Streamlord",
		AllowedDomains: []string{
			"http://www.streamlord.com/index.html",
		},
	}

	spiders := []types.Spider{
		&streamlordSpider,
	}

	var wg sync.WaitGroup
	for _, s := range spiders {
		wg.Add(1)
		go s.Init(&wg)
	}
	wg.Wait()
}
