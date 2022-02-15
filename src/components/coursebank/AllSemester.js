import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//styles
import "../../style/_allsemester.scss";
//components
import Courses from "./Courses";
import Semester from "./Semester";
import Addsemester from "./Addsemester";
import Gradecard from "./Gradecard";
import { strokeWidth, gradeCounter } from "../../util";
//animation
import { motion } from "framer-motion";
import { pageAnimation } from "../../animation";
import { cgpaCircleAnimation } from "../../animation";
//redux
import { useSelector, useDispatch } from "react-redux";
import { cgpaCounted, creditCounted } from "../../store/users";
import { semesterWindowToggle } from "../../store/semesterWindow";

//reducers
import { login } from "../../store/auth";
import { semesterWindow } from "../../store/semesterWindow";
import { courseWindow } from "../../store/courseWindow";
import { loadcourses } from "../../store/courses";
import { loadsemesters } from "../../store/semesters";
import {
  preloaderToggleTrue,
  preloaderToggleFalse,
} from "../../store/preloader";

const AllSemester = ({ gradeCountWindow }) => {
  //fetching data
  const dispatch = useDispatch();
  useEffect(() => {
    if (courses.length > 0) {
      dispatch(cgpaCounted(courses));
      dispatch(creditCounted(courses));
      dispatch(preloaderToggleFalse());
    }
  });
  const isLoading = useSelector((state) => state.entities.courses.loading);
  const courses = useSelector((state) => state.entities.courses.list);
  const semestersTemp = useSelector((state) => state.entities.semesters.list);
  const semesters = [...semestersTemp].reverse();
  const gradeCount = courses && gradeCounter(courses);
  const userList = useSelector((state) => state.entities.users.list);
  const loader = useSelector((state) => state.loader.semesterWindow);
  const totalCredit = userList.length > 0 ? userList[0].credit_completed : "";
  const cgpa = userList.length > 0 ? userList[0].cgpa : "";
  const semesterWindowState = loader.length > 0 ? loader[0].state : "";
  useEffect(() => {
    if (
      !courses.length > 0 &&
      !semesters.length > 0 &&
      !userList.length > 0 &&
      !loader.length > 0
    ) {
      dispatch(preloaderToggleTrue());
      const usernameInput = localStorage.getItem("cgpa101Username");
      const passwordInput = localStorage.getItem("cgpa101Password");
      dispatch(login({ usernameInput, passwordInput }));
      dispatch(semesterWindow());
      dispatch(courseWindow());
      dispatch(loadcourses({ usernameInput }));
      dispatch(loadsemesters({ usernameInput }));
      console.log("called from allsemesters");
    }
  }, []);
  //get current url
  const location = useLocation();
  const pathId = location.pathname.split("/")[3];
  const pathIdindex = semesters.findIndex(
    (semester) => semester.semester_id === parseInt(pathId)
  );

  //states & vars
  const strokeValue = strokeWidth(cgpa);
  const [gradeCardsToggle, setGradeCardsToggle] = useState(false);
  //handlers
  const gradeCardsToggleHandler = () => {
    setGradeCardsToggle(!gradeCardsToggle);
  };
  const semesterWindowHandler = () => {
    dispatch(semesterWindowToggle());
  };
  const onHeaderClick = (e) => {
    e.preventDefault();
    if (e.target.className === "addSemester") {
      dispatch(semesterWindowToggle());
    }
  };
  //state
  return (
    <motion.div
      className="allSemesterContainer"
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
    >
      <div className="academicInfo">
        <div className="cgpaCredit">
          <motion.div
            variants={cgpaCircleAnimation}
            initial="hidden"
            animate="show"
            className="circle"
          >
            <motion.div
              variants={cgpaCircleAnimation}
              initial="hidden"
              animate="show"
              className="semesterCgpa"
            >
              <h1>{cgpa}</h1>
              <p>Cumulative GPA</p>
              <div className="cgpaLimit">
                <p>0</p>
                <p>4</p>
              </div>
            </motion.div>
            <motion.svg
              id="svg"
              variants={cgpaCircleAnimation}
              initial="hidden"
              animate="show"
              viewBox="0 0 122 122"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="circle"
                d="M2.75 61C2.75 93.1706 28.8294 119.25 61 119.25C93.1706 119.25 119.25 93.1706 119.25 61C119.25 28.8294 93.1706 2.75 61 2.75C28.8294 2.75 2.75 28.8294 2.75 61Z"
                stroke="#e6e6e6"
                strokeWidth="8"
                strokeDasharray="366"
                strokeDashoffset="91.5"
              />
            </motion.svg>
            <motion.svg
              id="svg2"
              variants={cgpaCircleAnimation}
              initial="hidden"
              animate="show"
              viewBox="0 0 122 122"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="circle"
                d="M2.75 61C2.75 93.1706 28.8294 119.25 61 119.25C93.1706 119.25 119.25 93.1706 119.25 61C119.25 28.8294 93.1706 2.75 61 2.75C28.8294 2.75 2.75 28.8294 2.75 61Z"
                stroke="#47bbff"
                strokeWidth="8"
                strokeDasharray="366"
                strokeDashoffset={strokeValue}
              />
            </motion.svg>
          </motion.div>
          <div className="creditInfoCard">
            <h1>Credit Completed</h1>
            <h1>{totalCredit}</h1>
          </div>

          <button
            onClick={gradeCardsToggleHandler}
            className="gradeCardsToggleBtn"
          >
            Grade Letter Counts
          </button>
        </div>

        <div className={`creditInfoCards ${gradeCountWindow ? "active" : ""}`}>
          <div className="gradeCards">
            {gradeCount &&
              gradeCount.map((grade) => (
                <Gradecard key={grade.id} grade={grade} />
              ))}
          </div>
        </div>
      </div>
      {pathId && (
        <Courses
          isLoading={isLoading}
          gradeCount={gradeCount}
          semesters={semesters}
          allCourses={courses}
          pathId={pathId}
          pathIdindex={pathIdindex}
        />
      )}
      {!pathId && (
        <div className="topBar">
          <div className="topBarNav">
            <h2>Semesters</h2>
            <div
              className={`addCourseBtnContainer ${
                semesterWindowState
                  ? "active-addCourseBtnContainer"
                  : "addCourseBtnContainer"
              }`}
            >
              <button onClick={semesterWindowHandler} className="addCourseBtn">
                Add Semester
              </button>
            </div>
          </div>

          <div
            onClick={onHeaderClick}
            className={`addCourseOverlay ${
              semesterWindowState
                ? "addCourseOverlay"
                : "active-addCourseOverlay"
            }`}
          >
            <div>{semesterWindowState ? <Addsemester /> : null}</div>
          </div>
          <div className="semesters">
            {!pathId && semesters.length > 0
              ? semesters.map((semester) => (
                  <Semester
                    key={semester.semester_id}
                    semester={semester}
                    allCourses={courses}
                  />
                ))
              : ""}
          </div>
        </div>
      )}
    </motion.div>
  );
};
export default AllSemester;
