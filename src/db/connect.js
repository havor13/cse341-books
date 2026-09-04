// src/db/connect.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let db;
let client;

export async function connectToDb() {
  if (db) return db; // reuse existing connection if already set

  const connectionString = process.env.MONGODB_URI;
  if (!connectionString) {
    throw new Error('❌ MONGODB_URI is not defined in .env');
  }

  try {
    client = new MongoClient(connectionString);
    await client.connect();

    db = client.db('cse341-books-db'); // use your database name
    console.log('✅ Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    throw error;
  }
}

export function getDb() {
  if (!db) {
    throw new Error('❌ Database not initialized. Call connectToDb() first.');
  }
  return db;
}
