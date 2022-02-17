import { React, useState, useEffect } from "react";
import "../../style/_classresult.scss";
import { v4 as uuid } from "uuid";
const Classresult = ({ calculatorInput, id }) => {
  //states
  const [tmpCalculatorInput, setTmpCalculatorInput] = useState("");
  //handlers

  //useEffect
  useEffect(() => {
    calculatorInput.map((calculatorInfo, i) => {
      if (i === id) {
        setTmpCalculatorInput(calculatorInfo);
      }
    });
  }, []);
  return (
    <div className="classresult-body">
      <p>{tmpCalculatorInput.course}</p>
      <p id="classResultGrade">{tmpCalculatorInput.grade}</p>
      <p id="classResultCredit">{tmpCalculatorInput.credit}</p>
    </div>
  );
};
export default Classresult;
