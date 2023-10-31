package spider

import (
	"backend/pipeline"
	"backend/types"
	"context"
	"fmt"
	"github.com/chromedp/chromedp"
	"log"
	"strings"
	"sync"
	"time"
	"io"
	"net/http"
	"os"
	"path/filepath"
	// "github.com/chromedp/cdproto/page"
)

type Spider struct {
	Name           string
	AllowedDomains []string
	Shutdown       context.CancelFunc
	Categories     types.Categories
}

func (s *Spider) Init(wg *sync.WaitGroup) {
	defer wg.Done()

	s.log(s.Name, " spider initiated ", s.date())
	// chromedp options
	opts := append(chromedp.DefaultExecAllocatorOptions[:],
		chromedp.Flag("headless", true), // set headless to true for production
		chromedp.UserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"),
	)

	// Specify the path to the Brave executable.
	bravePath := "C:/Program Files (x86)/BraveSoftware/Brave-Browser/Application/brave.exe"
	opts = append(opts, chromedp.ExecPath(bravePath))

	ctx, cancel := chromedp.NewExecAllocator(context.Background(), opts...)
	defer cancel()

	// Create a new context for the Brave browser
	ctx, cancel = chromedp.NewContext(ctx)
	defer cancel()
	s.Shutdown = cancel

	var origin string
	err := chromedp.Run(ctx,
		chromedp.Navigate(s.AllowedDomains[0]),
		chromedp.Location(&origin),
	)
	s.error(err)
	s.sleep(10)

	if n := strings.Compare(origin, s.AllowedDomains[0]); n == 0 {
		s.movies(ctx)
	}

}

// generate slices of movie data
func (s *Spider) movies(ctx context.Context) {
	s.log("scrapping movie data")

	expression := fmt.Sprintf(`
	(() => {
		let mLists = Array.from(document.querySelectorAll("#movieslist"));
		let categories = {};
	
		if (mLists.length){
	
			mLists.forEach((l,i) => {
				i === 0 ? 
				categories.featured = Array.from(l.querySelectorAll(".item.movie")):
				categories.latest = Array.from(l.querySelectorAll(".item.movie"))
			});
	
			categories.featured = categories.featured.map(i => {
				const data = {};
				const img = i.querySelector('a img');
				data.poster = img.src;
				data.href = img.parentElement.href;
				data.title = data.href.match(/watch-movie-(.*?)-\d+\.html/);

				Array.isArray(data.title) ? 
				data.title = data.title[1].replaceAll("-", " ") :
				data.title = ""

				return data;
			});

			categories.latest =  categories.latest.map(i => {
				const data = {};
				const img = i.querySelector('a img');
				data.poster = img.src;
				data.href = img.parentElement.href;
				data.title = data.href.match(/watch-movie-(.*?)-\d+\.html/);

				Array.isArray(data.title) ? 
				data.title = data.title[1].replaceAll("-", " ") :
				data.title = ""

				return data;
			});

		return categories;

		}
	})()`)
	
	err := chromedp.Run(ctx,
		chromedp.ScrollIntoView(`#movieslist`, chromedp.ByID),
		chromedp.Evaluate(expression, &s.Categories))

	s.error(err)
	s.sleep(5)
	s.iframes(ctx)
}
// dowload poster image from http site, in order to
//  prevent mixed content warning in prodcution.
func(s *Spider) downloadImage(ctx context.Context, url, filename, outputPath string) error {
    // Download the image
    response, err := http.Get(url)
    if err != nil {
        return err
    }
    defer response.Body.Close()

    // Create the output file
    outputFile, err := os.Create(filepath.Join(outputPath, filename))
    if err != nil {
        return err
    }
    defer outputFile.Close()

    // Copy the response body to the output file
    _, err = io.Copy(outputFile, response.Body)
    if err != nil {
        return err
    }

    return nil
}

// retrive iframe
func (s *Spider) iframes(ctx context.Context) {
	
	outputPath := "database/posters"

	s.log("Featured movies")
	for i, m := range s.Categories.Featured {
		s.log(i, ":", m.Title)

		filename := fmt.Sprintf(`%s.jpg`,m.Title)
		s.downloadImage(ctx, m.Poster, filename, outputPath)
		m.Poster = fmt.Sprintf(`assets/posters/%s`,filename)

		var origin string
		err := chromedp.Run(ctx,
			chromedp.Navigate(m.Href),
			chromedp.Location(&origin),
			chromedp.WaitVisible("#iframe", chromedp.ByID))

		s.error(err)
		s.sleep(5)

		if origin == m.Href {
			expression := fmt.Sprintf(`document.querySelector("#iframe").src`)
			err = chromedp.Run(ctx,
				chromedp.Evaluate(expression, &m.IframeSrc))
			s.error(err)
			s.sleep(5)

			s.Categories.Featured[i] = m
		}

	}

	s.log("Latest movies")
	for i, m := range s.Categories.Latest {
		s.log(i, ":", m.Title)

		filename := fmt.Sprintf(`%s.jpg`,m.Title)
		s.downloadImage(ctx, m.Poster, filename, outputPath)
		m.Poster = fmt.Sprintf(`assets/posters/%s`,filename)

		var origin string
		err := chromedp.Run(ctx,
			chromedp.Navigate(m.Href),
			chromedp.Location(&origin),
			chromedp.WaitVisible("#iframe", chromedp.ByID))

		s.error(err)
		s.sleep(5)

		if origin == m.Href {
			expression := fmt.Sprintf(`document.querySelector("#iframe").src`)
			err = chromedp.Run(ctx,
				chromedp.Evaluate(expression, &m.IframeSrc))
			s.error(err)
			s.sleep(5)
			s.Categories.Latest[i] = m

		}

	}
	s.save("mData", "movies")
}

// save data to *.js or *.json file
func (s *Spider) save(name, folder string) {
	s.log("saving data")

	err := pipeline.ToJavaScript(name, folder, &s.Categories)
	s.error(err)
	s.log("done")
}
func (s *Spider) log(info ...interface{}) {
	log.Println(info...)
}

// generate slices of series data
func (s *Spider) series(ctx context.Context) {}

// close chromedp broswer instance
func (s *Spider) close() {
	s.log(s.Name, "is done.")
	s.Shutdown()
}

// pause spider for given duration
func (s *Spider) sleep(sec int) {
	time.Sleep(time.Duration(sec) * time.Second)
}

// return todays date
func (s *Spider) date() string {
	return time.Now().Format("02 January 2006")
}
func (s Spider) error(err error) {
	if err != nil {
		s.log("*************************************")
		s.log("Error from: ", s.Name, " spider")
		s.log(err.Error())
		s.log("Please restart scrapper")
		s.log(err)
		s.log("*************************************")
		log.Fatal(err)
	}
}
