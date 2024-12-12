// src/services/seeders/06_Product_ImgSeeder.js
import Product_ImgFactory from '../factories/Product_ImgFactory.js';
import pool from '../../configs/db.js';

class Product_ImgSeeder {
    static async run() {
        console.log('Seeding Product_Img...');

        try {
            const productImages = await Product_ImgFactory.generate();

            for (const image of productImages) {
                await pool.request()
                    .input('Product_ID', image.Product_ID)
                    .input('Img_url', image.Img_url)
                    .query(`
                        INSERT INTO Product_Img (Product_ID, Img_url)
                        VALUES (@Product_ID, @Img_url)
                    `);
            }

            console.log('Product_Img seeded successfully');
        } catch (error) {
            console.error('Error seeding Product_Img:', error);
            throw error;
        }
    }
}

export default Product_ImgSeeder;
