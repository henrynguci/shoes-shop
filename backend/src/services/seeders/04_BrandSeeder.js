import BrandFactory from '../factories/BrandFactory.js';

class BrandSeeder {
    static async run(pool) {
        try {
            console.log('Seeding Brand...');

            // Tạo 5 brand mới
            const brands = BrandFactory.generate(5);

            // Thêm các brand mới
            for (const brand of brands) {
                await pool.request()
                    .input('Name', brand.Name)
                    .input('Description', brand.Description)
                    .input('Logo_url', brand.Logo_url)
                    .query(`
                        INSERT INTO Brand (Name, Description, Logo_url)
                        VALUES (@Name, @Description, @Logo_url)
                    `);
            }

            console.log('Brand seeded successfully');
        } catch (error) {
            console.error('Error seeding Brand:', error);
            throw error;
        }
    }
}

export default BrandSeeder;
