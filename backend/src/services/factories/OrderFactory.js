import { faker } from '@faker-js/faker';

class OrderFactory {
  static generate(count, customerIds, voucherIds, shipperIds) {
    return Array.from({ length: count }, () =>
      this.makeOne(customerIds, voucherIds, shipperIds)
    );
  }

  static makeOne(customerIds, voucherIds, shipperIds) {
    const createTime = faker.date.past();
    const closeTime = faker.date.future({ refDate: createTime });

    const statusList = [
      'Pending',
      'Confirmed',
      'Shipping',
      'Completed',
      'Cancelled',
    ];

    const voucher =
      voucherIds && voucherIds.length > 0
        ? faker.helpers.maybe(() => faker.helpers.arrayElement(voucherIds), {
            probability: 0.7,
          })
        : null;

    const shipper =
      shipperIds && shipperIds.length > 0
        ? faker.helpers.maybe(() => faker.helpers.arrayElement(shipperIds), {
            probability: 0.8,
          })
        : null;

    return {
      Address: faker.location.streetAddress(true),
      PhoneNumber:
        faker.helpers.arrayElement([
          '032',
          '033',
          '034',
          '035',
          '036',
          '037',
          '038',
          '039',
        ]) + faker.string.numeric(7),
      Create_time: createTime,
      Price: Number(
        faker.number
          .float({ min: 100000, max: 10000000, precision: 0.01 })
          .toFixed(2)
      ),
      Status: faker.helpers.arrayElement(statusList),
      Shipfee: Number(
        faker.number
          .float({ min: 15000, max: 50000, precision: 0.01 })
          .toFixed(2)
      ),
      Customer_ID: faker.helpers.arrayElement(customerIds),
      Voucher_ID: voucher,
      Shipper_ID: shipper,
      Close_time: closeTime,
    };
  }
}

export default OrderFactory;
