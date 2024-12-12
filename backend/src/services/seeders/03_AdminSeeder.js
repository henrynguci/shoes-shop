import AdminFactory from '../factories/AdminFactory.js';
import AccountFactory from '../factories/AccountFactory.js';

class AdminSeeder {
    static async run(pool) {
        try {
            console.log('Seeding Admin...');

            // Tạo 2 account mới
            const accounts = await AccountFactory.generate(2);
            const accountIds = [];

            // Thêm các account mới
            for (const account of accounts) {
                const result = await pool.request()
                    .input('Username', account.Username)
                    .input('Password', account.Password)
                    .input('Fullname', account.Fullname)
                    .input('Sex', account.Sex)
                    .input('Address', account.Address)
                    .input('PhoneNumber', account.PhoneNumber)
                    .query(`
                        INSERT INTO Account (Username, Password, Fullname, Sex, Address, PhoneNumber)
                        OUTPUT INSERTED.Account_ID
                        VALUES (@Username, @Password, @Fullname, @Sex, @Address, @PhoneNumber)
                    `);
                accountIds.push(result.recordset[0].Account_ID);
            }

            // Tạo admin với các account mới
            const admins = AdminFactory.generate(accountIds.length);

            for (let i = 0; i < admins.length; i++) {
                const admin = admins[i];
                await pool.request()
                    .input('Account_ID', accountIds[i])
                    .input('Admin_code', admin.Admin_code)
                    .query(`
                        INSERT INTO Admin (Account_ID, Admin_code)
                        VALUES (@Account_ID, @Admin_code)
                    `);
            }

            console.log('Admin seeded successfully');
        } catch (error) {
            console.error('Error seeding Admin:', error);
            throw error;
        }
    }
}

export default AdminSeeder;
