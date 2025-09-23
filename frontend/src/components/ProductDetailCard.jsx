import React from 'react';

const ProductDetailCard = ({ product }) => {
  if (!product) return null;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 flex flex-col md:flex-row gap-8 items-center">
      <img src={product.image} alt={product.name} className="w-64 h-64 object-cover rounded-lg" />
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-500 dark:text-gray-300 mb-2">Category: <span className="font-semibold">{product.category}</span></p>
        <p className="mb-4">{product.description}</p>
        <span className="font-bold text-blue-600 dark:text-blue-400 text-2xl">Rp. {product.price.toLocaleString()}</span>
        <div className="mt-4">Stock: <span className="font-semibold">{product.stock}</span></div>
      </div>
    </div>
  );
};

export default ProductDetailCard;
