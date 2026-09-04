// controllers/booksController.js
import { 
  getAllBooks as getAllBooksModel, 
  getBookById as getBookByIdModel 
} from '../src/models/books.js';

// GET /books - retrieve all books
export async function getAllBooks(req, res) {
  try {
    const books = await getAllBooksModel();
    res.status(200).json(books);
  } catch (err) {
    console.error('❌ Error retrieving books:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// GET /books/:id - retrieve one book by id
export async function getBookById(req, res) {
  try {
    const book = await getBookByIdModel(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (err) {
    console.error('❌ Error retrieving book by id:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}
