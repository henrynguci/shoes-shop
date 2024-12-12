import pkg from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const { ConnectionPool } = pkg;

export const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, 
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
    instanceName: process.env.DB_INSTANCE
  }
};


console.log('Database Config:', {
  user: dbConfig.user,
  server: dbConfig.server,
  database: dbConfig.database,
  instanceName: dbConfig.options.instanceName
});
