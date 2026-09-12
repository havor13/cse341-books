// src/models/authors.js
import { getDb } from '../db/connect.js';

// READ - all authors
const getAllAuthors = async () => {
  const db = getDb();
  return await db.collection('authors').find({}).toArray();
};

// READ - single author by id
const getAuthorById = async (id) => {
  const db = getDb();
  return await db.collection('authors').findOne({ id });
};

// CREATE - add a new author
const createAuthor = async (author) => {
  const db = getDb();
  return await db.collection('authors').insertOne(author);
};

// UPDATE - modify an existing author
const updateAuthor = async (id, updatedAuthor) => {
  const db = getDb();
  return await db.collection('authors').updateOne(
    { id },
    { $set: updatedAuthor }
  );
};

// DELETE - remove an author
const deleteAuthor = async (id) => {
  const db = getDb();
  return await db.collection('authors').deleteOne({ id });
};

// EXTRA: helper to check if author has books
const authorHasBooks = async (id) => {
  const db = getDb();
  const count = await db.collection('books').countDocuments({ authorId: id });
  return count > 0;
};

// ✅ Export all functions together
export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  authorHasBooks
};
    