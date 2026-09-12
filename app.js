// app.js
import express from 'express';
import booksRouter from './routes/books.js';
import authorsRouter from './routes/authors.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: 'json' };
import { connectToDb, closeDb } from './src/db/connect.js';

const app = express();

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Welcome to Books API!' });
});

// ✅ Connect to DB before mounting routers
(async () => {
  try {
    await connectToDb();
    console.log('📚 Database ready, mounting routes...');
  } catch (err) {
    console.error('❌ Failed to connect to database:', err.message);
    process.exit(1); // exit if DB connection fails
  }
})();

// ✅ Mount routers
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);

// ✅ Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔌 Shutting down server...');
  await closeDb();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('🔌 Server terminated...');
  await closeDb();
  process.exit(0);
});

export default app;
