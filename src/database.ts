import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.REACT_APP_MONGO;

let cachedDb: MongoClient = null;

export function getDatabase(): Promise<MongoClient> {
  if (cachedDb) {
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(
    "mongodb+srv://admin-database-Maxime51:YLoFugzYRn74c657@cluster0.varqm.mongodb.net/Marvel?retryWrites=true&w=majority"
  ).then((db) => {
    cachedDb = db;
    return cachedDb;
  });
}
