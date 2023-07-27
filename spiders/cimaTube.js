import puppeteer from "puppeteer";
import settings from "../settings.js";

export default class CimaTube {
  #name = "cima tube";
  #allowedDomains = ["https://mycima.tube/search/", "https://mycima.tube"];
  constructor() {
    this.browser = null;
    this.page = null;
    this.movieFiles = [];
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

        if (movieLinks.length) {
          await this.#processMovieLinks(movieLinks);
          console.log(movieFiles);
          // write the files to JSON file.
          // const intervalId = setInterval(() => {
          //   console.log(this.movieFiles);
          //   if (this.movieFiles.length) {
          //     clearInterval(intervalId);
          //   }
          // }, 5000);
        }
      }
      return;
    } catch (err) {
      console.log(err.message);
      await this.#terminate();
    }
  }
  /**
   * @description get src and poster of each movie link object in the movielinks array
   * @param {array} movieLinks
   * @returns array of movie detail object
   */
  async #processMovieLinks(movieLinks = []) {
    if (movieLinks.length === 0) {
      return;
    }
    const link = movieLinks.shift();
    const details = await this.#mediaDetails(link);
    console.log(details);
    this.movieFiles.push(details);
    this.#processMovieLinks(movieLinks);
  }
  /**
   * @description gets src and poster of given movie link.
   * @param {object} movieLink
   * @param {string} prevUrl
   * @returns movie details object
   */
  async #mediaDetails(movieLink, prevUrl = this.page.url()) {
    await this.page.goto(movieLink.url);

    if (this.page.url() !== prevUrl) {
      const frame = this.page
        .frames()
        .find((frame) => frame.name() === "watch");
      
      const videoElement = await frame.$("#VideoPlayer_html5_api");
      const poster = await videoElement.evaluate((videoElem) =>
        videoElem.getAttribute("poster")
      );
      
      const src = await videoElement.evaluate((videoElem) =>
        videoElem.querySelector("source").getAttribute("src")
      );

      return { poster, src, title: movieLink.title };
    } else {
      return await this.#mediaDetails(movieLink, prevUrl);
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
