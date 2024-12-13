import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './configs/db.js';
import productRoutes from './routes/product.routes.js';
import authRoutes from './routes/auth.routes.js';
import cartRoutes from './routes/cart.routes.js';
import voucherRoutes from './routes/voucher.routes.js';
import orderRoutes from './routes/order.routes.js';
import brandRoutes from './routes/brand.routes.js';

// Load biến môi trường từ .env
dotenv.config();
const PORT = process.env.PORT || 3000;

// Load biến môi trường từ .env
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', productRoutes);
app.use('/api', authRoutes);
app.use('/api', cartRoutes);
app.use('/api', voucherRoutes);
app.use('/api', orderRoutes);
app.use('/api', brandRoutes);

// Connect to database
await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
