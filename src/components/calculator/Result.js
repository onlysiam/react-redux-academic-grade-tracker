import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../style/_result.scss";
import { v4 as uuid } from "uuid";
import Classresult from "./Classresult";
//animation
import { motion } from "framer-motion";
import { pageAnimation } from "../../animation";
//redux
import { useSelector } from "react-redux";
const Result = ({ calculatorInput }) => {
  //handlers
  //useEffect
  const resultList = useSelector(
    (state) => state.entities.calculator.resultList
  );
  const result = resultList && resultList[0];
  console.log(result);
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
            <p>Previous Credit: {result.previousCredit}</p>
          </div>
          <div className="pCgpa">
            <p>Previous CGPA: {result.previousCgpa}</p>
          </div>
        </div>
        <div className="classcgc">
          <div className="classTags">
            <p>Course</p>
            <p>Grade</p>
            <p>Credits</p>
          </div>
          <div className="courses">
            {calculatorInput.map((count, i) => (
              <Classresult calculatorInput={calculatorInput} id={i} />
            ))}
          </div>
        </div>
        <div className="finalCgpa">
          <p>Semester GPA: {result.semesterGpa}</p>
          <p>Cumulative GPA: {result.currentCgpa}</p>
        </div>
      </div>

      <button className="calculateBtn">Save</button>
    </motion.div>
  );
};
export default Result;
