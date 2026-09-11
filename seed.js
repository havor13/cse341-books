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

    // Insert sample books
    const sampleBooks = [
      {
        id: "b1",
        authorId: "a1",
        title: "Patterns of Light",
        publishedYear: 2021,
        genre: "fiction"
      },
      {
        id: "b2",
        authorId: "a2",
        title: "Shadows of Tomorrow",
        publishedYear: 2020,
        genre: "sci-fi"
      },
      {
        id: "b3",
        authorId: "a3",
        title: "Echoes of Silence",
        publishedYear: 2019,
        genre: "mystery"
      }
    ];
    await booksCollection.insertMany(sampleBooks);

    console.log("✅ Seed data for books and authors inserted successfully");
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  } finally {
    await client.close();
  }
}

seedData();
