// lib/apiServices.ts
import axios from "./axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export const getHelloMessage = async () => {
  try {
    const response = await axios.get("/hello/");
    return response.data;
  } catch (error) {
    console.error("Error fetching hello message:", error);
    throw error;
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post("/login/", {
      email: data.email,
      password: data.password,
    });

    if (response.data.access) {
      Cookies.set("token", response.data.access, {
        secure: true,
        sameSite: "strict",
      });
    }

    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const register = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post("/register/", {
      email: data.email,
      password: data.password,
    });

    if (response.data.access) {
      Cookies.set("token", response.data.access, {
        secure: true,
        sameSite: "strict",
      });
    }

    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// export const getProducts = async () => {
//   try {
//     const response = await axios.get("/products/");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     throw error;
//   }
// };
