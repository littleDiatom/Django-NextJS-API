import React from "react";
import { useFormik } from "formik";
import { login } from "../../lib/UserServices";
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "./components/Navbar";
import bgStyles from "../styles/bg.module.css";
import fontStyles from "../styles/font.module.css";

const LoginForm = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values: any) => {
      try {
        const response = await login(values);
        alert("Logged successfully");
        router.push("/products");
      } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Please try again.");
      }
    },
  });

  return (
    <div className={bgStyles.backgroundImage}>
      <Navbar />
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center pt-40 "
      >
        <label className="input input-bordered flex items-center gap-2 mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70 text-[#5087b1]"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            id="email"
            name="email"
            type="email"
            className="grow w-80"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70 text-[#5087b1]"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Mot de passe"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="w-80 "
          />
        </label>
        <button
          className={`mb-10 bg-[#5087b1] text-[#EEEEEE] hover:bg-[#366d97] w-[200px] h-[40px] rounded-md ${fontStyles.secondaryFont} ${fontStyles.corps} xs:max-sm:w-[250px] xs:max-sm:h-[40px] sm:max-sm:btn-sm md:max-md:btn-md`}
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
