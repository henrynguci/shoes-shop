import { faker } from '@faker-js/faker';

class VoucherFactory {
  static generate(customerIds, promotionIds) {
    const items = [];
    const usedVoucherIds = new Set();

    for (const customerId of customerIds) {
      const numberOfVouchers = faker.number.int({ min: 1, max: 3 });

      for (let i = 0; i < numberOfVouchers; i++) {
        let voucherId;
        do {
          voucherId = faker.string.alphanumeric(10).toUpperCase();
        } while (usedVoucherIds.has(voucherId));
        usedVoucherIds.add(voucherId);

        const promotionId = faker.helpers.arrayElement(promotionIds);
        const status = faker.helpers.arrayElement([
          'Active',
          'Used',
          'Expired',
        ]);

        items.push({
          Voucher_ID: voucherId,
          Status: status,
          Customer_ID: customerId,
          Promotion_ID: promotionId,
        });
      }
    }

    return items;
  }
}

export { VoucherFactory };
