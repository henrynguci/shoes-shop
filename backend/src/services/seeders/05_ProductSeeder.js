import ProductFactory from '../factories/ProductFactory.js';

class ProductSeeder {
  static async run(pool) {
    try {
      console.log('Seeding Product...');

      // Tạo 10 sản phẩm mới
      const products = await ProductFactory.generate(10);

      // Thêm các sản phẩm mới
      for (const product of products) {
        await pool
          .request()
          .input('Name', product.Name)
          .input('Description', product.Description)
          .input('Star', product.Star)
          .input('Status', product.Status)
          .input('Brand_ID', product.Brand_ID).query(`
                        INSERT INTO Product (Name, Description, Star, Status, Brand_ID)
                        VALUES (@Name, @Description, @Star, @Status, @Brand_ID)
                    `);
      }

      console.log('Product seeded successfully');
    } catch (error) {
      console.error('Error seeding Product:', error);
      throw error;
    }
  }
}

export default ProductSeeder;
