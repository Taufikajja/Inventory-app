import React, { useState, useEffect } from 'react';
import ProductDetailCard from './ProductDetailCard';

const ProductGrid = ({ priceOrder, searchTerm, category, darkMode, currentPage = 1, itemsPerPage = 4, setCurrentPage }) => {
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
            image: p.image ? `http://localhost:3000/uploads/${p.image}` : '/logo-black.png',
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

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIdx, endIdx);

  if (loading) return <div className="text-center py-8">Loading produk...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className={`${darkMode ? 'bg-gray-800 text-white' : 'primary-light-3 text-black'} rounded-lg shadow p-6 flex flex-col items-center cursor-pointer hover:scale-105 transition`}
            onClick={() => setSelectedProduct(product)}
          >
            <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-4 rounded" />
            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
            <span className="font-bold text-blue-700">Rp. {product.price.toLocaleString()}</span>
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {selectedProduct && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center z-50" onClick={() => setSelectedProduct(null)}>
          <div className={`${darkMode ? 'primary-light-1 text-white' : 'primary-dark-2 text-white'} p-0.5 rounded-lg shadow-lg relative max-w-2xl w-full`} onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-xl font-bold bg-red-500 text-white rounded px-3 py-1" onClick={() => setSelectedProduct(null)}>
              X
            </button>
            <ProductDetailCard product={selectedProduct} darkMode={darkMode} />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
