// src/services/factories/PaymentFactory.js
import { faker } from '@faker-js/faker';

class PaymentFactory {
  static generate(orderIds) {
    return orderIds.map((orderId) => this.makeOne(orderId));
  }

  static makeOne(orderId) {
    // Sửa lại các phương thức thanh toán cho đúng với ràng buộc CHECK
    const methods = ['Cash', 'Credit Card', 'Bank Transfer'];
    const amount = faker.number.float({
      min: 100000,
      max: 10000000,
      precision: 0.01,
    });

    return {
      Method: faker.helpers.arrayElement(methods),
      Amount: Number(amount.toFixed(2)),
      Time: faker.date
        .between({
          from: '2024-01-01T00:00:00.000Z',
          to: '2024-12-31T23:59:59.999Z',
        })
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      Detail: faker.helpers.arrayElement([
        'Thanh toán trực tiếp bằng tiền mặt',
        'Thanh toán qua thẻ tín dụng',
        'Thanh toán chuyển khoản ngân hàng',
      ]),
      Order_ID: orderId,
    };
  }
}

export default PaymentFactory;
