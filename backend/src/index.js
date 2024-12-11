import express from 'express';
import cors from 'cors';
import { PORT } from './configs/env.js';
import { connectDB } from './utils/database.js';
import productRoutes from './routes/product.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', productRoutes);

// Connect to database
await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
