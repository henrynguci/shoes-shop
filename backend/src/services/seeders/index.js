import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connectDB } from '../../configs/db.js';
import sql from 'mssql';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function clearAllTables(pool) {
    try {
        console.log('Đang xóa dữ liệu từ tất cả các bảng...');

        // Tắt tạm thời ràng buộc khóa ngoại
        await pool.request().query('EXEC sp_MSforeachtable "ALTER TABLE ? NOCHECK CONSTRAINT ALL"');

        // Danh sách các bảng theo thứ tự xóa (ngược với thứ tự tạo)
        const tables = [
            'Rate', 'Receipt', 'Notification', 'Payment', 'OrderProduct',
            'Order', 'Shipper', 'Voucher', 'Can_use', 'PromotionProduct',
            'PromotionOrder', 'Promotion', 'Version', 'Product_Img', 'Product',
            'Brand', 'Add_to_cart', 'Customer', 'Admin', 'Account'
        ];

        // Xóa dữ liệu từ mỗi bảng
        for (const table of tables) {
            await pool.request().query(`DELETE FROM [${table}]`);
            console.log(`Đã xóa dữ liệu từ bảng ${table}`);
        }

        // Bật lại ràng buộc khóa ngoại
        await pool.request().query('EXEC sp_MSforeachtable "ALTER TABLE ? WITH CHECK CHECK CONSTRAINT ALL"');

        console.log('Đã xóa thành công dữ liệu từ tất cả các bảng');
    } catch (error) {
        console.error('Lỗi khi xóa dữ liệu:', error);
        throw error;
    }
}

async function runSeeders() {
    let pool;
    try {
        // Kết nối database
        pool = await connectDB();
        console.log('Kết nối database thành công');

        // Xóa dữ liệu cũ trước khi seed
        await clearAllTables(pool);

        // Đọc tất cả file seeder theo thứ tự
        const seedFiles = (await readdir(__dirname))
            .filter(file => file.endsWith('Seeder.js'))
            .filter(file => file !== 'index.js')
            .sort();

        console.log('Tìm thấy các file seeder:', seedFiles);

        // Chạy các seeder theo thứ tự
        for (const file of seedFiles) {
            console.log(`Đang chạy seeder: ${file}`);
            const modulePath = `file://${join(__dirname, file)}`;
            const { default: Seeder } = await import(modulePath);
            await Seeder.run(pool);
        }

        console.log('Tất cả các seeder đã chạy thành công');
    } catch (error) {
        console.error('Lỗi khi chạy seeder:', error);
        process.exit(1);
    } finally {
        if (pool) {
            await pool.close();
            console.log('Đã đóng kết nối database');
        }
        process.exit(0);
    }
}

runSeeders();
