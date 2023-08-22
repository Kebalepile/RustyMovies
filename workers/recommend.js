import { parentPort } from "worker_threads";
import CimaTube from "../spiders/cimaTube.js";

import { Recommended } from "../pipline/movieInfo.js";

parentPort.on("message", async (msg) => {
  if (msg == "start") {
    console.log("recommended worker");
    await RecommendedCrawl();
    parentPort.postMessage("Recommended Search Done");
  }
});

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
