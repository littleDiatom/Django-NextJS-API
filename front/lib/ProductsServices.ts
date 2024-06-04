import axios from "./axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export const getProducts = async () => {
  try {
    const access_token = Cookies.get("token");

    const response = await axios.get("/products/", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const data = response.data; // type objet

    if (typeof data === "object" && data !== null) {
      const productsArray = Object.values(data);
      if (Array.isArray(productsArray)) {
        return productsArray;
      } else {
        console.error(
          "API response cannot be transformed into an array:",
          data
        );
        return [];
      }
    } else {
      console.error("API response is not an object:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getOneProduct = async (product_id: number) => {
  try {
    const access_token = Cookies.get("token");

    const response = await axios.get(`/products/${product_id}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
