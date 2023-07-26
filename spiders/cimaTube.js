import puppeteer from "puppeteer";
import settings from "../settings.js";

export default class CimaTube {
  #name = "cima tube";
  #allowedDomains = ["https://mycima.tube/search/", "https://mycima.tube"];
  constructor() {
    this.browser = null;
    this.page = null;
    this.mediaObjects = [];
  }
  /**
   * @description setup the broswer, page, default timeouts etc...
   */
  async launch() {
    console.log("launching: ", this.#name);
    this.browser = await puppeteer.launch(settings);
    this.page = await this.browser.newPage();
    this.page.setDefaultNavigationTimeout(100000);
    await this.search();
  }
  async search() {
    try {
      if (this.page) {
        console.log("...browsing whitelist domain");

        await this.page.goto(this.#allowedDomains[1]);

        const movieLinks = await this.page.evaluate(() => {
          const posters = document.querySelectorAll(
            ".Items--Slider--Grid .Thumb--GridItem"
          );
          return Array.from(posters).map((poster) => {
            return {
              url: poster.children[0].getAttribute("href"),
              title: poster.children[0].getAttribute("title"),
            };
          });
        });

        console.log(movieLinks);
        console.log(movieLinks.length);

        const movieObj = async (movieLink, prevUrl = this.page.url()) => {
          await this.page.goto(movieLink.url);

          if (this.page.url() !== prevUrl) {
            const frame = await this.page.frames.find(
              (frame) => frame.name() === "watch"
            );
            const dataLazySrc = await frame.$eval("iframe", (iframe) =>
              iframe.getAttribute("data-lazy-src")
            );
            console.log("data src: ", dataLazySrc);

            const videoElement = await frame.$("#VideoPlayer_html5_api");

            const poster = await videoElement
              .getProperty("poster")
              .then((property) => property.jsonValue());

            const src = await videoElement
              .$("source")
              .then((source) => source.getAttribute("src"));
              
            return { poster, src, title: movieLink.title };
          } else {
            return movieObj(movieLink, prevUrl);
          }
        };
        if (movieLinks.length) {
          // for (const href of movieLinks) {
          //   this.mediaObjects.push(await movieObj(href));
          // }
          this.mediaObjects.push(await movieObj(movieLinks[0]));
          const intervalId = setInterval(() => {
            console.log(this.mediaObjects);
            if (this.mediaObjects.length) {
              clearInterval(intervalId);
            }
          }, 5000);
        }
      }
      return;
    } catch (err) {
      console.log(err.message);
      await this.#terminate();
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
