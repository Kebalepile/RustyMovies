import CimaTube from "./spiders/cimaTube.js";

(async () => {
  console.log("B-Town Cinema");
  const spider = new CimaTube();
  // daliy search
  // await spider.launch();
  // await spider.daliySearch();
  // await spider.terminate();

  // search movies
  // await spider.launch();
  // await spider.searchMovies();
  // await spider.terminate();
})();
