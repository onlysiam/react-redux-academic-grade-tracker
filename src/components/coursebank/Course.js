import React, { useState } from "react";
import "../../style/_course.scss";
import trash from "../../photos/trash.svg";
import Coursesdetails from "./Coursedetails";
import { useLongPress } from "use-long-press";
//animate
import { motion } from "framer-motion";
import { clickHoldAnimation } from "../../animation";
//redux
import { useDispatch } from "react-redux";
import {
  activeToggleCourse,
  removecourse,
  toggleActiveCourse,
} from "../../store/courses";

const Course = ({ course, gradeCount }) => {
  //state
  const [clickHold, setclickHold] = useState(false);
  //handler
  const clickHoldHandler = () => {
    setclickHold(!clickHold);
  };
  const courseActiveToggle = useLongPress(
    () => {
      console.log("working");
      const index = gradeCount.findIndex(
        (grade) => grade.name === course.grade_letter
      );
      gradeCount[index].count = parseInt(gradeCount[index].count) - 1;
      dispatch(toggleActiveCourse(course.course_id));
      dispatch(activeToggleCourse(course.course_id));
      setclickHold(false);
    },
    {
      onStart: () => setclickHold(true),
      onCancel: () => setclickHold(false),
      threshold: 700,
      cancelOnMovement: true,
    }
  );

  //redux-data
  const dispatch = useDispatch();
  //state
  const courseDeleteHandler = () => {
    console.log(course.course_id);
    dispatch(removecourse(course.course_id));
  };
  return (
    <div className="courseRender">
      <div {...courseActiveToggle} className="courseContainer">
        {!course.active || clickHold ? (
          <motion.div
            exit="exit"
            variants={clickHoldAnimation}
            initial="hidden"
            animate="show"
            className="inActive"
          ></motion.div>
        ) : (
          ""
        )}
        <div className="courseSummary">
          <h1>{course.course_name}</h1>
          <p>{course.credit_hour} Credit Hours</p>
        </div>
        <p>{course.grade_letter}</p>
        <div className="menu">
          <img onClick={courseDeleteHandler} src={trash} alt="" />
        </div>
      </div>
    </div>
  );
};
export default Course;
