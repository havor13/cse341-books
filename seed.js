// seed.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

async function seedData() {
  try {
    await client.connect();
    const db = client.db('cse341-books-db');
    const booksCollection = db.collection('books');

    // Clear existing data
    await booksCollection.deleteMany({});

    // Insert sample books
    const sampleBooks = [
      {
        id: "b1",
        author: "Maya Rivera",
        title: "Patterns of Light",
        publicationDate: "2021-08-17"
      },
      {
        id: "b2",
        author: "James Okoro",
        title: "Shadows of Tomorrow",
        publicationDate: "2020-05-12"
      },
      {
        id: "b3",
        author: "Lina Chen",
        title: "Echoes of Silence",
        publicationDate: "2019-11-03"
      }
    ];

    await booksCollection.insertMany(sampleBooks);
    console.log("✅ Seed data inserted successfully");
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  } finally {
    await client.close();
  }
}

seedData();
