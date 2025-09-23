import React from 'react';

const FeaturedProducts = () => (
  <section className="py-12 bg-base-200">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Products</h2>
      {/* TODO: Map featured products here */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Example card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
          <img src="/vite.svg" alt="Product" className="w-24 h-24 object-cover mb-4" />
          <h3 className="text-lg font-semibold mb-2">Product Name</h3>
          <p className="text-gray-500 dark:text-gray-300 mb-2">Short description</p>
          <span className="font-bold text-blue-600 dark:text-blue-400">Rp. 100.000</span>
        </div>
        {/* ...more cards */}
      </div>
    </div>
  </section>
);

export default FeaturedProducts;
