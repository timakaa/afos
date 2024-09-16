import React from "react";
import st from "./spinner.module.css";

const Spinner = () => {
  return (
    <div className={st.spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
