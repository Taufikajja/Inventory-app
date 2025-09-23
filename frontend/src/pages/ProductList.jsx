import React, { useState } from "react";
import ProductGrid from "../components/ProductGrid";
import ProductFilters from "../components/ProductFilters";

const ProductList = () => {
  const [priceOrder, setPriceOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <div className="container mx-auto py-8">
        <ProductFilters onPriceFilter={setPriceOrder} onSearch={setSearchTerm} onCategory={setCategory} />
        <ProductGrid priceOrder={priceOrder} searchTerm={searchTerm} category={category} />
      </div>
    </div>
  );
};

export default ProductList;
