import CimaTube from "./spiders/cimaTube.js";

(async () => {
  console.log("Btown Cinema");
  const spider = new CimaTube();
  await spider.launch();
})();
