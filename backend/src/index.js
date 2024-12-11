import express from 'express';
import cors from 'cors';
import { PORT } from './configs/env.js';
import { connectDB } from './utils/database.js';
import productRoutes from './routes/product.routes.js';
import authRoutes from './routes/auth.routes.js';
import cartRoutes from './routes/cart.routes.js';
import voucherRoutes from './routes/voucher.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', productRoutes);
app.use('/api', authRoutes);
app.use('/api', cartRoutes);
app.use('/api', voucherRoutes);

// Connect to database
await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
