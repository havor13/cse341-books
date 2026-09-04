// server.js
import express from 'express';
import { connectToDb, getDb } from './src/db/connect.js';

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

    // Temporary test: log all books
    const books = await getDb().collection('books').find({}).toArray();
    console.log('Book documents:', books);

    // Middleware
    app.use(express.json());

    // Root route (basic check)
    app.get('/', (req, res) => {
      res.send('Server is running and connected to MongoDB');
    });

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
