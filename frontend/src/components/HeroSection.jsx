import React from 'react';

const HeroSection = () => (
  <section className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-blue-600 to-blue-400 text-white">
    <h1 className="text-5xl font-bold mb-4">Welcome to InventoryApp</h1>
    <p className="text-xl mb-8 max-w-xl text-center">Manage your inventory, explore products, and experience a professional platform for your business.</p>
    <a href="/products" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-100 transition">Explore Products</a>
  </section>
);

export default HeroSection;
