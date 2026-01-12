/* jshint esversion: 8 */

require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options
const url = `${process.env.MONGO_URL}`;
let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
    if (dbInstance) {
        return dbInstance;
    }

    // Create a new MongoDB client instance
    const client = new MongoClient(url);

    try {
        // Task 1: Connect to DB
        await client.connect();

        // Task 2: Connect to database giftdb and store in variable
        dbInstance = client.db(dbName);

        console.log("Connected to MongoDB:", dbName);

        // Task 3: Return the DB Instance
        return dbInstance;
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        throw error;
    }
}

module.exports = connectToDatabase;
