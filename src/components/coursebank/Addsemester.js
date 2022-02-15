import React, { useState, useEffect, useRef } from "react";
import "../../style/_addsemester.scss";

//animation
import { motion } from "framer-motion";
import { addCourseAnimation } from "../../animation";
//redux
import { useSelector, useDispatch } from "react-redux";
import { addsemester, loadsemesters } from "../../store/semesters";
import { semesterWindowToggle } from "../../store/semesterWindow";
const Addsemester = ({ addCourse, setaddCourse }) => {
  const dispatch = useDispatch();

  const inputElement = useRef(null);
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);
  //states
  const [semester, setSemester] = useState("");

  //handlers
  const inputHandlerName = (e) => {
    setSemester(e.target.value);
  };
  const addSemesterHandler = (e) => {
    e.preventDefault();
    dispatch(addsemester({ semester, name: "siam" }));
    dispatch(semesterWindowToggle());
  };
  const cancelAddSemesterHandler = (e) => {
    e.preventDefault();
    dispatch(semesterWindowToggle());
  };
  return (
    <motion.div
      exit="exit"
      variants={addCourseAnimation}
      initial="hidden"
      animate="show"
      className="addSemester"
    >
      <form action="">
        <h1>Add Semester</h1>
        <div className="semesterName">
          <input
            ref={inputElement}
            onChange={inputHandlerName}
            value={semester}
            required
            type="text"
            placeholder="Semester name"
            autoFocus
          />
        </div>
        <div className="btns">
          <button onClick={addSemesterHandler}>Add</button>
        </div>
      </form>
    </motion.div>
  );
};
export default Addsemester;
