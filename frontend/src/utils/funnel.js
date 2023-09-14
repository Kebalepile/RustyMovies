const folderPath = "./src/database";
export async function importTrendingFiles() {
  try {
    const files = await fileLink("trending_movie_links");

    if (files?.length) {
      let uniqueLinks = new Set();

      for (const f of files) {
        const url = `../database/${f.split(" ")[5].replace(/title="/, "")}`,
          module = await import(url),
          links = await module.links();

        uniqueLinks = new Set([...uniqueLinks, ...links]);
      }
      return [...uniqueLinks];
    }
  } catch (err) {
    console.log(err.message);
  }
}

export async function importRecommendedFiles() {
  try {
    const files = await fileLink("searched_movie_links");

    if (files?.length) {
      let uniqueLinks = new Set();

      for (const f of files) {
        console.log(f.split(" "))
        const url = `../database/${f.split(" ")[5].replace(/title="/, "")}`,
          module = await import(url),
          links = await module.links();

        uniqueLinks = new Set([...uniqueLinks, ...links]);
      }
      return [...uniqueLinks];
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
async function fileLink(name) {
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
