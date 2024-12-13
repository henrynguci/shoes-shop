import sql from 'mssql';
import db from '../configs/db.js';

export const checkout = async (customer_ID, orderInfo, orderProducts) => {
  const table = new sql.Table('OrderProductTable');

  table.columns.add('Order_Number', sql.Int);
  table.columns.add('Product_ID', sql.Int);
  table.columns.add('Color', sql.VarChar(50));
  table.columns.add('Size', sql.VarChar(20));
  table.columns.add('Price', sql.Decimal(15, 2));
  table.columns.add('Quantity', sql.Int);
  table.columns.add('Voucher_ID', sql.VarChar(50));

  for (const key in orderProducts) {
    table.rows.add(
      key,
      orderProducts[key].Product_ID,
      orderProducts[key].Color,
      orderProducts[key].Size,
      orderProducts[key].Price,
      orderProducts[key].Quantity,
      orderProducts[key].Voucher_ID ? orderProducts[key].Voucher_ID : null
    );
  }

  const request = new sql.Request(db);
  const result = await request
    .input('Customer_ID', sql.Int, Number(customer_ID))
    .input('Shipfee', sql.Decimal(15, 2), Number(orderInfo.Shipfee))
    .input(
      'Voucher_ID',
      sql.VarChar(50),
      orderInfo.Voucher_ID ? orderInfo.Voucher_ID : null
    )
    .input('OrderProduct', table)
    .execute('checkout');
  return result;
};
