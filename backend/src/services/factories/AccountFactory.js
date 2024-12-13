import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

class AccountFactory {
  static async generate(count = 1) {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push(await this.makeOne());
    }
    return items;
  }

  static async makeOne() {
    const hashedPassword = await bcrypt.hash('password123', 10);
    return {
      Username: faker.internet.username(),
      Password: hashedPassword,
      Fullname: faker.person.fullName(),
      Sex: faker.helpers.arrayElement(['M', 'F', 'O']),
      Address: `${faker.location.streetAddress()}, ${faker.location.city()}`,
      PhoneNumber: `0${faker.number.int({ min: 100000000, max: 999999999 })}`,
    };
  }
}

export default AccountFactory;
