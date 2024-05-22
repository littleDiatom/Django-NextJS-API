import React from "react";
import { useFormik } from "formik";
import { login } from "../../lib/api";
import axios from "../../node_modules/axios/index";

export const LoginForm = () => {
  const handleLogout = async () => {
    try {
      await axios.get("/login/");
      alert("Logged out successfully");
    } catch {
      alert("Failed to logout.");
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const response = await login(values);
      alert("Logged successfully");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />

      <button type="submit">Connexion</button>
      <button onClick={() => handleLogout()}>Déconnexion</button>
    </form>
  );
};
