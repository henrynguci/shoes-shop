import pkg from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const { ConnectionPool } = pkg;

export const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: 'localhost',
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  connectionTimeout: 30000,
  requestTimeout: 30000,
};

const pool = new ConnectionPool(dbConfig);

export const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Kết nối database thành công');
    return pool;
  } catch (err) {
    console.error('Lỗi kết nối database:', err);
    throw err;
  }
};

export default pool;
