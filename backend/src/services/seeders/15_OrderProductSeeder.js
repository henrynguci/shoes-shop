import OrderProductFactory from '../factories/OrderProductFactory.js';
import db from '../../configs/db.js';
import { faker } from '@faker-js/faker';
export default class OrderProductSeeder {
    static async run() {
        try {
            console.log('Seeding OrderProduct...');
            const orderResult = await db.query('SELECT Order_ID FROM [Order]');
            const orderIds = orderResult.recordset.map(record => record.Order_ID);
            if (orderIds.length === 0) {
                throw new Error('Không tìm thấy Order_ID nào trong bảng Order');
            }
            const versionResult = await db.query('SELECT Product_ID, Color, Size FROM Version');
            const versions = versionResult.recordset;
            if (versions.length === 0) {
                throw new Error('Không tìm thấy Version nào trong bảng Version');
            }
            const voucherResult = await db.query('SELECT Voucher_ID FROM Voucher');
            const voucherIds = voucherResult.recordset.map(record => record.Voucher_ID);
            const items = [];
            for (const orderId of orderIds) {
                const orderProducts = OrderProductFactory.generate(
                    faker.number.int({ min: 1, max: 5 }),
                    [orderId],
                    versions,
                    voucherIds
                );
                items.push(...orderProducts);
            }
            const batchSize = 100;
            for (let i = 0; i < items.length; i += batchSize) {
                const batch = items.slice(i, i + batchSize);
                const values = batch.map(item =>
                    `(${item.Order_ID}, ${item.Order_number}, ${item.Quantity},
                      ${item.Price}, ${item.Product_ID}, '${item.Color}',
                      '${item.Size}', ${item.Voucher_ID ? `'${item.Voucher_ID}'` : 'NULL'})`
                ).join(',');
                const query = `
                    INSERT INTO OrderProduct (Order_ID, Order_number, Quantity,
                                           Price, Product_ID, Color,
                                           Size, Voucher_ID)
                    VALUES ${values}
                `;
                await db.query(query);
            }
            console.log('OrderProduct seeded successfully');
        } catch (error) {
            console.error('Error seeding OrderProduct:', error);
            throw error;
        }
    }
}
