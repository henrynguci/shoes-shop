// src/services/seeders/NotificationSeeder.js
import NotificationFactory from '../factories/NotificationFactory.js';
import db from '../../configs/db.js';

export default class NotificationSeeder {
  static async run() {
    try {
      console.log('Seeding Notification...');
      const items = await NotificationFactory.generate(50); // Tạo 50 thông báo

      // Chia thành các batch nhỏ hơn để tránh quá tải
      const batchSize = 10;
      for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const values = batch
          .map(
            (item) =>
              `(${item.Order_ID}, N'${item.Status}',
                      N'${item.Description}', ${item.Is_read},
                      '${item.Create_time}')`
          )
          .join(',');

        const query = `
                    INSERT INTO Notification (Order_ID, Status, Description, Is_read, Create_time)
                    VALUES ${values}
                `;

        await db.query(query);
      }

      console.log('Notification seeded successfully');
    } catch (error) {
      console.error('Error seeding Notification:', error);
      throw error;
    }
  }
}
