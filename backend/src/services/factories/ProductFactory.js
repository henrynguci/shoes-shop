import { faker } from '@faker-js/faker';

class ProductFactory {
  static async generate(count = 1) {
    const pool = await import('../../configs/db.js').then((m) => m.default);
    const result = await pool.request().query('SELECT Brand_ID FROM Brand');
    const brandIds = result.recordset.map((r) => r.Brand_ID);

    if (brandIds.length === 0) {
      throw new Error('No brands found in database');
    }

    const items = [];
    for (let i = 0; i < count; i++) {
      items.push(this.makeOne(brandIds));
    }
    return items;
  }

  static makeOne(brandIds) {
    const shoeTypes = [
      'Running Shoes',
      'Sneakers',
      'Basketball Shoes',
      'Training Shoes',
      'Lifestyle Shoes',
      'Football Boots',
      'Walking Shoes',
      'Tennis Shoes',
      'Skateboarding Shoes',
      'Slip-On Shoes',
    ];

    const shoeTechnologies = [
      'Air Cushioning',
      'Boost Technology',
      'React Foam',
      'Gel Cushioning',
      'CloudFoam',
      'Zoom Air',
      'Fresh Foam',
      'HOVR Technology',
      'FlyteFoam',
    ];

    const shoeName = `${faker.helpers.arrayElement(shoeTypes)} ${faker.word.adjective()}`;

    const description = `
${shoeName} - Designed for ${faker.helpers.arrayElement(['performance', 'comfort', 'style', 'durability'])}.
Features:
- ${faker.helpers.arrayElement(shoeTechnologies)} for superior comfort
- ${faker.helpers.arrayElement(['Breathable mesh upper', 'Premium leather upper', 'Synthetic upper', 'Knit upper'])}
- ${faker.helpers.arrayElement(['Rubber outsole', 'High-traction outsole', 'Non-marking sole'])}
- ${faker.helpers.arrayElement(['Lace-up closure', 'Slip-on design', 'Velcro straps'])}
- Available in multiple colorways
- Perfect for ${faker.helpers.arrayElement(['everyday wear', 'sports activities', 'casual occasions', 'athletic performance'])}
`.trim();

    const validStatuses = ['Active', 'Inactive', 'Discontinued'];
    const weightedStatuses = [
      { value: 'Active', weight: 0.7 },
      { value: 'Inactive', weight: 0.2 },
      { value: 'Discontinued', weight: 0.1 },
    ];

    const status = faker.helpers.weightedArrayElement(weightedStatuses);

    const star = faker.number.float({
      min: 3.5,
      max: 5,
      precision: 0.1,
    });

    return {
      Name: shoeName,
      Description: description,
      Star: star,
      Status: status,
      Brand_ID: faker.helpers.arrayElement(brandIds),
      Gift_ID: null,
    };
  }
}

export default ProductFactory;
