import React, { useState, useEffect } from "react";
import "../../style/_coursedetails.scss";

const Coursesdetails = ({
  allSemesterInfo,
  setAllSemesterInfo,
  defaultGradeWeight,
}) => {
  //state
  const [checkGradeInput, setCheckGradeInput] = useState(false);
  const [checkCreditInput, setCheckCreditInput] = useState(false);

  const [checkActiveStatus, setCheckActiveStatus] = useState(true);

  const [course, setCourse] = useState("");
  const [grade, setGrade] = useState("A");
  const [gradeLetter, setGradeLetter] = useState("");
  const [credit, setCredit] = useState(3.0);
  //handlers
  const selectHideHandler = (e) => {
    setGrade(e.target.value);
    setCheckGradeInput(true);
  };
  const inputHandlerName = (e) => {
    setCourse(e.target.value);
  };
  const inputHandlerCredit = (e) => {
    setCredit(e.target.value);
    setCheckCreditInput(true);
  };
  const activeStatusHandler = () => {
    setCheckActiveStatus(!checkActiveStatus);
  };

  return (
    <div className="coursedetailsBody">
      <h1 className="courseNameHeader">CSE115</h1>
      <div className="coursedetailsContainer">
        <div className="courseDetails">
          <div className="coursename">
            <p>Name</p>
            <input type="text" />
          </div>

          <div className="details">
            <div className="cgpaAndGpa">
              <div>
                <h1>Semester Gpa</h1>
                <p>1.000</p>
              </div>
              <div>
                <h1>Cumulative Gpa</h1>
                <p>2.177</p>
              </div>
            </div>

            <div className="GradeCredit">
              <div className="creditGrade">
                <div className="credithour">
                  <p>Credit Hours</p>
                  <input
                    type="number"
                    onChange={inputHandlerCredit}
                    value={credit}
                  />
                </div>

                <div className="gradeinput">
                  <p>Grade</p>
                  <select
                    onChange={selectHideHandler}
                    name=""
                    id=""
                    value={grade}
                  >
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="B-">B-</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="C-">C-</option>
                    <option value="D+">D+</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="activeStatus">
              <p>Active?</p>
              <div
                onClick={activeStatusHandler}
                className={`barBtn ${
                  checkActiveStatus ? "active-barBtn" : "barBtn"
                }`}
              >
                <div
                  onClick={activeStatusHandler}
                  className={`circleBtn ${
                    checkActiveStatus ? "active-circleBtn" : "circleBtn"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Coursesdetails;
