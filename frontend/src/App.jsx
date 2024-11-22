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
