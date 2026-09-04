// routes/books.js
import express from 'express';
import { getAllBooks, getBookById } from '../controllers/booksController.js';

const router = express.Router();

// GET /books - all books
router.get('/', getAllBooks);

// GET /books/:id - single book by id
router.get('/:id', getBookById);

export default router;
