import { React, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../style/_calculator.scss";
import { v4 as uuid } from "uuid";

//components
import Result from "./Result";
import Class from "./Class";
//animation
import { motion } from "framer-motion";
import { pageAnimation } from "../../animation";
//redux
import { useSelector, useDispatch } from "react-redux";
//reducer
import { loadUserGrade } from "../../store/gradeweights";
import { courseAdded, resultAdded } from "../../store/calculator";
const Calculator = ({ renderCount, setRenderCount }) => {
  //redux-data
  const dispatch = useDispatch();
  const authenticated = useSelector(
    (state) => state.entities.users.authenticated
  );
  const defaultGradeWeight = useSelector((state) => state.entities.grades[0]);
  const courseInputList = useSelector(
    (state) => state.entities.calculator.courseInputList
  );

  //get current url
  const location = useLocation();
  const history = useHistory();
  const pathId = location.pathname.split("/")[2];

  //states
  const [previousCgpa, setPreviousCgpa] = useState("");
  const [previousCredit, setPreviousCredit] = useState("");
  const [cgpa, setCgpa] = useState("calculate");
  const [result, setResult] = useState([]);
  //useEffect

  useEffect(() => {
    if (authenticated) {
      const usernameInput = localStorage.getItem("cgpa101Username");
      dispatch(loadUserGrade({ usernameInput }));
    }
    if (!authenticated) {
      dispatch(loadUserGrade({ usernameInput: "default" }));
    }
  }, [authenticated]);

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

    courseInputList.map((calculator) => {
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
    dispatch(
      resultAdded({
        previousCgpa: pCgpa,
        previousCredit: pCredit,
        currentCgpa: cgpa,
        semesterGpa: gpa,
      })
    );

    history.push("/calculator/result");
  };
  return (
    <motion.div
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      className="calculator-wrapper"
    >
      {!pathId && (
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
                  defaultGradeWeight={defaultGradeWeight}
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

          <button onClick={cgpaHandler} className="calculateBtn">
            Calculate
          </button>
        </div>
      )}
      {pathId && <Result calculatorInput={courseInputList} />}
      {/* <div className="circles">
        <div className="circle1"></div>
        <div className="circle2"></div>
      </div> */}
    </motion.div>
  );
};
export default Calculator;
