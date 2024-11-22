#!/bin/bash

echo "🚀 Starting Shoes Shop Project initialization..."

# Tạo cấu trúc thư mục
echo "📁 Creating directory structure..."
mkdir -p backend/src/{config,controllers,middlewares,models,routes,services,utils}
mkdir -p frontend/src/{assets,components,pages,redux,services,utils,hooks}

# Khởi tạo backend
echo "⚙️ Initializing backend..."
cd backend
npm init -y

# Cập nhật package.json của backend
jq '.scripts = {
  "start": "node src/app.js",
  "dev": "nodemon src/app.js"
}' package.json > temp.json && mv temp.json package.json

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install express mssql bcryptjs jsonwebtoken cors dotenv express-validator multer winston
npm install --save-dev nodemon

# Tạo file app.js
echo "📝 Creating backend app.js..."
cat > src/app.js << 'END'
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Shoes Shop API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
END

# Tạo file .env cho backend
echo "🔒 Creating backend .env file..."
cat > .env << 'END'
PORT=5000
DB_SERVER=localhost
DB_DATABASE=shoesshop
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
END

# Khởi tạo frontend
echo "🎨 Initializing frontend..."
cd ../frontend
npx create-react-app .

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install react-router-dom @reduxjs/toolkit react-redux axios formik yup tailwindcss @headlessui/react @heroicons/react

# Quay lại thư mục gốc
cd ..

# Tạo file .gitignore
echo "🔍 Creating .gitignore..."
cat > .gitignore << 'END'
# Dependencies
node_modules/
/.pnp
.pnp.js

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build
/build
/dist

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
END

# Tạo README.md
echo "📚 Creating README.md..."
cat > README.md << 'END'
# Shoes Shop B2C

A full-stack e-commerce application for shoes shopping built with React, Express, Node.js, and SQL Server.

## Project Structure

- `/backend` - Express.js server
- `/frontend` - React.js client

## Getting Started

### Prerequisites

- Node.js
- SQL Server
- npm

### Installation

1. Clone the repository
2. Install backend dependencies:
cd backend
npm install

3. Install frontend dependencies:
cd frontend
npm install

## Running the application

1. Start backend server:
cd backend
npm start
2. Start frontend development server:
cd frontend
npm start


## Features

- User authentication
- Product catalog
- Shopping cart
- Order management
- Admin dashboard
END

# Git initialization
echo "🔧 Initializing git repository..."
git add .
git commit -m "refactor: init project structure with backend and frontend setup"
git push -u origin refactor/initproject

echo "✅ Project initialization completed!"
echo "🎉 You can now start developing your Shoes Shop application!"
