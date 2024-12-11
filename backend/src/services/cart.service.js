import sql from 'mssql';

export const getCart = async (Account_ID) => {
  const request = new sql.Request();
  const result = await request
    .input('Account_ID', sql.Int, Account_ID)
    .execute('getCart');
  console.log(result);
  return result.recordset;
};

export const addVersionToCart = async ({
  Account_ID,
  Product_ID,
  Color,
  Size,
  Amount,
}) => {
  const request = new sql.Request();
  const result = await request
    .input('Customer_ID', sql.Int, Account_ID)
    .input('Product_ID', sql.Int, Product_ID)
    .input('Color', sql.VarChar(50), Color)
    .input('Size', sql.VarChar(20), Size)
    .input('Amount', sql.Int, Amount)
    .execute('addVersionToCart');
  return result;
};

export const removeVersionInCart = async ({
  Account_ID,
  Product_ID,
  Color,
  Size,
}) => {
  const request = new sql.Request();
  const result = await request
    .input('Customer_ID', sql.Int, Account_ID)
    .input('Product_ID', sql.Int, Product_ID)
    .input('Color', sql.VarChar(50), Color)
    .input('Size', sql.VarChar(20), Size)
    .execute('removeVersionInCart');
  return result;
};