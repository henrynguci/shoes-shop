import { ConnectionPool } from 'mssql';

export const dbConfig = {
  user: 'your_username',
  password: 'your_password',
  server: 'localhost',
  database: 'shoes_shop',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

console.log("hello world");
