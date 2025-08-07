const swaggerJSDoc = require('swagger-jsdoc');

const PORT = process.env.PORT;
const IP = process.env.IP;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Películas',
    version: '1.0.0',
    description: 'Documentación de la API de gestión de películas',
  },
  servers: [
    {
      url: `http://${IP}:${PORT}`,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['src/routes/*.ts'], // Aquí defines dónde están tus rutas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
