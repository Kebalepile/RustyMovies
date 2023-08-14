import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
// Access environment variables
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

/***
 * @description Database name
 */
const dbName = "movie_info";
/**
 * @description database Collection Names
 */
export const names = [
  "trending_movies",
  "request_movies",
  "recommended_movies",
  "comming_soon_movies",
];

const uri = `${dbHost}://${dbUser}:${dbPassword}@cluster0.mcpuyxa.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const state = () => {
  let database = null;
  let client = null;
  return {
    /**
     *
     * @param {object} db
     * @description assign database
     */
    setDB(db) {
      database = db;
    },
    /**
     *
     * @returns mongoDB database
     */
    getDB() {
      return database;
    },
    setClient(c) {
      client = c;
    },
    /**
     * @description Ensures that the client will close when you finish/error
     */
    async closeDBConnection() {
      console.log(dbName, " mongoDB database disconnected\n");
      if (client != null) {
        await client.close();
      }
    },
  };
};
const dbState = state();

export async function MongoDBConnect() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    dbState.setClient(client);
    const db = client.db(dbName);
    dbState.setDB(db);
    console.log("You successfully connected to MongoDB!\n");
    return true;
  } catch (err) {
    console.log(err);
  }
}
/**
 *
 * @param {string} name colection name
 * @returns bool, success message
 */
export async function CreateCollection(name) {
  try {
    const db = await dbState.getDB();
    await db.CreateCollection(name);
    return true;
  } catch (err) {
    console.log(err);
  }
}
/**
 * @param {string} name name of collection data object is to be stored
 * @param {*} doc object of data to be saved
 * @param {string} dbName datasbe to be used.
 * @description insert document in the [name] collection
 * @return result
 */
export async function InsertOne(name, doc, dbName) {
  try {
    const db = await dbState.getDB();
    const result = await db.collection(name).InserOne(doc);
    return result;
  } catch (err) {
    console.log(err);
  }
}
/**
 * @param {string} name name of collection data object is to be stored
 * @param {*} docs array of object of data to be saved
 * @param {string} dbName datasbe to be used.
 * @description insert document in the [name] collection
 * @return result
 */
export async function InsertMany(name, docs, dbName) {
  try {
    const db = await dbState.getDB();
    const options = {
      ordered: true,
    };
    const result = await db.collection(name).insertMany(docs, options);
    return result;
  } catch (err) {
    console.log(err);
  }
}

/**
 *
 * @param {string} name collection to query
 * @param {object} query  query object e.g {title: "meek"}
 * @return result
 */
export async function FindOne(name, query) {
  try {
    const db = await dbState.getDB();
    const result = await db.collection(name).findOne(query);
    return result;
  } catch (err) {
    console.log(err);
  }
}

/**
 *
 * @param {string} name collection to query
 * @param {object} query  query object e.g {title: "meek"}
 * @return results
 */
export async function FindMany(name, query = null) {
  try {
    const db = await dbState.getDB();

    let results = [];
    if (query != null) {
      const cursor = await db.collection(name).find(query);
      if ((await db.collection(name).countDocuments(query)) === 0) {
        return results;
      }
      for await (const doc of cursor) {
        results.push(doc);
      }
    } else {
      const cursor = await db.collection(name).find();
      results = await cursor.toArray();
    }

    return results;
  } catch (err) {
    console.log(err);
  }
}

/**
 * @dscription Wrapper of state.closeDBConnection() method
 */
export async function closeDBConnection() {
  try {
    await dbState.closeDBConnection();
  } catch (err) {
    console.log(err);
  }
}
