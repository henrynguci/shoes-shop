import ReceiptFactory from '../factories/ReceiptFactory.js';
import db from '../../configs/db.js';

export default class ReceiptSeeder {
  static async run() {
    try {
      console.log('Seeding Receipt...');
      const items = await ReceiptFactory.generate(50);

      const batchSize = 10;
      for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const values = batch
          .map(
            (item) =>
              `('${item.Time}', ${item.Amount}, ${item.Admin_ID},
                      ${item.Product_ID}, N'${item.Color}', '${item.Size}')`
          )
          .join(',');

        const query = `
                    INSERT INTO Receipt (Time, Amount, Admin_ID, Product_ID, Color, Size)
                    VALUES ${values}
                `;

        await db.query(query);
      }

      console.log('Receipt seeded successfully');
    } catch (error) {
      console.error('Error seeding Receipt:', error);
      throw error;
    }
  }
}
