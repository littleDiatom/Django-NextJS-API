import React, { useState, useEffect } from "react";
import { getPlanktons } from "../../lib/PlanktonsServices";
import { Plankton, DisplayPlanktonProps } from "../../lib/interfaces";
import { useRouter } from "next/router";
import Navbar from "./components/Navbar";
import bgStyles from "../styles/bg.module.css";
import fontStyles from "../styles/font.module.css";

const Index: React.FC = () => {
  const router = useRouter();

  const navigateToLogin = () => {
    return router.push("/login");
  };

  const navigateToRegister = () => {
    return router.push("/register");
  };

  return (
    <div className={bgStyles.backgroundImage}>
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-40">
        <button
          onClick={navigateToLogin}
          className={`mb-10 bg-[#F6E8FA] text-[#505050] hover:bg-[#EBD3F2] w-[358px] h-[40px] rounded-md ${fontStyles.mainFont} ${fontStyles.corps} xs:max-sm:w-[250px] xs:max-sm:h-[40px] sm:max-sm:btn-sm md:max-md:btn-md`}
        >
          Se connecter
        </button>
        <button
          onClick={navigateToRegister}
          className={`mb-10 bg-[#F6E8FA] text-[#505050] hover:bg-[#EBD3F2] w-[358px] h-[40px] rounded-md ${fontStyles.mainFont} ${fontStyles.corps} xs:max-sm:w-[250px] xs:max-sm:h-[40px] sm:max-sm:btn-sm md:max-md:btn-md`}
        >
          S'inscrire
        </button>
      </div>
    </div>
  );
};

export default Index;
