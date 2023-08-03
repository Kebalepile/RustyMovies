import puppeteer from "puppeteer";
import settings from "../settings.js";
import { writeFile, readdir, readFile, readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { progress } from "../pipline/utils.js";

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
    console.log(`Launching: ${this.#name}`);

    this.browser = await puppeteer.launch(settings);
    this.page = await this.browser.newPage();
    this.page.setDefaultNavigationTimeout(100000);
    // await this.daliySearch();
    await this.searchMovies();
  }
  async #readSearchList() {
    const directoryPath = "database\\lists";

    try {
      let files = await new Promise((resolve, reject) => {
        readdir(directoryPath, (err, files) => {
          if (err) {
            reject(err);
          } else {
            resolve(files);
          }
        });
      });
      
      if (files.length) {
        files = files.filter((f) => f.startsWith("movies"));
        for (const f of files) {
          const fPath = `${directoryPath}\\${f}`;
          const content = await new Promise((resolve, reject) => {
            readFile(fPath, "utf8", (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(JSON.parse(data));
              }
            });
          });
          if (content.length) {
            return content;
          }
          return null;
        }
      }
    } catch (err) {
      this.#log(`Error: ${err.message}`);
    }
  }
  async searchMovies() {
    const links = []
    try {
      const movieNames = await this.#readSearchList();

      for (const name of movieNames) {
        console.log("searching for movie named => " ,name)

        await this.page.goto(`${this.#allowedDomains[0]} ${name.trim()}`);
       
         const urls = await this.page.evaluate(() => {
          let elems = document.querySelectorAll(".Thumb--GridItem");
          
          elems = Array.from(elems);
          if (elems.length) {
            const links = elems.map((e) =>
              {

                return {
                  title: e.querySelectorAll(".hasyear")[0].textContent,
                  url: e.childNodes[0].getAttribute("href")
                }
              }
            );
            return links;
          }
          return elems;
        });
        links.push(...urls)
      }
  

      if (links.length) {
        await this.#processMovieLinks(links);
        this.#log(this.movieFiles);
        this.#saveToDatabase();
      }else{
        this.#log("No movies found.")
      }
    } catch (err) {
      this.#log(`Error: ${err.message}`);
    } finally {
      await this.#terminate();
    }
  }
  /**
   * @description search for latest movies being advertised to watch.
   */
  async daliySearch() {
    try {
      if (this.page) {
        this.#log("Browsing whitelist domain");

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

        this.#log("Movie links:");
        this.#log(movieLinks.map((l) => l.title));

        if (movieLinks.length) {
          await this.#processMovieLinks(movieLinks);
          this.#log(this.movieFiles);
          this.#saveToDatabase();
        }
      }
      return;
    } catch (err) {
      this.#log(`Error: ${err.message}`);
    } finally {
      await this.#terminate();
    }
  }
  /**
   * @description get src and poster of each movie link object in the movielinks array
   * @param {array} movieLinks
   * @returns array of movie detail object
   */
  async #processMovieLinks(movieLinks = [], count = 1) {
    if (movieLinks.length === 0) {
      return;
    }
    // progress(count, movieLinks.length);
    const link = movieLinks.shift();
    const details = await this.#mediaDetails(link);

    this.movieFiles.push(details);

    await this.#processMovieLinks(movieLinks, count + 1);
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
      await this.page.waitForNetworkIdle();
      const frame = this.page
        .frames()
        .find((frame) => frame.name() === "watch");
      if (frame) {
        const videoElement = await frame.$("#VideoPlayer_html5_api");
        const poster = await videoElement.evaluate((videoElem) =>
          videoElem.getAttribute("poster")
        );

        const src = await videoElement.evaluate((videoElem) =>
          videoElem.querySelector("source").getAttribute("src")
        );

        return { poster, src, title: movieLink.title };
      }

      return await this.#mediaDetails(movieLink, prevUrl);
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
      this.#log(`Error: ${err.message}`);
    }
  }
  /**
   * @param {String} file file name
   * @param {String} folder folder name
   * @returns String: file path
   */
  #databasePath(file = this.#date("date"), folder = "database") {
    const currentFilePath = fileURLToPath(import.meta.url);
    const directoryPath = path.dirname(currentFilePath);
    return path.join(directoryPath, "..", folder, `${file}.json`);
  }
  /**
   * @description save given movie Files/Links array to database.
   */
  #saveToDatabase(file_name = `${this.#date("date")}_movie_links` ) {
    writeFile(
      this.#databasePath(file_name),
      JSON.stringify(
        {
          movieLinks: this.movieFiles,
          date: this.#date("date"),
        },
        null,
        4
      ),
      async (err) => {
        if (err) {
          this.#log(`Error: ${err.message}`);
        } else {
          this.#log("scrapped movie links saved at folder (database)");
        }
        await this.#terminate();
      }
    );
  }
  /***
   * @param {string}
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
      this.#log(`Error: ${error.message}`);
    }
  }

  /**
   *
   * @param {*} output
   * @description logs output to the terminal
   */
  #log(output) {
    console.log("\t ", output);
  }
}
