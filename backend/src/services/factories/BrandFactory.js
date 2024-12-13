import { faker } from '@faker-js/faker';

class BrandFactory {
  static generate(count = 1) {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push(this.makeOne());
    }
    return items;
  }

  static makeOne() {
    return {
      Name: faker.company.name(),
      Description: faker.company.catchPhrase(),
      Logo_url: faker.image.url(),
    };
  }
}

export default BrandFactory;
