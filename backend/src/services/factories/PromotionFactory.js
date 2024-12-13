
import { faker } from '@faker-js/faker';

export default class PromotionFactory {
    static generate(count = 10) {
        const items = [];
        const promotionTypes = [
            'Giảm giá Flash Sale',
            'Khuyến mãi mùa hè',
            'Ưu đãi thành viên',
            'Sinh nhật vui vẻ',
            'Khuyến mãi tết',
            'Xả kho giảm giá',
            'Ưu đãi khách hàng mới',
            'Khuyến mãi cuối tuần',
            'Ưu đãi có hạn',
            'Black Friday'
        ];

        const descriptions = [
            'Giảm giá sốc trong 24h',
            'Khuyến mãi đặc biệt dành cho thành viên',
            'Ưu đãi lớn nhân dịp sinh nhật shop',
            'Giảm giá cực sốc - Số lượng có hạn',
            'Mua nhiều giảm nhiều',
            'Đồng giá các mẫu hot',
            'Tặng thêm điểm thành viên',
            'Tặng voucher cho đơn hàng tiếp theo',
            'Freeship toàn quốc',
            'Tích điểm gấp đôi'
        ];

        for (let i = 0; i < count; i++) {

            const timeStart = faker.date.between({
                from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                to: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            });


            const timeExpire = new Date(timeStart);
            const daysToAdd = faker.number.int({ min: 3, max: 30 });
            timeExpire.setDate(timeStart.getDate() + daysToAdd);


            if (timeExpire > new Date()) {
                timeExpire.setTime(new Date().getTime() - 24 * 60 * 60 * 1000);
            }

            items.push({
                Name: faker.helpers.arrayElement(promotionTypes),
                Description: faker.helpers.arrayElement(descriptions),
                Discount_Percent: faker.number.int({ min: 10, max: 50 }),
                Cost_point: faker.number.int({ min: 100, max: 2000 }),
                Time_start: timeStart,
                Time_expire: timeExpire
            });
        }

        return items;
    }
}
