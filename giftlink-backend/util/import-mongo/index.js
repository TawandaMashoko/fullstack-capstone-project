require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

// MongoDB connection URL
const url = process.env.MONGO_URL; // e.g. mongodb://127.0.0.1:27017/giftdb
const filename = `${__dirname}/gifts.json`;
const dbName = 'giftdb';
const collectionName = 'gifts';

// Load the array of gifts into the data object
const data = JSON.parse(fs.readFileSync(filename, 'utf8')).docs;

// Connect to database and insert data into the collection
async function loadData() {
    const client = new MongoClient(url);

    try {
        // Connect to the MongoDB client
        await client.connect();
        console.log("✅ Connected successfully to server");

        // Get database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Always refresh data to ensure import works
        console.log("🧹 Clearing existing collection (if any)...");
        await collection.deleteMany({});

        // Insert data into the collection
        const insertResult = await collection.insertMany(data);
        console.log(`🎁 Inserted documents: ${insertResult.insertedCount}`);

    } catch (err) {
        console.error("❌ Error loading data:", err);
    } finally {
        // Close the connection
        await client.close();
        console.log("🔒 Connection closed");
    }
}

// Run the import
loadData();

module.exports = {
    loadData,
};
