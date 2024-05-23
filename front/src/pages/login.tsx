import React from "react";
import { useFormik } from "formik";
import { login } from "../../lib/api";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values: any) => {
      try {
        const router = useRouter();
        const [route, setRoute] = useState();
        const response = await login(values);
        alert("Logged successfully");
        return Response.redirect(new URL("/products"));
      } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Please try again.");
      }
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

      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
