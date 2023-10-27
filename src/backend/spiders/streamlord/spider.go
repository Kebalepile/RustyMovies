package spider

import (
	"backend/pipeline"
	"backend/types"
	"context"
	"fmt"
	"log"
	"strings"
	"sync"
	"time"

	"github.com/chromedp/chromedp"
)

type Spider struct {
	Name           string
	AllowedDomains []string
	Shutdown       context.CancelFunc
	Categories     types.Categories
}

func (s *Spider) Init(wg *sync.WaitGroup) {
	defer wg.Done()

	log.Println(s.Name, " spider initiated ", s.date())
	// chromedp options
	opts := append(chromedp.DefaultExecAllocatorOptions[:],
		chromedp.Flag("headless", false), // set headless to true for production
		chromedp.UserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"),
		// chromedp.WindowSize(768, 1024), // Tablet size
	)

	ctx, cancel := chromedp.NewExecAllocator(context.Background(), opts...)
	defer cancel()

	ctx, cancel = chromedp.NewContext(ctx)
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
	log.Println("scrapping movie data")

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

	for _, m := range s.Categories.Featured {
		s.iframe(ctx, &m)
	}
	for _, m := range s.Categories.Latest {
		s.iframe(ctx, &m)
	}
	s.save("mData", "movies")
}

// generate slices of series data
func (s *Spider) series(ctx context.Context) {}

// retrive iframe
func (s *Spider) iframe(ctx context.Context, m *types.MovieInfo) {
	var origin string

	err := chromedp.Run(ctx,
		chromedp.Navigate(m.Href),
		chromedp.Location(&origin))

	s.error(err)
	s.sleep(5)

	if origin == m.Href {
		expression := fmt.Sprintf(`document.querySelector("#iframe").src`)
		err = chromedp.Run(ctx,
			chromedp.Evaluate(expression, &m.IframeSrc))
		s.error(err)
		s.sleep(5)
	}
}

// save data to *.js or *.json file
func (s *Spider) save(name, folder string) {
	log.Println("saving data")

	err := pipeline.ToJavaScript(name, folder, &s.Categories)
	s.error(err)
}

// close chromedp broswer instance
func (s *Spider) close() {
	log.Println(s.Name, "is done.")
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
		log.Println("*************************************")
		log.Println("Error from: ", s.Name, " spider")
		log.Println(err.Error())
		log.Println("Please restart scrapper")
		log.Println(err)
		log.Println("*************************************")
		log.Fatal(err)
	}
}

// pesudo code
// 1.
// go to http://www.streamlord.com/index.html
// execute javascript code
// var mLists = Array.from(document.querySelectorAll("#movieslist"));
// var categories = {"latest":null, "featured":null};
// if (mLists.length){
// mLists.forEach((l,i) => {
// i === 0 ? categories.featured = document.querySelectorAll(".item.movie"): categories.latest = document.querySelectorAll(".item.movie")
// });

// categories.featured = categories.featured.map(i => {
// const data = {}
// const img i.querySelector('a img');
// data.poster = img.src;
// data.href = i.parentElement.href;
// data.title = data.href.match(/watch-movie-(.*?)-\d+\.html/)[1].replaceAll("-", " ");
// return data;
// });

//categories.latest =  categories.latest.map(i => {
// const data = {}
// const img i.querySelector('a img');
// data.poster = img.src;
// data.href = i.parentElement.href;
// data.title = data.href.match(/watch-movie-(.*?)-\d+\.html/)[1].replaceAll("-", " ");
// return data;
// });
// return categories;
// }

// 2.
// use golang
// for _, data := range  categories.features {
// navigate to data.href
// check if url location is same as data.href
// execute javaScript code
//
// const iframe = document.querySelector("#iframe");
// return iframe.src;
//
// }
