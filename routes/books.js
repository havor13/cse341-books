import express from 'express';
import { getAllBooks } from '../controllers/booksController.js';

const router = express.Router();

// GET /books
router.get('/', getAllBooks);

export default router;
