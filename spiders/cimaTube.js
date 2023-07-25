import puppeteer from "puppeteer";
import settings from "./settings";



export default class CimaTube {
    #name = "cima tube"
  #allowedDomains = [
    "https://mycima.tube/search/",
    "https://mycima.tube",
  ];
  constructor() {
    this.browser = null;
    this.page = null;
  }
/**
 * @description setup the broswer, page, default timeouts etc...
 */
  async launch() {
    this.browser = await puppeteer.launch(settings);
    this.page = await this.browser.newPage();
    this.page.setDefaultNavigationTimeout(100000);
    await this.search()
  }
  async search(){
    try{

    }catch(err){
        console.log(err.message)
    }
  }
  /***
   * @description close Puppeteer Web Scraper.
   */
  async #terminate() {
    try {
      if (this.browser && this.page) {
        await this.page.goto("about:blank");
        await this.browser.close();
        return;
      }
      await this.browser.close();
    } catch (err) {
      console.log("Problem : ", err);
    }
  }
  /**
   * @param {String} file
   * @returns String: file path
   */
  #databasePath(file = this.#date("date"), folder = "database") {
    const currentFilePath = fileURLToPath(import.meta.url);
    const directoryPath = path.dirname(currentFilePath);
    return path.join(directoryPath, "..", folder, `${file}.json`);
  }
   /***
   * @param {string} [type=""]
   * @description Get's  the current date and time.
   * @returns date string
   *
   */
   #date(type = "") {
    try {
      const pad = (num) => num.toString().padStart(2, "0"),
        date = new Date(),
        year = date.getFullYear(),
        month = date.toLocaleString("default", { month: "long" }),
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds();

      const currentDate = `${day}-${pad(month)}-${pad(year)}`;
      const currentTime = ` ${pad(hour)}:${pad(minute)}:${pad(second)}`;
      switch (type.trim().toLowerCase()) {
        case "date":
          return currentDate;
        case "time":
          return currentTime;
        case "timestamp":
          return `${year}${pad(month)}${pad(day)}${pad(hour)}${pad(
            minute
          )}${pad(second)}`;

        default:
          return {
            date: currentDate,
            time: currentTime,
          };
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}
