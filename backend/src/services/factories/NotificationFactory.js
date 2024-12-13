// src/services/factories/NotificationFactory.js
import { faker } from '@faker-js/faker';
import db from '../../configs/db.js';

class NotificationFactory {
  static async generate(count) {
    // Lấy danh sách Order_ID từ bảng Order
    const orderResult = await db.query('SELECT Order_ID FROM [Order]');
    const orderIds = orderResult.recordset.map((record) => record.Order_ID);

    if (orderIds.length === 0) {
      throw new Error('Không tìm thấy Order_ID nào trong bảng Order');
    }

    return Array.from({ length: count }, () => this.makeOne(orderIds));
  }

  static makeOne(orderIds) {
    const statuses = [
      'Đơn hàng mới',
      'Đang xử lý',
      'Đang giao hàng',
      'Đã giao hàng',
      'Đã hủy',
    ];

    const descriptions = [
      'Đơn hàng của bạn đã được tạo thành công',
      'Đơn hàng của bạn đang được xử lý',
      'Đơn hàng đang được giao đến bạn',
      'Đơn hàng đã được giao thành công',
      'Đơn hàng đã bị hủy',
    ];

    const status = faker.helpers.arrayElement(statuses);
    const statusIndex = statuses.indexOf(status);

    return {
      Order_ID: faker.helpers.arrayElement(orderIds),
      Status: status,
      Description: descriptions[statusIndex],
      Is_read: faker.number.int({ min: 0, max: 1 }),
      Create_time: faker.date
        .between({
          from: '2024-01-01T00:00:00.000Z',
          to: '2024-12-31T23:59:59.999Z',
        })
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
    };
  }
}

export default NotificationFactory;
