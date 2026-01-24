import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);
let connection;
try {
    connection = await client.connect();
    console.log("Connected to MongoDB database ");
} catch(e) {
    console.error(e);
}
let db = connection.db("library");
export default db;