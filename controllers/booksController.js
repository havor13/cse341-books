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

// GET /books/:id - retrieve one book by id
export async function getBookById(req, res) {
  try {
    const db = getDb();
    const book = await db.collection('books').findOne({ id: req.params.id });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (err) {
    console.error('❌ Error retrieving book by id:', err.message);

    // Error: return safe JSON message
    res.status(500).json({ message: 'Internal server error' });
  }
}
