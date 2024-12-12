import { faker } from '@faker-js/faker';

class AdminFactory {
    static generate(count = 1) {
        const items = [];
        for (let i = 0; i < count; i++) {
            items.push(this.makeOne());
        }
        return items;
    }

    static makeOne() {
        return {
            Admin_code: `ADM${faker.string.alphanumeric(6).toUpperCase()}`
        };
    }
}

export default AdminFactory;
