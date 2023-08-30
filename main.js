import CimaTube from "./spiders/cimaTube.js";

import { Trending, Recommended } from "./pipline/movieInfo.js";

async function TrendingCrawl() {
  try {
    const spider = new CimaTube();
    // daliy search
    await spider.launch();
    await spider.TrendingMovies();
    await spider.Terminate();

    await Trending();
  } catch (err) {
    console.error(err);
  }
}

async function RecommendedCrawl() {
  try {
    const spider = new CimaTube();

    console.log("B-Town Cinema");
    // search movies
    await spider.launch();
    await spider.RecommendedMovies();
    await spider.Terminate();

    await Recommended();
  } catch (err) {
    console.log(err);
  }
}
// RecommendedCrawl();
TrendingCrawl();
