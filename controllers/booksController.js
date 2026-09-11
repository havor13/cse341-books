// controllers/booksController.js
import { 
  getAllBooks as getAllBooksModel, 
  getBookById as getBookByIdModel,
  createBook as createBookModel,
  updateBook as updateBookModel,
  deleteBook as deleteBookModel
} from '../src/models/books.js';

// GET /books - retrieve all books
export async function getAllBooks(req, res) {
  try {
    const books = await getAllBooksModel();
    return res.status(200).json(books);
  } catch (err) {
    console.error('❌ Error retrieving books:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// GET /books/:id - retrieve one book by id
export async function getBookById(req, res) {
  try {
    const requestedId = req.params.id;
    const book = await getBookByIdModel(requestedId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (err) {
    console.error('❌ Error retrieving book by id:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// POST /books - create a new book
export async function createBook(req, res) {
  try {
    const { id, title, authorId, publishedYear, genre } = req.body;

    if (!id || !title || !authorId || !publishedYear || !genre) {
      return res.status(400).json({ message: 'id, title, authorId, publishedYear, and genre are required' });
    }

    const newBook = { id, title, authorId, publishedYear, genre };
    const result = await createBookModel(newBook);

    if (result.insertedId) {
      return res.status(201).json(newBook);
    } else {
      return res.status(500).json({ message: 'Unable to create book' });
    }
  } catch (err) {
    console.error('❌ Error creating book:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// PUT /books/:id - update an existing book
export async function updateBook(req, res) {
  try {
    const bookId = req.params.id;
    const { title, authorId, publishedYear, genre } = req.body;

    if (!title || !authorId || !publishedYear || !genre) {
      return res.status(400).json({ message: 'title, authorId, publishedYear, and genre are required' });
    }

    const updatedBook = { title, authorId, publishedYear, genre };
    const result = await updateBookModel(bookId, updatedBook);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json({ id: bookId, ...updatedBook });
  } catch (err) {
    console.error('❌ Error updating book:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// DELETE /books/:id - delete a book
export async function deleteBook(req, res) {
  try {
    const bookId = req.params.id;
    const result = await deleteBookModel(bookId);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(204).send();
  } catch (err) {
    console.error('❌ Error deleting book:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
