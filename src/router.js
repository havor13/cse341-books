// src/router.js
import express from 'express';
import { getBooksHandler, getBookByIdHandler } from './controllers/books.js';

const router = express.Router();

// GET /books - retrieve all books
router.get('/books', getBooksHandler);

// GET /books/:id - retrieve a single book by id
router.get('/books/:id', getBookByIdHandler);

export default router;
