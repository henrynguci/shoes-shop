
import { faker } from '@faker-js/faker';

class ShipperFactory {
    static generate(count) {
        const items = [];


        const lastNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý'];


        const middleNames = ['Văn', 'Hữu', 'Đức', 'Công', 'Quang', 'Khắc', 'Duy', 'Hoàng', 'Gia', 'Minh'];


        const firstNames = ['Hùng', 'Dũng', 'Mạnh', 'Cường', 'Quân', 'Đạt', 'Phong', 'Long', 'Thắng', 'Trung', 'Kiên', 'Nam', 'Bình', 'Thành', 'Tùng', 'Sơn'];


        const phonePrefix = ['032', '033', '034', '035', '036', '037', '038', '039',
                           '070', '079', '077', '076', '078',
                           '083', '084', '085', '081', '082',
                           '056', '058', '059',
                           '090', '091', '092', '093', '094', '096', '097', '098', '099'];

        for (let i = 0; i < count; i++) {

            const lastName = faker.helpers.arrayElement(lastNames);
            const middleName = faker.helpers.arrayElement(middleNames);
            const firstName = faker.helpers.arrayElement(firstNames);
            const fullName = `${lastName} ${middleName} ${firstName}`;


            const prefix = faker.helpers.arrayElement(phonePrefix);
            const suffix = faker.string.numeric(7);
            const phoneNumber = `${prefix}${suffix}`;

            items.push({
                Fullname: fullName,
                PhoneNumber: phoneNumber
            });
        }

        return items;
    }
}

export { ShipperFactory };
