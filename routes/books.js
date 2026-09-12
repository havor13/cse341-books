import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from '../controllers/booksController.js';

const router = express.Router();

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Books returned successfully
 *       500:
 *         description: Unable to retrieve books
 */
router.get('/', getAllBooks);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get one book by id
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The custom book id, such as b1
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Unable to retrieve book
 */
router.get('/:id', getBookById);

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - title
 *               - authorId
 *               - publicationDate
 *               - genre
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *               authorId:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *                 format: date
 *               genre:
 *                 type: string
 *           example:
 *             id: b4
 *             title: New Book
 *             authorId: a1
 *             publicationDate: 2026-01-01
 *             genre: Fiction
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Invalid book data, duplicate id, or authorId does not exist
 *       500:
 *         description: Internal server error
 */
router.post('/', createBook);

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update an existing book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The custom book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - authorId
 *               - publicationDate
 *               - genre
 *             properties:
 *               title:
 *                 type: string
 *               authorId:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *                 format: date
 *               genre:
 *                 type: string
 *           example:
 *             title: Updated Book Title
 *             authorId: a2
 *             publicationDate: 2027-05-15
 *             genre: Non-Fiction
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Invalid book data or authorId does not exist
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateBook);

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The custom book id
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteBook);

export default router;
