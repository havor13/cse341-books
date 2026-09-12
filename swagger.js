// swagger.js
import { writeFileSync } from 'node:fs';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Books & Authors API',
      version: '1.0.0',
      description:
        'A simple API for managing books and authors with full CRUD operations and relationship validation',
    },
    servers: [
      {
        url: '/',
        description: 'Local development server',
      },
    ],
    tags: [
      {
        name: 'Books',
        description: 'Operations related to books',
      },
      {
        name: 'Authors',
        description: 'Operations related to authors',
      },
    ],
  },
  // Files containing OpenAPI comments
  apis: [
    './routes/books.js',
    './routes/authors.js',
    './server.js', // ✅ include server entry point instead of app.js
  ],
};

// Generate swagger specification
const swaggerSpec = swaggerJsdoc(options);

// Write swagger.json file
writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('✅ Swagger documentation generated.');
