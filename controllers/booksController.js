// controllers/booksController.js
import { getDb } from '../src/db/connect.js';

// GET /books - retrieve all books
export async function getAllBooks(req, res) {
  try {
    const db = getDb();
    const books = await db.collection('books').find().toArray();

    // Success: return array of books
    res.status(200).json(books);
  } catch (err) {
    console.error('❌ Error retrieving books:', err.message);

    // Error: return safe JSON message
    res.status(500).json({ message: 'Internal server error' });
  }
}
