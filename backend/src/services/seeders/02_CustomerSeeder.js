import CustomerFactory from '../factories/CustomerFactory.js';
import db from '../../configs/db.js';
import sql from 'mssql';

class CustomerSeeder {
  static async run() {
    try {
      console.log('Seeding Customer...');

      // Lấy danh sách Account_ID từ bảng Account
      const request = new sql.Request(db);
      const accountResult = await request.query(
        'SELECT Account_ID FROM Account'
      );
      const accountIds = accountResult.recordset;

      if (accountIds.length === 0) {
        throw new Error('No Account records found to create Customers');
      }

      const customers = CustomerFactory.generate(accountIds.length, accountIds);

      for (const customer of customers) {
        const insertRequest = new sql.Request(db);

        // Thêm parameters với tên chính xác
        insertRequest.input('Account_ID', sql.Int, customer.Account_ID);
        insertRequest.input('Email', sql.NVarChar, customer.Email);
        insertRequest.input('Bdate', sql.Date, customer.Bdate);
        insertRequest.input('CurrentPoint', sql.Int, customer.CurrentPoint);
        insertRequest.input('TotalPoint', sql.Int, customer.TotalPoint);
        insertRequest.input('Level', sql.Int, customer.Level);

        // Thực hiện query với tên tham số chính xác
        await insertRequest.query(`
                    INSERT INTO Customer (Account_ID, Email, Bdate, CurrentPoint, TotalPoint, Level)
                    VALUES (@Account_ID, @Email, @Bdate, @CurrentPoint, @TotalPoint, @Level)
                `);
      }

      console.log('Customer seeded successfully');
    } catch (error) {
      console.error('Error seeding Customer:', error);
      throw error;
    }
  }
}

export default CustomerSeeder;
