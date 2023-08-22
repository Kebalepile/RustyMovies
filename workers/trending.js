import { parentPort } from "worker_threads";
import CimaTube from "../spiders/cimaTube.js";

import { Trending } from "../pipline/movieInfo.js";

parentPort.on("message", async (msg) => {
  if (msg === "start") {
    console.log("trending worker");
    await TrendingCrawl();
    parentPort.postMessage("Trending Search Done");
  }
});

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
