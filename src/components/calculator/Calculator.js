import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../style/_calculator.scss";
import { v4 as uuid } from "uuid";

import Class from "./Class";
//animation
import { motion } from "framer-motion";
import { pageAnimation } from "../../animation";
const Calculator = ({
  defaultGradeWeight,
  setDefaultGradeWeight,
  gradeWeight,
  setGradeWeight,
  setCalculatorInput,
  calculatorInput,
  renderCount,
  setRenderCount,
  calculatorCgpaExists,
  setCalculatorCgpaExists,
  resultPublished,
  setResultPublished,
  checkReload,
  setCheckReload,
}) => {
  //states
  const [previousCgpa, setPreviousCgpa] = useState("");
  const [previousCredit, setPreviousCredit] = useState("");
  const [cgpa, setCgpa] = useState("calculate");
  //useEffect
  useEffect(() => {
    setRenderCount([" ", " ", " "]);
    const previousCr = localStorage.getItem("previousCredit");
    const previousCg = localStorage.getItem("previousCgpa");
    const resultPublish = localStorage.getItem("resultPublish");
    const checkreload = localStorage.getItem("checkReload");

    if (previousCr || previousCg) {
      setPreviousCgpa(JSON.parse(previousCg));
      setPreviousCredit(JSON.parse(previousCr));
    }
    if (resultPublish) {
      setResultPublished(resultPublish);
    }
    if (checkreload) {
      setCheckReload(checkreload);
    }
  }, []);
  useEffect(() => {
    if (resultPublished) {
      const calculatorInfo = localStorage.getItem("calculatorInput");
      if (calculatorInfo) {
        setCalculatorInput(JSON.parse(calculatorInfo));
        setRenderCount(JSON.parse(calculatorInfo));
        setCalculatorCgpaExists(false);
        setResultPublished(false);
      }
    }
  });
  //handlers
  const previousCgpaHandler = (e) => {
    setPreviousCgpa(e.target.value);
  };
  const previousCreditHandler = (e) => {
    setPreviousCredit(e.target.value);
  };

  const classRenderHandler = () => {
    setRenderCount([...renderCount, ""]);
  };
  const cgpaHandler = () => {
    localStorage.setItem("previousCgpa", JSON.stringify(previousCgpa));
    localStorage.setItem("previousCredit", JSON.stringify(previousCredit));
    let pCredit;
    let pCgpa;
    if (previousCgpa === "") {
      pCgpa = 0;
    } else {
      pCgpa = previousCgpa;
    }
    if (previousCredit === "") {
      pCredit = 0;
    } else {
      pCredit = previousCredit;
    }
    let totalPoints = pCgpa * pCredit;
    let totalCredits = parseFloat(pCredit);
    let semesterCredits = 0;
    let gpa = 0;
    let cgpa = 0;

    if (!resultPublished) {
      localStorage.setItem("calculatorInput", JSON.stringify(calculatorInput));
    }
    calculatorInput.map((calculator) => {
      gpa = gpa + calculator.gradeLetter * calculator.credit;
      semesterCredits = semesterCredits + parseFloat(calculator.credit);
      totalPoints = totalPoints + calculator.gradeLetter * calculator.credit;
      totalCredits = totalCredits + parseFloat(calculator.credit);
    });
    cgpa = totalPoints / totalCredits;
    gpa = gpa / semesterCredits;
    gpa = gpa.toFixed(4);
    cgpa = cgpa.toFixed(4);
    setCgpa(cgpa);
    if (!calculatorCgpaExists) {
      setCalculatorInput([
        ...calculatorInput,
        {
          previousCgpa: pCgpa,
          previousCredit: pCredit,
          currentCgpa: cgpa,
          semesterGpa: gpa,
        },
      ]);
      setCalculatorCgpaExists(true);
      setResultPublished(false);
    }
  };

  return (
    <motion.div
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      className="calculator-wrapper"
    >
      <div className="calculator-body">
        <div className="pCgpaCredit">
          <div className="pCredit">
            <p>Previous Credit</p>
            <input
              type="text"
              placeholder="0"
              value={previousCredit}
              onChange={previousCreditHandler}
            />
          </div>
          <div className="pCgpa">
            <p>Previous Cgpa</p>
            <input
              type="text"
              placeholder="0.00"
              value={previousCgpa}
              onChange={previousCgpaHandler}
            />
          </div>
        </div>
        <div className="classes">
          <div className="classTags">
            <p>Course</p>
            <p>Grade</p>
            <p>Credits</p>
          </div>
          <div className="courses">
            {renderCount.map((count, i) => (
              <Class
                calculatorInput={calculatorInput}
                setCalculatorInput={setCalculatorInput}
                defaultGradeWeight={defaultGradeWeight}
                calculatorCgpaExists={calculatorCgpaExists}
                setCalculatorCgpaExists={setCalculatorCgpaExists}
                resultPublished={resultPublished}
                setResultPublished={setResultPublished}
                checkReload={checkReload}
                setCheckReload={setCheckReload}
                id={i + 1}
                key={i}
              />
            ))}
          </div>
        </div>
        <div className="addClass">
          <button onClick={classRenderHandler} className="addClassBtn">
            Add Class
          </button>
        </div>
      </div>

      <Link to="/calculator/result" className="calculateBtnLink">
        <button onClick={cgpaHandler} className="calculateBtn">
          Calculate
        </button>
      </Link>
      {/* <div className="circles">
        <div className="circle1"></div>
        <div className="circle2"></div>
      </div> */}
    </motion.div>
  );
};
export default Calculator;
