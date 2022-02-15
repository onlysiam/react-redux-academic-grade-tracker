import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../style/_result.scss";
import { v4 as uuid } from "uuid";
import Classresult from "./Classresult";
//animation
import { motion } from "framer-motion";
import { pageAnimation } from "../../animation";
const Result = ({
  calculatorInput,
  setCalculatorInput,
  renderCount,
  setRenderCount,
  setResultPublished,
  resultPublished,
  checkReload,
  setCheckReload,
}) => {
  //states
  const [tmpCalculatorInput, setTmpCalculatorInput] = useState([]);
  const [tmpRenderCount, setTmpRenderCount] = useState("");
  const [tmpCgpaInput, setTmpCgpaInput] = useState("");
  //handlers
  //useEffect
  useEffect(() => {
    setTmpRenderCount(calculatorInput.length);
    const calculatorInfo = localStorage.getItem("calculatorInput");
    setTmpCalculatorInput(JSON.parse(calculatorInfo));
    setResultPublished(true);
    setCheckReload(true);
  }, []);
  useEffect(() => {
    calculatorInput.map((calculatorInfo, i) => {
      if (i === tmpRenderCount - 1) {
        setTmpCgpaInput(calculatorInfo);
      }
    });
  }, [tmpRenderCount]);
  return (
    <motion.div
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      className="result-wrapper"
    >
      <div className="calculator-body">
        <div className="pCgpaCredit">
          <div className="pCredit">
            <p>Previous Credit: {tmpCgpaInput.previousCredit}</p>
          </div>
          <div className="pCgpa">
            <p>Previous CGPA: {tmpCgpaInput.previousCgpa}</p>
          </div>
        </div>
        <div className="classcgc">
          <div className="classTags">
            <p>Course</p>
            <p>Grade</p>
            <p>Credits</p>
          </div>
          <div className="courses">
            {tmpCalculatorInput.map((count, i) => (
              <Classresult
                calculatorInput={calculatorInput}
                setCalculatorInput={setCalculatorInput}
                resultPublished={resultPublished}
                setResultPublished={setResultPublished}
                checkReload={checkReload}
                setCheckReload={setCheckReload}
                id={i}
              />
            ))}
          </div>
        </div>
        <div className="finalCgpa">
          <p>Semester GPA: {tmpCgpaInput.semesterGpa}</p>
          <p>Cumulative GPA: {tmpCgpaInput.currentCgpa}</p>
        </div>
      </div>

      <button className="calculateBtn">Save</button>
    </motion.div>
  );
};
export default Result;
