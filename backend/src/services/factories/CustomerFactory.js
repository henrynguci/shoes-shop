import { faker } from '@faker-js/faker';

class CustomerFactory {
  static generate(count = 1, accountIds = []) {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push(this.makeOne(accountIds[i].Account_ID)); // Sử dụng Account_ID từ recordset
    }
    return items;
  }

  static makeOne(accountId) {
    return {
      Account_ID: accountId,
      Email: faker.internet.email(),
      Bdate: faker.date.past(30), // Trả về Date object
      CurrentPoint: faker.number.int({ min: 0, max: 1000 }),
      TotalPoint: faker.number.int({ min: 1000, max: 5000 }),
      Level: faker.number.int({ min: 1, max: 5 }),
    };
  }
}

export default CustomerFactory;
