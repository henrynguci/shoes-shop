// src/services/seeders/08_PromotionSeeder.js
import PromotionFactory from '../factories/PromotionFactory.js';
import pool from '../../configs/db.js';

class PromotionSeeder {
  static async run() {
    console.log('Seeding Promotion...');

    try {
      const promotions = PromotionFactory.generate(10);

      for (const promotion of promotions) {
        await pool
          .request()
          .input('Name', promotion.Name)
          .input('Description', promotion.Description)
          .input('Discount_Percent', promotion.Discount_Percent)
          .input('Cost_point', promotion.Cost_point)
          .input('Time_start', promotion.Time_start)
          .input('Time_expire', promotion.Time_expire).query(`
                        INSERT INTO Promotion (
                            Name, Description, Discount_Percent,
                            Cost_point, Time_start, Time_expire
                        )
                        VALUES (
                            @Name, @Description, @Discount_Percent,
                            @Cost_point, @Time_start, @Time_expire
                        )
                    `);
      }

      console.log('Promotion seeded successfully');
    } catch (error) {
      console.error('Error seeding Promotion:', error);
      throw error;
    }
  }
}

export default PromotionSeeder;
