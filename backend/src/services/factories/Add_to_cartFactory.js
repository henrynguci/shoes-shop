
import { faker } from '@faker-js/faker';
import db from '../../configs/db.js';

class Add_to_cartFactory {
    static async generate(count) {

        const [customerResult, versionResult] = await Promise.all([
            db.query('SELECT Account_ID FROM Customer'),
            db.query('SELECT Product_ID, Color, Size FROM Version')
        ]);

        const customerIds = customerResult.recordset.map(record => record.Account_ID);
        const versions = versionResult.recordset;

        if (customerIds.length === 0 || versions.length === 0) {
            throw new Error('Không tìm thấy Customer hoặc Version');
        }


        const allPossiblePairs = [];
        for (const customerId of customerIds) {
            for (const version of versions) {
                allPossiblePairs.push({
                    customerId,
                    productId: version.Product_ID,
                    color: version.Color,
                    size: version.Size
                });
            }
        }


        const selectedPairs = faker.helpers.arrayElements(
            allPossiblePairs,
            Math.min(count, allPossiblePairs.length)
        );


        return selectedPairs.map(pair => this.makeOne(pair));
    }

    static makeOne(pair) {
        return {
            Customer_ID: pair.customerId,
            Product_ID: pair.productId,
            Color: pair.color,
            Size: pair.size,
            Time: faker.date.between({
                from: '2024-01-01T00:00:00.000Z',
                to: '2024-12-31T23:59:59.999Z'
            }).toISOString().slice(0, 19).replace('T', ' '),
            Amount: faker.number.int({ min: 1, max: 5 })
        };
    }
}

export default Add_to_cartFactory;
