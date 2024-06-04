import React, { useEffect, useState } from "react";
import { getProducts } from "../../../lib/ProductsServices";
import Navbar from "./../components/Navbar";
import bgStyles from "../../styles/bg.module.css";

const style = {
  width: 297,
  height: 296,
};

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface DisplayProductProps {
  items: Product[];
}

const DisplayProduct: React.FC<DisplayProductProps> = ({ items }) => {
  if (!Array.isArray(items)) {
    return <p>No products available.</p>;
  }
  return (
    <ul className="text-[#EEEEEE]">
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
        console.log(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={bgStyles.backgroundImage}>
      <Navbar />
      <h1 className="text-[#EEEEEE]">Product List</h1>
      <DisplayProduct items={products} />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "linear-gradient(to bottom, #16235e 0%, #020223 100%)",
        }}
      ></div>
    </div>
  );
};

export default ProductsPage;
