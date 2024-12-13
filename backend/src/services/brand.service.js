import sql from 'mssql';
import db from '../configs/db.js';

export const getBrands = async () => {
  const request = new sql.Request(db);
  const result = await request.execute('getBrands');
  return result.recordset;
};
