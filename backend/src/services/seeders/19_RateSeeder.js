import RateFactory from '../factories/RateFactory.js';
import db from '../../configs/db.js';

export default class RateSeeder {
  static async run() {
    try {
      console.log('Seeding Rate...');
      const items = await RateFactory.generate(50);

      const batchSize = 10;
      for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const values = batch
          .map(
            (item) =>
              `(${item.Customer_ID}, ${item.Product_ID}, ${item.Star},
                      N'${item.Comment}', '${item.Last_update}')`
          )
          .join(',');

        const query = `
                    INSERT INTO Rate (Customer_ID, Product_ID, Star,
                                    Comment, Last_update)
                    VALUES ${values}
                `;

        await db.query(query);
      }

      console.log('Rate seeded successfully');
    } catch (error) {
      console.error('Error seeding Rate:', error);
      throw error;
    }
  }
}
