import React, { useState } from "react";
import ProductGrid from "../components/ProductGrid";
import ProductFilters from "../components/ProductFilters";

const ProductList = ({ darkMode }) => {
  const [priceOrder, setPriceOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <div className="container mx-auto py-8">
        <ProductFilters onPriceFilter={setPriceOrder} onSearch={setSearchTerm} onCategory={setCategory} darkMode={darkMode} />
        <ProductGrid
          priceOrder={priceOrder}
          searchTerm={searchTerm}
          category={category}
          darkMode={darkMode}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
        />
        {/* Pagination controls */}
        <div className="flex justify-center mt-6 gap-2">
          {/* ProductGrid will need to expose totalItems via a callback or you can move pagination logic to ProductList for more control */}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
