// src/services/seeders/PaymentSeeder.js
import PaymentFactory from '../factories/PaymentFactory.js';
import db from '../../configs/db.js';  // Sửa lại đường dẫn

export default class PaymentSeeder {
    static async run() {
        try {
            console.log('Seeding Payment...');

            // Lấy danh sách Order_ID từ bảng Order
            const orderResult = await db.query('SELECT Order_ID FROM [Order]');
            const orderIds = orderResult.recordset.map(record => record.Order_ID);

            if (orderIds.length === 0) {
                throw new Error('Không tìm thấy Order_ID nào trong bảng Order');
            }

            // Tạo payment cho mỗi order
            const items = PaymentFactory.generate(orderIds);

            // Chia thành các batch nhỏ hơn để tránh quá tải
            const batchSize = 100;
            for (let i = 0; i < items.length; i += batchSize) {
                const batch = items.slice(i, i + batchSize);
                const values = batch.map(item =>
                    `('${item.Method}', ${item.Amount}, '${item.Time}',
                      N'${item.Detail}', ${item.Order_ID})`
                ).join(',');

                const query = `
                    INSERT INTO Payment (Method, Amount, Time, Detail, Order_ID)
                    VALUES ${values}
                `;

                await db.query(query);
            }

            console.log('Payment seeded successfully');
        } catch (error) {
            console.error('Error seeding Payment:', error);
            throw error;
        }
    }
}
