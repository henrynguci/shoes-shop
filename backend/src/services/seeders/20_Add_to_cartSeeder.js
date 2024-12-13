import Add_to_cartFactory from '../factories/Add_to_cartFactory.js';
import db from '../../configs/db.js';

export default class Add_to_cartSeeder {
  static async run() {
    try {
      console.log('Seeding Add_to_cart...');
      const items = await Add_to_cartFactory.generate(10);

      const batchSize = 5;
      for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const values = batch
          .map(
            (item) =>
              `(${item.Customer_ID}, ${item.Product_ID},
                      '${item.Color}', '${item.Size}',
                      '${item.Time}', ${item.Amount})`
          )
          .join(',');

        const query = `
                    INSERT INTO Add_to_cart (Customer_ID, Product_ID,
                                           Color, Size,
                                           Time, Amount)
                    VALUES ${values}
                `;

        await db.query(query);
      }

      console.log('Add_to_cart seeded successfully');
    } catch (error) {
      console.error('Error seeding Add_to_cart:', error);
      throw error;
    }
  }
}
