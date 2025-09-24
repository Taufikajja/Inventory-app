import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Root from './utils/Root';
import Login from './pages/Login';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
import Categories from './components/Categories';
import Suppliers from './components/Suppliers';
import Logout from './pages/Logout';
import DashboardCpn from './components/dashboard_cpn';
import Products from './components/Products';
import Users from './components/Users';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import React, { useState, useEffect } from 'react';


function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className={`font ${darkMode ? 'dark primary-dark-2 text-white' : 'primary-light-1 text-gray-900'}`}>
      <Router>
        {/* Navbar hanya tampil di halaman publik/customer, tidak di admin dashboard */}
  {window.location.pathname.startsWith('/admin-dashboard') ? null : <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductList darkMode={darkMode} />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact darkMode={darkMode} />} />
          <Route path="/login" element={<Login darkMode={darkMode} />} />
          
          {/* Admin dashboard routes */}
          <Route path="/admin-dashboard" element={<ProtectedRoutes requireRole={["admin"]}>
            <Dashboard />
          </ProtectedRoutes>
        }>
            <Route index element={<h1>{<DashboardCpn />}</h1>} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="orders" element={<h1>Orders</h1>} />
            <Route path="users" element={<Users />} />
            <Route path="profile" element={<h1>Profile</h1>} />
            <Route path="logout" element={<Logout />} />
          </Route>
          <Route path="/customer-dashboard" element={<h1>customer dashboard</h1>} />
          <Route path="/unauthorized" element={<p className='font-bold text-3xl mt-20 ml-20'>Unauthorized</p>} />
        </Routes>
      </Router>
    </div>
  );
}

export const useAuth = () => useContext(AuthContext);
export default App
