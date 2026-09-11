// routes/books.js
import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from '../controllers/booksController.js';

const router = express.Router();

// READ - all books
router.get('/', getAllBooks);

// READ - single book by id
router.get('/:id', getBookById);

// CREATE - add a new book
router.post('/', createBook);

// UPDATE - modify an existing book
router.put('/:id', updateBook);

// DELETE - remove a book
router.delete('/:id', deleteBook);

export default router;
