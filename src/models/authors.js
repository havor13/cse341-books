// src/models/authors.js
import { getDb } from '../db/connect.js';

// READ - all authors
export async function getAllAuthors() {
  const db = getDb();
  return await db.collection('authors').find().toArray();
}

// READ - single author by id
export async function getAuthorById(id) {
  const db = getDb();
  return await db.collection('authors').findOne({ id });
}

// CREATE - add a new author
export async function createAuthor(author) {
  const db = getDb();
  return await db.collection('authors').insertOne(author);
}

// UPDATE - modify an existing author
export async function updateAuthor(id, updatedAuthor) {
  const db = getDb();
  return await db.collection('authors').updateOne(
    { id },
    { $set: updatedAuthor }
  );
}

// DELETE - remove an author
export async function deleteAuthor(id) {
  const db = getDb();
  return await db.collection('authors').deleteOne({ id });
}
