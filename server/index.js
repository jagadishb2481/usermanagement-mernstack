require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();
const mongoString = process.env.DATABASE_URL;
console.log(mongoString);
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});



const routes = require('./routes/routes');

const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'My API',
        version: '1.0.0',
        description: 'API documentation for my Express.js REST service',
      },
      basePath: '/api',
      schemes: ['http', 'https'],
    },
    // Path to the API docs
    apis: ['./routes/*.js'],
  };
  
  // Initialize Swagger-jsdoc
  const specs = swaggerJsdoc(options);
  
  // Serve Swagger API docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

  app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})