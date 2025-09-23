import React from 'react';

const Navbar = () => (
  <nav className="bg-base-300 text-base-content shadow py-4">
    <div className="container mx-auto flex justify-between items-center">
      <a href="/" className="flex items-center gap-2 text-xl font-bold">
        <img src="/vite.svg" alt="Logo" className="w-8 h-8" /> InventoryApp
      </a>
      <div className="flex gap-6 items-center">
        <a href="/products" className="hover:underline">Products</a>
        <a href="/contact" className="hover:underline">Contact</a>
        <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Login</a>
      </div>
    </div>
  </nav>
);

export default Navbar;
