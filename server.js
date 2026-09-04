// server.js
import express from 'express';
import { connectToDb } from './src/db/connect.js';
import booksRouter from './routes/books.js';

const app = express();
const PORT = process.env.PORT || 3000;

if (!PORT) {
  throw new Error(
    'PORT is not defined. Make sure your local npm scripts reference the .env file with --env-file=.env, or define PORT in your hosted environment settings.'
  );
}

const startServer = async () => {
  try {
    // Connect to MongoDB before starting the server
    await connectToDb();

    // Middleware
    app.use(express.json());

    // Routes
    app.use('/books', booksRouter);

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

await startServer();
