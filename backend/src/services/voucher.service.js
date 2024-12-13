import sql from 'mssql';
import db from '../configs/db.js';

export const getVoucherAvailable = async (Customer_ID) => {
  const request = new sql.Request(db);
  const result = await request
    .input('Customer_ID', sql.Int, Number(Customer_ID))
    .execute('getVoucherAvailable');
  return result.recordsets;
};
