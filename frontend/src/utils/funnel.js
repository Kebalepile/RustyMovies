import { Decrypt } from "./encryption/encrypt.js";
const folderPath = "./src/database";

export async function importTrendingFiles() {
  try {
    const files = await getFile("trending_movie_links");

    if (files?.length) {
      return await cipherText(files);
    }
  } catch (err) {
    console.log(err.message);
  }
}

export async function importRecommendedFiles() {
  try {
    const files = await getFile("searched_movie_links");

    if (files?.length) {
      return await cipherText(files);
    }
  } catch (err) {
    console.log(err.message);
  }
}
/**
 * @param {string} name
 * @description look for files that include given name argument
 * @returns array of links
 */
async function getFile(name) {
  try {
    const response = await fetch(folderPath),
      directoryListing = await response.text(),
      fileNames = directoryListing
        .match(/<a href="(.+?)">/g)
        .map((match) => match.substring(9, match.length - 2));

    return fileNames.filter(
      (file) => file.includes(name) && file.endsWith(".js")
    );
  } catch (err) {
    console.log(err.message);
  }
}
/**
 *
 * @param {array} files
 * @description reads ciphertext of given file names, decrypts it and returns the contents
 * @returns array of objects
 */
async function cipherText(files) {
  try {
    let object = {
      movieLinks: [],
    };

    for (const f of files) {
      const url = `../database/${f.split(" ")[5].replace(/title="/, "")}`,
        module = await import(url);
      const links = await module.links();

      for (const link of links) {
        const { movieLinks } = await Decrypt(link);
        object.movieLinks.push(...movieLinks);
      }
    }

    return object.movieLinks;
  } catch (err) {
    console.log(err.message);
  }
}
