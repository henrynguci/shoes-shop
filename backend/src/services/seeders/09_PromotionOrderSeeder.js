
import PromotionOrderFactory from '../factories/PromotionOrderFactory.js';
import pool from '../../configs/db.js';

class PromotionOrderSeeder {
    static async run() {
        console.log('Seeding PromotionOrder...');

        try {

            const result = await pool.request()
                .query('SELECT Promotion_ID FROM Promotion');

            const promotionIds = result.recordset.map(record => record.Promotion_ID);


            const selectedPromotionIds = promotionIds.slice(0, Math.floor(promotionIds.length / 2));

            const promotionOrders = PromotionOrderFactory.generate(selectedPromotionIds);

            for (const order of promotionOrders) {
                await pool.request()
                    .input('Promotion_ID', order.Promotion_ID)
                    .input('Min_price', order.Min_price)
                    .input('Max_price', order.Max_price)
                    .query(`
                        INSERT INTO PromotionOrder (
                            Promotion_ID, Min_price, Max_price
                        )
                        VALUES (
                            @Promotion_ID, @Min_price, @Max_price
                        )
                    `);
            }

            console.log('PromotionOrder seeded successfully');
        } catch (error) {
            console.error('Error seeding PromotionOrder:', error);
            throw error;
        }
    }
}

export default PromotionOrderSeeder;
