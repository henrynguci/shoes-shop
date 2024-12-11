import pool from '../utils/database.js';
import sql from 'mssql';

export const getVoucherAvailable = async (Customer_ID) => {
  const result = await pool
    .request()
    .input('Customer_ID', sql.Int, Customer_ID)
    .execute('getVoucherAvailable');
  return result.recordsets;
};
