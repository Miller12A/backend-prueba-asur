// index.ts
import express from 'express';
import { config } from 'dotenv';
import { AppDataSource } from './data-source';
import swaggerUi from 'swagger-ui-express';
import { contactoRoutes } from './routes/contacto.routes';
import cors from 'cors'; 

config();

const app = express();
const PORT = process.env.PORT;
const IP = process.env.IP;
const swaggerSpec = require('./docs/swagger');

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json());
app.use('/contacts', contactoRoutes);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Base de datos conectada');
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://${IP}:${PORT}`));
  })
  .catch((error) => console.error('❌ Error al conectar DB:', error));
