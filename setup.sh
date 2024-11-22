#!/bin/bash

# Tạo cấu trúc thư mục cho Backend
echo "Creating backend directory structure..."

# Backend directories
mkdir -p backend/src/{configs,controllers,middlewares,models,routes,services,utils,validations}

# Tạo các file mẫu trong configs
cat >backend/src/configs/database.js <<EOL
export const dbConfig = {
  user: 'your_username',
  password: 'your_password',
  server: 'localhost',
  database: 'shoes_shop',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};
EOL

cat >backend/src/configs/env.js <<EOL
export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
EOL

# Tạo file mẫu trong controllers
cat >backend/src/controllers/product.controller.js <<EOL
export const getAllProducts = async (req, res) => {
  try {
    res.status(200).json({ message: 'Get all products' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
EOL

# Tạo file mẫu trong middlewares
cat >backend/src/middlewares/auth.middleware.js <<EOL
export const authMiddleware = async (req, res, next) => {
  // Authentication logic here
  next();
};
EOL

# Tạo file mẫu trong models
cat >backend/src/models/product.model.js <<EOL
export class Product {
  constructor() {
    // Product model definition
  }
}
EOL

# Tạo file mẫu trong routes
cat >backend/src/routes/product.routes.js <<EOL
import express from 'express';
import { getAllProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/products', getAllProducts);

export default router;
EOL

# Tạo file mẫu trong services
cat >backend/src/services/product.service.js <<EOL
export class ProductService {
  async getAllProducts() {
    // Service logic here
  }
}
EOL

# Tạo file mẫu trong utils
cat >backend/src/utils/database.js <<EOL
import sql from 'mssql';
import { dbConfig } from '../configs/database.js';

export const connectDB = async () => {
  try {
    await sql.connect(dbConfig);
    console.log('Connected to SQL Server');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};
EOL

# Tạo file mẫu trong validations
cat >backend/src/validations/product.validation.js <<EOL
export const validateProduct = (data) => {
  // Validation logic here
};
EOL

# Update app.js
cat >backend/src/app.js <<EOL
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
connectDB();

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
EOL

# Tạo cấu trúc thư mục cho Frontend
echo "Creating frontend directory structure..."

# Frontend directories
mkdir -p frontend/src/{assets,components,contexts,hooks,layouts,pages,services,utils}

# Tạo file mẫu trong components
cat >frontend/src/components/Button.jsx <<EOL
import React from 'react';

export const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};
EOL

# Tạo file mẫu trong contexts
cat >frontend/src/contexts/AuthContext.jsx <<EOL
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
EOL

# Tạo file mẫu trong hooks
cat >frontend/src/hooks/useApi.js <<EOL
import { useState, useEffect } from 'react';

export const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // API logic here
  }, [url]);

  return { data, loading, error };
};
EOL

# Tạo file mẫu trong layouts
cat >frontend/src/layouts/MainLayout.jsx <<EOL
import React from 'react';

export const MainLayout = ({ children }) => {
  return (
    <div>
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};
EOL

# Tạo file mẫu trong pages
cat >frontend/src/pages/Home.jsx <<EOL
import React from 'react';

export const Home = () => {
  return <div>Home Page</div>;
};
EOL

# Tạo file mẫu trong services
cat >frontend/src/services/api.js <<EOL
const API_URL = 'http://localhost:5000/api';

export const fetchProducts = async () => {
  const response = await fetch(\`\${API_URL}/products\`);
  return response.json();
};
EOL

# Tạo file mẫu trong utils
cat >frontend/src/utils/helpers.js <<EOL
export const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};
EOL

# Update App.jsx
cat >frontend/src/App.jsx <<EOL
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <MainLayout>
        <Home />
      </MainLayout>
    </AuthProvider>
  );
}

export default App;
EOL

echo "Project structure created successfully!"
EOL
