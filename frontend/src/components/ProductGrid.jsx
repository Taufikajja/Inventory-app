import React, { useState, useEffect } from 'react';
import ProductDetailCard from './ProductDetailCard';

const ProductGrid = ({ priceOrder, searchTerm, category }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("pos-token");
        const res = await fetch('http://localhost:3000/api/products', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        const data = await res.json();
        if (data.success) {
          // Map backend data to frontend format
          setProducts(data.products.map(p => ({
            id: p._id,
            name: p.name,
            image: p.image ? `http://localhost:3000/uploads/${p.image}` : '/vite.svg',
            price: p.price,
            category: p.categoryId?.categoryName || '-',
            description: p.description,
            stock: p.stock,
          })));
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  // Filter products by name and category
  let filteredProducts = [...products];
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  // Sort products by priceOrder before rendering
  if (priceOrder === 'asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (priceOrder === 'desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (loading) return <div className="text-center py-8">Loading products...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center cursor-pointer hover:scale-105 transition"
            onClick={() => setSelectedProduct(product)}
          >
            <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-4" />
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <span className="font-bold text-blue-600 dark:text-blue-400">Rp. {product.price.toLocaleString()}</span>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center z-50" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-xl font-bold bg-red-500 text-white rounded px-3 py-1" onClick={() => setSelectedProduct(null)}>
              X
            </button>
            <ProductDetailCard product={selectedProduct} />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
