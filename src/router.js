/**
 * @openapi
 * /books:
 *   get:
 *     summary: Retrieve all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: A list of books returned successfully
 *       500:
 *         description: Server error while fetching books
 */
router.get('/books', getAllBooks);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Retrieve a single book by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Custom book id such as b1
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error while fetching book
 */
router.get('/books/:id', getBookById);

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
 *             title: Example Book
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
router.post('/books', createBook);

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
 *         description: Custom book id
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
router.put('/books/:id', updateBook);

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
 *         description: Custom book id
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.delete('/books/:id', deleteBook);
