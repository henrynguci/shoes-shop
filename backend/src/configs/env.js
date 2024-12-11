import { config } from 'dotenv';

config();

export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || 'development';

export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_SERVER = process.env.DB_SERVER;
export const DB_DATABASE = process.env.DB_DATABASE;
