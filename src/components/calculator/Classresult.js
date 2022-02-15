import { React, useState, useEffect } from "react";
import "../../style/_classresult.scss";
import { v4 as uuid } from "uuid";
const Classresult = ({
  calculatorInput,
  setCalculatorInput,
  id,
  setResultPublished,
  resultPublished,
  checkReload,
  setCheckReload,
}) => {
  //states
  const [tmpCalculatorInput, setTmpCalculatorInput] = useState("");
  //handlers

  //useEffect
  useEffect(() => {
    localStorage.setItem("resultPublish", JSON.stringify(resultPublished));

    localStorage.setItem("checkReload", JSON.stringify(checkReload));
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
