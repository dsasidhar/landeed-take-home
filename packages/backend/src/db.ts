// write a function that connects to mongodb and
// stores the input variable in a collection called "test"

//import from .env.local file
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

const res = dotenv.config({
  path: "./src/.env.local",
});
const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;

export async function storeInput(input: string) {
  try {
    console.log(MONGO_PASSWORD, MONGO_USERNAME, res.error);
    const client = new MongoClient(
      `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@localhost:27017`
    );
    await client.connect();
    const db = client.db("dynamic-survey");
    const collection = db.collection("responses");
    await collection.insertOne({ input });
    await client.close();
  } catch (err) {
    console.error("err", err);
  }
}
