// controllers/authorsController.js
import {
  getAllAuthors as getAllAuthorsModel,
  getAuthorById as getAuthorByIdModel,
  createAuthor as createAuthorModel,
  updateAuthor as updateAuthorModel,
  deleteAuthor as deleteAuthorModel
} from '../src/models/authors.js';

// GET /authors - retrieve all authors
export async function getAllAuthors(req, res) {
  try {
    const authors = await getAllAuthorsModel();
    return res.status(200).json(authors);
  } catch (err) {
    console.error('❌ Error retrieving authors:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// GET /authors/:id - retrieve one author by id
export async function getAuthorById(req, res) {
  try {
    const requestedId = req.params.id;
    const author = await getAuthorByIdModel(requestedId);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    return res.status(200).json(author);
  } catch (err) {
    console.error('❌ Error retrieving author by id:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// POST /authors - create a new author
export async function createAuthor(req, res) {
  try {
    const { id, name, birthYear } = req.body;

    if (!id || !name || !birthYear) {
      return res.status(400).json({ message: 'id, name, and birthYear are required' });
    }

    const newAuthor = { id, name, birthYear };
    const result = await createAuthorModel(newAuthor);

    if (result.insertedId) {
      return res.status(201).json(newAuthor);
    } else {
      return res.status(500).json({ message: 'Unable to create author' });
    }
  } catch (err) {
    console.error('❌ Error creating author:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// PUT /authors/:id - update an existing author
export async function updateAuthor(req, res) {
  try {
    const authorId = req.params.id;
    const { name, birthYear } = req.body;

    if (!name || !birthYear) {
      return res.status(400).json({ message: 'name and birthYear are required' });
    }

    const updatedAuthor = { name, birthYear };
    const result = await updateAuthorModel(authorId, updatedAuthor);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }

    return res.status(200).json({ id: authorId, ...updatedAuthor });
  } catch (err) {
    console.error('❌ Error updating author:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// DELETE /authors/:id - delete an author
export async function deleteAuthor(req, res) {
  try {
    const authorId = req.params.id;
    const result = await deleteAuthorModel(authorId);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }

    return res.status(204).send();
  } catch (err) {
    console.error('❌ Error deleting author:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
