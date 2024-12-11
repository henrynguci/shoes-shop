import sql from 'mssql';

export const getVoucherAvailable = async (Customer_ID) => {
  const request = new sql.Request();
  const result = await request
    .input('Customer_ID', sql.Int, Customer_ID)
    .execute('getVoucherAvailable');
  return result.recordsets;
};
