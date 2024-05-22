import React, { useEffect, useState } from "react";
import { getProducts } from "../../lib/api";

const productsPage = () => {
  const [Products, setProducts] = useState([]);
  console.log(Products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const Products = await getProducts();
        setProducts(Products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {Products.map((Product, index) => (
          <li key={index}>{Product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default productsPage;
