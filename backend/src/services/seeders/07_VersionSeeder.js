
import VersionFactory from '../factories/VersionFactory.js';
import pool from '../../configs/db.js';

class VersionSeeder {
    static async run() {
        console.log('Seeding Version...');

        try {
            const versions = await VersionFactory.generate();

            for (const version of versions) {
                await pool.request()
                    .input('Product_ID', version.Product_ID)
                    .input('Color', version.Color)
                    .input('Size', version.Size)
                    .input('Price', version.Price)
                    .input('Amount', version.Amount)
                    .query(`
                        INSERT INTO Version (Product_ID, Color, Size, Price, Amount)
                        VALUES (@Product_ID, @Color, @Size, @Price, @Amount)
                    `);
            }

            console.log('Version seeded successfully');
        } catch (error) {
            console.error('Error seeding Version:', error);
            throw error;
        }
    }
}

export default VersionSeeder;
