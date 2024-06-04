import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getOneProduct } from "../../../lib/ProductsServices";

const Product = () => {
  const router = useRouter();
  const { id } = router.query;

  const [Product, setProduct] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const Product = await getOneProduct(id);
        setProduct(Product);
      } catch (error) {
        console.error("Failed to fetch the product:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <p>product id: {id}</p>
      {Product.name}
      <br />
      {Product.description}
      <br />
      <p>{Product.price}€</p>
    </div>
  );
};

export default Product;
