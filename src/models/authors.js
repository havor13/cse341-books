// src/models/authors.js
import { getDb } from '../db/connect.js';

// READ - all authors
async function getAllAuthors() {
  const db = getDb();
  return await db.collection('authors').find().toArray();
}

// READ - single author by id
async function getAuthorById(id) {
  const db = getDb();
  return await db.collection('authors').findOne({ id });
}

// CREATE - add a new author
async function createAuthor(author) {
  const db = getDb();
  return await db.collection('authors').insertOne(author);
}

// UPDATE - modify an existing author
async function updateAuthor(id, updatedAuthor) {
  const db = getDb();
  return await db.collection('authors').updateOne(
    { id },
    { $set: updatedAuthor }
  );
}

// DELETE - remove an author
async function deleteAuthor(id) {
  const db = getDb();
  return await db.collection('authors').deleteOne({ id });
}

// ✅ Export all functions together
export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};
