const { MongoClient } = require('mongodb');
const { mongooseInput } = require('./db-data');

const mongoose = require('mongoose')

const { MONGODB_URI, DB_NAME } = require('./config');

async function createDbWithData(db_uri) {
  const client = new MongoClient(MONGODB_URI ?? db_uri, {
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db(DB_NAME ?? "exam-web3");

    const collection1 = database.collection('notes');
    const collection2 = database.collection('phonebook');
    //collection2.collectionName
    const documentCount = await collection1.countDocuments();
    if (documentCount < 2) {
      console.log("documentCount HELLO", documentCount)
      await importData(collection1, mongooseInput.notes);
      await importData(collection2, mongooseInput.phonebook);
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    client.close();
  }
}

async function importData(collection, data) {
  try {
    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents inserted successfully in ${collection.collectionName}`);
  } catch (error) {
    console.error('Error inserting documents:', error);
  }
}

async function createDbMangoose(db_uri){
  const uri = MONGODB_URI ?? db_uri
  mongoose.set('strictQuery',false)
  mongoose.connect(uri, {
    dbName: DB_NAME ?? 'exam-web3',
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
  });
}

module.exports = { createDbWithData , createDbMangoose};