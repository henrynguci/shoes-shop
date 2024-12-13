import { faker } from '@faker-js/faker';

class Can_useFactory {
  static generate(promotionIds, productIds) {
    const items = [];

    for (const promotionId of promotionIds) {
      const numberOfProducts = faker.number.int({ min: 3, max: 8 });

      const selectedProducts = faker.helpers.arrayElements(
        productIds,
        numberOfProducts
      );

      for (const productId of selectedProducts) {
        items.push({
          Promotion_ID: promotionId,
          Product_ID: productId,
        });
      }
    }

    return items;
  }
}

export { Can_useFactory };
