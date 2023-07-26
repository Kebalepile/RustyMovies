
import CimaTube from "./spiders/cimaTube";

(async () => {
  console.log("Btown Cinema")
  const spider = new CimaTube()
  await spider.launch()
})();
