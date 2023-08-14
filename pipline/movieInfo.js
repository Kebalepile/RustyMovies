/***
 * save to mongoDB database named movie_info into various collections
 */

import { readdir, readFile } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  MongoDBConnect,
  InsertMany,
  InsertOne,
  FindMany,
  FindOne,
  names,
  closeDBConnection,
} from "./mongoDB.js";

const directoryPath = "database";

/**
 * @description read contents of every trending_movie_links.json and save "movieLinks" value
 * to mongoDB
 */
export async function Trending() {
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

    files = files.filter((f) => f.includes("trending"));

    const documents = await getFileContents(files);
    const connected = await MongoDBConnect();

    if (connected) {
      const response = await await InsertMany(names[0], documents);
      console.log(
        response.insertedCount + " documents to " + names[0] + " collection"
      );
    }
  } catch (err) {
    console.log(err);
  } finally {
    await closeDBConnection();
  }
}

/**
 * @description read contents of every searched_movie_links.json and save "movieLinks" value
 * to mongoDB
 */

export async function Recommended() {
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
    files = files.filter((f) => f.includes("searched"));
    const documents = await getFileContents(files);
    const connected = await MongoDBConnect();

    if (connected) {
      const response = await await InsertMany(names[2], documents);
      console.log(
        response.insertedCount + " documents to " + names[2] + " collection"
      );
    }
  } catch (err) {
    console.log(err);
  } finally {
    await closeDBConnection();
  }
}

/**
 *
 * @param {array} files
 * @description read files of give array of file names.
 * @return unique documents
 */
async function getFileContents(files) {
  try {
    const documents = [];

    for await (const f of files) {
      const fPath = `${directoryPath}\\${f}`;
      const document = await new Promise((resolve, reject) => {
        readFile(fPath, "utf8", (err, fContent) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(fContent));
          }
        });
      });

      documents.push(...document.movieLinks);
    }

    return uniqueDocuments(documents);
  } catch (err) {
    console.log(err);
  }
}

/**
 *
 * @param {array} documents
 * @description removes duplicated documents by comparing
 * document.title with documents previously pushed to accumulator array
 * @returns array
 */
function uniqueDocuments(documents) {
  return documents.reduce((acc, cur) => {
    const title = cur?.title.trim().toLowerCase();
    const found = acc.find((obj) => obj?.title.trim().toLowerCase() === title);
    if (!found) {
      acc.push(cur);
    }
    return acc;
  }, []);
}
