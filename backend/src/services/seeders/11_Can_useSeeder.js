
import { Can_useFactory } from '../factories/Can_useFactory.js';
import pool from '../../configs/db.js';

class Can_useSeeder {
    static async run() {
        console.log('Seeding Can_use...');

        try {

            const promotionResult = await pool.request()
                .query('SELECT Promotion_ID FROM PromotionProduct');


            const productResult = await pool.request()
                .query('SELECT Product_ID FROM Product');

            if (promotionResult.recordset.length === 0 || productResult.recordset.length === 0) {
                throw new Error('Missing required PromotionProduct or Product records');
            }

            const promotionIds = promotionResult.recordset.map(record => record.Promotion_ID);
            const productIds = productResult.recordset.map(record => record.Product_ID);

            const canUseItems = Can_useFactory.generate(promotionIds, productIds);

            for (const item of canUseItems) {
                await pool.request()
                    .input('Promotion_ID', item.Promotion_ID)
                    .input('Product_ID', item.Product_ID)
                    .query(`
                        INSERT INTO Can_use (
                            Promotion_ID, Product_ID
                        )
                        VALUES (
                            @Promotion_ID, @Product_ID
                        )
                    `);
            }

            console.log('Can_use seeded successfully');
        } catch (error) {
            console.error('Error seeding Can_use:', error);
            throw error;
        }
    }
}

export default Can_useSeeder;
