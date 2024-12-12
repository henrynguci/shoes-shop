import sql from 'mssql';
import { dbConfig } from '../configs/db.js';

export const connectDB = async () => {
  try {
    await sql.connect(dbConfig);
    console.log('Connected to SQL Server');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};
