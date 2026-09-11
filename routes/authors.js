// routes/authors.js
import express from 'express';
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
} from '../controllers/authorsController.js';

const router = express.Router();

// READ - all authors
router.get('/', getAllAuthors);

// READ - single author by id
router.get('/:id', getAuthorById);

// CREATE - add a new author
router.post('/', createAuthor);

// UPDATE - modify an existing author
router.put('/:id', updateAuthor);

// DELETE - remove an author
router.delete('/:id', deleteAuthor);

export default router;
