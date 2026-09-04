// app.js
import express from 'express';
import { getDb } from './src/db/connect.js';

const app = express();
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Welcome to Books API!' });
});

// GET /books - return all books
app.get('/books', async (req, res) => {
  try {
    const books = await getDb()
      .collection('books')
      .find({})
      .toArray();

    return res.status(200).json(books);
  } catch (error) {
    console.error('Failed to retrieve books:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /books/:id - return one book by id
app.get('/books/:id', async (req, res) => {
  try {
    const book = await getDb()
      .collection('books')
      .findOne({ id: req.params.id });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('Failed to retrieve book:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default app;
