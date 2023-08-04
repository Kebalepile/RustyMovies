import CimaTube from "./spiders/cimaTube.js";

(async () => {
  console.log("B-Town Cinema");
  const spider = new CimaTube();
  await spider.launch();
  // await spider.daliySearch();
  // await spider.searchMovies();
  // await spider.terminate();
})();
