import OrderFactory from '../factories/OrderFactory.js';
import db from '../../configs/db.js';

export default class OrderSeeder {
  static async run() {
    try {
      console.log('Seeding Order...');

      const customerResult = await db.query('SELECT Account_ID FROM Customer');
      const customerIds = customerResult.recordset.map(
        (record) => record.Account_ID
      );

      if (customerIds.length === 0) {
        throw new Error('Không tìm thấy Customer_ID nào trong bảng Customer');
      }

      const voucherResult = await db.query('SELECT Voucher_ID FROM Voucher');
      const voucherIds = voucherResult.recordset.map(
        (record) => record.Voucher_ID
      );

      const shipperResult = await db.query('SELECT Shipper_ID FROM Shipper');
      const shipperIds = shipperResult.recordset.map(
        (record) => record.Shipper_ID
      );

      const items = OrderFactory.generate(
        10,
        customerIds,
        voucherIds,
        shipperIds
      );

      const values = items
        .map(
          (item) =>
            `('${item.Address}', '${item.PhoneNumber}',
                  '${item.Create_time.toISOString()}', ${item.Price},
                  '${item.Status}', ${item.Shipfee}, ${item.Customer_ID},
                  ${item.Voucher_ID ? `'${item.Voucher_ID}'` : 'NULL'},
                  ${item.Shipper_ID || 'NULL'},
                  '${item.Close_time.toISOString()}')`
        )
        .join(',');

      const query = `
                INSERT INTO [Order] (Address, PhoneNumber, Create_time, Price,
                                   Status, Shipfee, Customer_ID, Voucher_ID,
                                   Shipper_ID, Close_time)
                VALUES ${values}
            `;

      await db.query(query);
      console.log('Order seeded successfully');
    } catch (error) {
      console.error('Error seeding Order:', error);
      throw error;
    }
  }
}
