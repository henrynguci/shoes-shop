
import PromotionProductFactory from '../factories/PromotionProductFactory.js';
import pool from '../../configs/db.js';

class PromotionProductSeeder {
    static async run() {
        console.log('Seeding PromotionProduct...');

        try {

            const result = await pool.request()
                .query(`
                    SELECT p.Promotion_ID
                    FROM Promotion p
                    LEFT JOIN PromotionOrder po ON p.Promotion_ID = po.Promotion_ID
                    WHERE po.Promotion_ID IS NULL
                `);

            const availablePromotionIds = result.recordset.map(record => record.Promotion_ID);

            const promotionProducts = PromotionProductFactory.generate(availablePromotionIds);

            for (const product of promotionProducts) {
                await pool.request()
                    .input('Promotion_ID', product.Promotion_ID)
                    .input('Min_quantity', product.Min_quantity)
                    .input('Max_quantity', product.Max_quantity)
                    .query(`
                        INSERT INTO PromotionProduct (
                            Promotion_ID, Min_quantity, Max_quantity
                        )
                        VALUES (
                            @Promotion_ID, @Min_quantity, @Max_quantity
                        )
                    `);
            }

            console.log('PromotionProduct seeded successfully');
        } catch (error) {
            console.error('Error seeding PromotionProduct:', error);
            throw error;
        }
    }
}

export default PromotionProductSeeder;
