// src/models/books.js
import { getDb } from '../db/connect.js';

// Get all books
const getAllBooks = async () => {
  const db = getDb();
  return await db.collection('books').find({}).toArray();
};

// Get one book by id
const getBookById = async (bookId) => {
  const db = getDb();
  return await db.collection('books').findOne({ id: bookId });
};

export { getAllBooks, getBookById };
