
import { VoucherFactory } from '../factories/VoucherFactory.js';
import pool from '../../configs/db.js';

class VoucherSeeder {
    static async run() {
        console.log('Seeding Voucher...');

        try {

            const customerResult = await pool.request()
                .query('SELECT Account_ID FROM Customer');

            const promotionResult = await pool.request()
                .query('SELECT Promotion_ID FROM Promotion');

            if (customerResult.recordset.length === 0 || promotionResult.recordset.length === 0) {
                throw new Error('Missing required Customer or Promotion records');
            }


            const customerIds = customerResult.recordset.map(record => record.Account_ID);
            const promotionIds = promotionResult.recordset.map(record => record.Promotion_ID);

            const vouchers = VoucherFactory.generate(customerIds, promotionIds);

            for (const voucher of vouchers) {
                await pool.request()
                    .input('Voucher_ID', voucher.Voucher_ID)
                    .input('Status', voucher.Status)
                    .input('Customer_ID', voucher.Customer_ID)
                    .input('Promotion_ID', voucher.Promotion_ID)
                    .query(`
                        INSERT INTO Voucher (
                            Voucher_ID, Status, Customer_ID, Promotion_ID
                        )
                        VALUES (
                            @Voucher_ID, @Status, @Customer_ID, @Promotion_ID
                        )
                    `);
            }

            console.log('Voucher seeded successfully');
        } catch (error) {
            console.error('Error seeding Voucher:', error);
            throw error;
        }
    }
}

export default VoucherSeeder;
