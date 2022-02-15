import React, { useState, useEffect, useRef } from "react";
//style
import "../../style/_addcourse.scss";
//animation
import { motion } from "framer-motion";
import { addCourseAnimation } from "../../animation";
//data
import gradeWeight from "../../util";
//redux
import { useDispatch } from "react-redux";
import { addcourse } from "../../store/courses";
import { courseWindow, courseWindowToggle } from "../../store/courseWindow";
const Addcourse = ({ semester }) => {
  const dispatch = useDispatch();
  //states
  const [checkGradeInput, setCheckGradeInput] = useState(false);
  const [checkCreditInput, setCheckCreditInput] = useState(false);

  const [gradeWeights, setGradeweights] = useState(gradeWeight);

  const [course, setCourse] = useState("");
  const [grade, setGrade] = useState("A");
  const [gradePoint, setGradePoint] = useState(4.0);
  const [credit, setCredit] = useState(3.0);

  const inputElement = useRef(null);
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);
  //handlers
  const selectHideHandler = (e) => {
    setGrade(e.target.value);
    setCheckGradeInput(true);
    const gradePoints = gradeWeights.filter(
      (grade) => grade.name === e.target.value
    );
    setGradePoint(gradePoints[0].value);
  };
  const inputHandlerName = (e) => {
    setCourse(e.target.value.toUpperCase());
  };
  const inputHandlerCredit = (e) => {
    setCredit(e.target.value);
    setCheckCreditInput(true);
  };
  const addCourseHandler = (e) => {
    e.preventDefault();
    dispatch(
      addcourse({ course, credit, grade, gradePoint, semester, user: "siam" })
    );
    dispatch(courseWindowToggle());
  };
  const cancelCourseHandler = (e) => {
    e.preventDefault();
    dispatch(courseWindowToggle());
  };
  return (
    <motion.div
      exit="exit"
      variants={addCourseAnimation}
      initial="hidden"
      animate="show"
      className="addCourse"
    >
      <form action="">
        <h1>Add Course</h1>
        <div className="courseName">
          <input
            ref={inputElement}
            onChange={inputHandlerName}
            value={course}
            required
            type="text"
            placeholder="Course name"
          />
        </div>

        <div className="creditGrade">
          <div className="credithour">
            <p>Credit Hours</p>
            <input
              className={`creditInput ${
                checkCreditInput ? "active-creditInput" : ""
              }`}
              onChange={inputHandlerCredit}
              value={credit}
              type="text"
            />
          </div>

          <div className="gradeinput">
            <p>Grade</p>
            <select
              onChange={selectHideHandler}
              name=""
              id=""
              value={grade}
              className={`select ${checkGradeInput ? "active-select" : ""}`}
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
        <button onClick={addCourseHandler}>Add</button>
      </form>
    </motion.div>
  );
};
export default Addcourse;
