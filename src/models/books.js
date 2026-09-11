// src/models/books.js
import { getDb } from '../db/connect.js';

// READ - all books
const getAllBooks = async () => {
  const db = getDb();
  return await db.collection('books').find({}).toArray();
};

// READ - single book by id
const getBookById = async (bookId) => {
  const db = getDb();
  return await db.collection('books').findOne({ id: bookId });
};

// CREATE - add a new book
const createBook = async (book) => {
  const db = getDb();
  return await db.collection('books').insertOne(book);
};

// UPDATE - modify an existing book
const updateBook = async (id, updatedBook) => {
  const db = getDb();
  return await db.collection('books').updateOne(
    { id },
    { $set: updatedBook }
  );
};

// DELETE - remove a book
const deleteBook = async (id) => {
  const db = getDb();
  return await db.collection('books').deleteOne({ id });
};

export { getAllBooks, getBookById, createBook, updateBook, deleteBook };
