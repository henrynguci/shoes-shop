// src/services/factories/PromotionFactory.js
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
      'Black Friday',
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
      'Tích điểm gấp đôi',
    ];

    for (let i = 0; i < count; i++) {
      // Tạo ngày bắt đầu từ hiện tại đến 7 ngày tới
      const timeStart = faker.date.between({
        from: new Date(),
        to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      // Thời gian kết thúc từ 3-30 ngày sau ngày bắt đầu
      const timeExpire = new Date(timeStart);
      timeExpire.setDate(
        timeStart.getDate() + faker.number.int({ min: 3, max: 30 })
      );

      items.push({
        Name: faker.helpers.arrayElement(promotionTypes),
        Description: faker.helpers.arrayElement(descriptions),
        Discount_Percent: faker.number.int({ min: 10, max: 50 }), // Giảm giá từ 10-50%
        Cost_point: faker.number.int({ min: 100, max: 2000 }), // Điểm thành viên cần để đổi
        Time_start: timeStart,
        Time_expire: timeExpire,
      });
    }

    return items;
  }
}
