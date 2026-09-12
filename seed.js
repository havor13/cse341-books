// seed.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

async function seedData() {
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB_NAME || 'cse341-books-db');
    const booksCollection = db.collection('books');
    const authorsCollection = db.collection('authors');

    // Clear existing data
    await booksCollection.deleteMany({});
    await authorsCollection.deleteMany({});

    // Insert sample authors
    const sampleAuthors = [
      { id: "a1", name: "Maya Rivera", birthYear: 1980 },
      { id: "a2", name: "James Okoro", birthYear: 1975 },
      { id: "a3", name: "Lina Chen", birthYear: 1988 }
    ];
    await authorsCollection.insertMany(sampleAuthors);

    // Insert sample books (with authorId references)
    const sampleBooks = [
      {
        id: "b1",
        authorId: "a1",
        title: "Patterns of Light",
        publicationDate: "2021-08-17",
        genre: "Fiction"
      },
      {
        id: "b2",
        authorId: "a2",
        title: "Shadows of Tomorrow",
        publicationDate: "2020-05-12",
        genre: "Sci-Fi"
      },
      {
        id: "b3",
        authorId: "a3",
        title: "Echoes of Silence",
        publicationDate: "2019-11-03",
        genre: "Mystery"
      }
    ];
    await booksCollection.insertMany(sampleBooks);

    console.log("✅ Seed data for books and authors inserted successfully");
  } catch (err) {
    console.error("❌ Error seeding data:", err.message);
  } finally {
    await client.close();
    console.log("🔒 MongoDB connection closed after seeding");
  }
}

seedData();
