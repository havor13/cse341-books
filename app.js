// app.js
import express from 'express';
import booksRouter from './routes/books.js';
import authorsRouter from './routes/authors.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: 'json' };

const app = express();

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Welcome to Books API!' });
});

// ✅ Mount routers
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);

// ✅ Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
