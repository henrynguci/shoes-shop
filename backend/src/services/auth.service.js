import pool from '../utils/database.js';
import sql from 'mssql';
import bcrypt from 'bcryptjs';

export const getAccountByUsername = async (username) => {
  const result = await pool
    .request()
    .input('Username', sql.VarChar(50), username)
    .execute('getAccountByUsername');
  return result.recordset[0];
};

export const comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};
