// routes/books.js
import express from 'express';
import { getAllBooks, getBookById } from '../controllers/booksController.js';

const router = express.Router();

// GET /books - retrieve all books
router.get('/', getAllBooks);

// GET /books/:id - retrieve a single book by id
router.get('/:id', getBookById);

export default router;
