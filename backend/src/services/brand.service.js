import sql from 'mssql';

export const getBrands = async () => {
  const request = new sql.Request();
  const result = await request.execute('getBrands');
  return result.recordset;
};
