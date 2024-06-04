import React from "react";
import styles from "../../styles/font.module.css";

export default function Navbar() {
  return (
    <nav>
      <h1 className={`${styles.mainFont} text-[#E8E8E8] p-5 pl-10`}>
        Plankton catcher
      </h1>
    </nav>
  );
}
