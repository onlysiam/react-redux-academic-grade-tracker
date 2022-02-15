import React, { useState, useEffect } from "react";
import "../../style/_gradecard.scss";
import Coursesdetails from "./Coursedetails";

const Gradecard = ({ grade }) => {
  //state

  return (
    <div className="card">
      <div className="fRow">
        <h1>{grade.name}</h1>
        <h1>{grade.count}</h1>
      </div>
      <p>Grade Counts</p>
    </div>
  );
};
export default Gradecard;
