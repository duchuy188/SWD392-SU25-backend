const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Chatbot API Documentation',
      version: '1.0.0',
      description: 'API documentation for Academic and Career Counseling Chatbot',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production'
          ? 'https://swd392-su25-backend.onrender.com'  
          : `http://localhost:${process.env.PORT || 3000}`,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
  
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Local development server',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [
    './src/config/swagger/schemas/*.js', 
    './src/config/swagger/api/*.js'
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const swaggerUiOptions = {
  swaggerOptions: {
    persistAuthorization: true
  }
};

module.exports = {
  swaggerSpec,
  swaggerUiOptions
};