import { faker } from '@faker-js/faker';
class OrderProductFactory {
    static generate(count, orderIds, versions, voucherIds) {
        return Array.from({ length: count }, (_, index) =>
            this.makeOne(orderIds, versions, voucherIds, index + 1)
        );
    }
    static makeOne(orderIds, versions, voucherIds, orderNumber) {
        const version = faker.helpers.arrayElement(versions);
        const orderId = faker.helpers.arrayElement(orderIds);
        const voucher = voucherIds && voucherIds.length > 0
            ? faker.helpers.maybe(() => faker.helpers.arrayElement(voucherIds), { probability: 0.3 })
            : null;
        return {
            Order_ID: orderId,
            Order_number: orderNumber,
            Quantity: faker.number.int({ min: 1, max: 5 }),
            Price: Number(faker.number.float({ min: 100000, max: 2000000, precision: 0.01 }).toFixed(2)),
            Product_ID: version.Product_ID,
            Color: version.Color,
            Size: version.Size,
            Voucher_ID: voucher
        };
    }
}
export default OrderProductFactory;
