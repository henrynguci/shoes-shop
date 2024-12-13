import { faker } from '@faker-js/faker';
import db from '../../configs/db.js';

class RateFactory {
  static async generate(count) {
    const [customerResult, productResult] = await Promise.all([
      db.query('SELECT Account_ID FROM Customer'),
      db.query('SELECT Product_ID FROM Product'),
    ]);

    const customerIds = customerResult.recordset.map(
      (record) => record.Account_ID
    );
    const productIds = productResult.recordset.map(
      (record) => record.Product_ID
    );

    if (customerIds.length === 0 || productIds.length === 0) {
      throw new Error('Không tìm thấy Customer hoặc Product');
    }

    const allPossiblePairs = [];
    for (const customerId of customerIds) {
      for (const productId of productIds) {
        allPossiblePairs.push({ customerId, productId });
      }
    }

    const selectedPairs = faker.helpers.arrayElements(
      allPossiblePairs,
      Math.min(count, allPossiblePairs.length)
    );

    return selectedPairs.map((pair) =>
      this.makeOne(pair.customerId, pair.productId)
    );
  }

  static makeOne(customerId, productId) {
    return {
      Customer_ID: customerId,
      Product_ID: productId,
      Star: faker.number.int({ min: 1, max: 5 }),
      Comment: faker.lorem.sentence(),
      Last_update: faker.date
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

export default RateFactory;
