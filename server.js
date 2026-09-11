// server.js
import express from 'express';
import { connectToDb } from './src/db/connect.js';
import booksRouter from './routes/books.js';
import authorsRouter from './routes/authors.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: 'json' };

const app = express();
const PORT = process.env.PORT || 3000;

if (!PORT) {
  throw new Error(
    'PORT is not defined. Make sure your local npm scripts reference the .env file with --env-file=.env, or define PORT in your hosted environment settings.'
  );
}

const startServer = async () => {
  try {
    // ✅ Connect to MongoDB before starting the server
    await connectToDb();

    // Middleware
    app.use(express.json());

    // Root route (basic check)
    app.get('/', (req, res) => {
      res.send('Server is running and connected to MongoDB');
    });

    // ✅ Mount your routers
    app.use('/books', booksRouter);
    app.use('/authors', authorsRouter);

    // ✅ Serve Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
