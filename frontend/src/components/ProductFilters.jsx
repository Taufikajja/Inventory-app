import React, { useState, useEffect } from 'react';

const ProductFilters = ({ onPriceFilter, onSearch, onCategory, darkMode }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/category');
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (err) {
        // ignore error
      }
    };
    fetchCategories();
  }, []);

  const handlePriceChange = (e) => {
    if (onPriceFilter) onPriceFilter(e.target.value);
  };
  const handleSearchChange = (e) => {
    if (onSearch) onSearch(e.target.value);
  };
  const handleCategoryChange = (e) => {
    if (onCategory) onCategory(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
      <input type="text" placeholder="Cari Produk" className="border p-2 rounded w-full md:w-1/3" onChange={handleSearchChange} />
  <select className={`border p-2 rounded w-full md:w-1/4 ${darkMode ? 'bg-gray-800 text-white' : 'primary-light-3 text-black'}`} onChange={handleCategoryChange}>
        <option value="">Semua Kategori</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat.categoryName}>{cat.categoryName}</option>
        ))}
      </select>
  <select className={`border p-2 rounded w-full md:w-1/4 ${darkMode ? 'bg-gray-800 text-white' : 'primary-light-3 text-black'}`} onChange={handlePriceChange}>
        <option value="">Urutkan berdasarkan Harga</option>
        <option value="asc">Terendah</option>
        <option value="desc">Tertinggi</option>
      </select>
    </div>
  );
};
export default ProductFilters;
