import AccountFactory from '../factories/AccountFactory.js';
import db from '../../configs/db.js';
import sql from 'mssql';

class AccountSeeder {
  static async run() {
    try {
      console.log('Seeding Account...');
      const accounts = await AccountFactory.generate(10);

      for (const account of accounts) {
        const request = new sql.Request(db);

        // Thêm các parameters
        request.input('username', sql.NVarChar, account.Username);
        request.input('password', sql.NVarChar, account.Password);
        request.input('fullname', sql.NVarChar, account.Fullname);
        request.input('sex', sql.Char, account.Sex);
        request.input('address', sql.NVarChar, account.Address);
        request.input('phoneNumber', sql.VarChar, account.PhoneNumber);

        // Thực hiện query
        await request.query(`
                    INSERT INTO Account (Username, Password, Fullname, Sex, Address, PhoneNumber)
                    VALUES (@username, @password, @fullname, @sex, @address, @phoneNumber)
                `);
      }

      console.log('Account seeded successfully');
    } catch (error) {
      console.error('Error seeding Account:', error);
      throw error;
    }
  }
}

export default AccountSeeder;
