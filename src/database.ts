import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.REACT_APP_MONGO;

let cachedDb: MongoClient;

export function getDatabase(): Promise<MongoClient> {
  if (cachedDb) {
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(`${process.env.REACT_APP_MONGO}`).then((db) => {
    cachedDb = db;
    return cachedDb;
  });
}
