import { faker } from '@faker-js/faker';

export default class PromotionProductFactory {
  static generate(promotionIds) {
    const items = [];

    const quantityRanges = [
      { min: 2, max: 5 },
      { min: 3, max: 8 },
      { min: 5, max: 10 },
      { min: 8, max: 15 },
      { min: 10, max: 20 },
    ];

    for (const promotionId of promotionIds) {
      const quantityRange = faker.helpers.arrayElement(quantityRanges);

      items.push({
        Promotion_ID: promotionId,
        Min_quantity: quantityRange.min,
        Max_quantity: quantityRange.max,
      });
    }

    return items;
  }
}
