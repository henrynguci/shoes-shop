import { ShipperFactory } from '../factories/ShipperFactory.js';
import pool from '../../configs/db.js';

class ShipperSeeder {
  static async run() {
    try {
      console.log('Seeding Shipper...');
      const shippers = ShipperFactory.generate(10);

      for (const shipper of shippers) {
        await pool
          .request()
          .input('Fullname', shipper.Fullname)
          .input('PhoneNumber', shipper.PhoneNumber).query(`
                        INSERT INTO Shipper (Fullname, PhoneNumber)
                        VALUES (@Fullname, @PhoneNumber)
                    `);
      }

      console.log('Shipper seeded successfully');
    } catch (error) {
      console.error('Error seeding Shipper:', error);
      throw error;
    }
  }
}

export default ShipperSeeder;
