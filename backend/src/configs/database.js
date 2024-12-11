import { DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE } from './env.js';

export const dbConfig = {
  user: DB_USER || 'your_user',
  password: DB_PASSWORD || 'your_password',
  server: DB_SERVER || 'localhost',
  database: DB_DATABASE || 'shoes_shop',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};
