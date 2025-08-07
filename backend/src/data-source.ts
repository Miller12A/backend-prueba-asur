// data-source.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config(); // Cargar variables .env

import { Contacto } from './entities/Contacto';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Contacto],
});
