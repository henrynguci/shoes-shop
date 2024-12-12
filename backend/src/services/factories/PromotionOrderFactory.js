
import { faker } from '@faker-js/faker';

export default class PromotionOrderFactory {
    static generate(promotionIds) {
        const items = [];


        const priceRanges = [
            { min: 500000, max: 1000000 },
            { min: 1000000, max: 2000000 },
            { min: 2000000, max: 3000000 },
            { min: 3000000, max: 5000000 },
            { min: 5000000, max: 10000000 },
        ];


        for (const promotionId of promotionIds) {
            const priceRange = faker.helpers.arrayElement(priceRanges);

            items.push({
                Promotion_ID: promotionId,
                Min_price: priceRange.min,
                Max_price: priceRange.max
            });
        }

        return items;
    }
}
