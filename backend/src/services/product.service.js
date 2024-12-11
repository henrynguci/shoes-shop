import pool from '../utils/database.js';
import sql from 'mssql';

export const getAllProducts = async () => {
  const result = await pool.request().execute('getAllProducts');
  return result.recordset;
};

export const getProductDetail = async (Product_ID) => {
  const result = await pool
    .request()
    .input('Product_ID', sql.Int, Product_ID)
    .execute('getProductDetail');
  return result.recordsets;
};

export const insertProduct = async (
  { Name, Description, Brand_ID, Gift_ID, Img_url },
  { Color, Size, Price }
) => {
  const result = await pool
    .request()
    .input('Name', sql.NVarChar(200), Name)
    .input('Description', sql.NVarChar(1000), Description)
    .input('Brand_ID', sql.Int, Number(Brand_ID))
    .input('Gift_ID', sql.Int, Gift_ID ? Number(Gift_ID) : null)
    .input('Img_url', sql.VarChar(255), Img_url)
    .input('Color', sql.VarChar(50), Color)
    .input('Size', sql.VarChar(20), Size)
    .input('Price', sql.Decimal(15, 2), Number(Price))
    .execute('insertProduct');
  return result;
};

export const updateProduct = async (
  Product_ID,
  { Name, Description, Brand_ID, Gift_ID }
) => {
  const result = await pool
    .request()
    .input('Product_ID', sql.Int, Number(Product_ID))
    .input('Name', sql.VarChar(100), Name)
    .input('Description', sql.NVarChar(500), Description)
    .input('Brand_ID', sql.Int, Number(Brand_ID))
    .input('Gift_ID', sql.Int, Gift_ID ? Number(Gift_ID) : null)
    .execute('updateProduct');
  return result;
};

export const deleteProduct = async (Product_ID) => {
  const result = await pool
    .request()
    .input('Product_ID', sql.Int, Number(Product_ID))
    .execute('deleteProduct');
  return result;
};
