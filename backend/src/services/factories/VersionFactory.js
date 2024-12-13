
import { faker } from '@faker-js/faker';

class VersionFactory {
    static async generate() {
        const pool = await import('../../configs/db.js').then(m => m.default);
        const result = await pool.request().query('SELECT Product_ID FROM Product');
        const productIds = result.recordset.map(r => r.Product_ID);

        if (productIds.length === 0) {
            throw new Error('No products found in database');
        }

        const items = [];
        const colors = ['Black', 'White', 'Red', 'Blue', 'Grey', 'Green', 'Yellow', 'Pink', 'Purple', 'Orange'];
        const sizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];


        for (const productId of productIds) {

            const colorCount = faker.number.int({ min: 3, max: 5 });
            const selectedColors = faker.helpers.arrayElements(colors, colorCount);


            for (const color of selectedColors) {
                const sizeCount = faker.number.int({ min: 5, max: 8 });
                const selectedSizes = faker.helpers.arrayElements(sizes, sizeCount);

                for (const size of selectedSizes) {
                    items.push({
                        Product_ID: productId,
                        Color: color,
                        Size: size,
                        Price: faker.number.int({ min: 500000, max: 5000000 }),
                        Amount: faker.number.int({ min: 10, max: 100 })
                    });
                }
            }
        }

        return items;
    }
}

export default VersionFactory;
