
import { faker } from '@faker-js/faker';
import db from '../../configs/db.js';

class ReceiptFactory {
    static async generate(count) {

        const [adminResult, versionResult] = await Promise.all([
            db.query('SELECT Account_ID FROM Admin'),
            db.query('SELECT DISTINCT Product_ID, Color, Size FROM Version')
        ]);

        const adminIds = adminResult.recordset.map(record => record.Account_ID);
        const versions = versionResult.recordset;

        if (adminIds.length === 0 || versions.length === 0) {
            throw new Error('Không tìm thấy Admin hoặc Version');
        }

        return Array.from({ length: count }, () => this.makeOne(adminIds, versions));
    }

    static makeOne(adminIds, versions) {
        const version = faker.helpers.arrayElement(versions);

        return {
            Time: faker.date.between({
                from: '2024-01-01T00:00:00.000Z',
                to: '2024-12-31T23:59:59.999Z'
            }).toISOString().slice(0, 19).replace('T', ' '),
            Amount: faker.number.int({ min: 10, max: 100 }),
            Admin_ID: faker.helpers.arrayElement(adminIds),
            Product_ID: version.Product_ID,
            Color: version.Color,
            Size: version.Size
        };
    }
}

export default ReceiptFactory;
