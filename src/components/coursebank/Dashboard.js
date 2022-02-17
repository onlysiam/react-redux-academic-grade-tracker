import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
//styles
import "../../style/_dashboard.scss";
//components
import Courses from "./Courses";
import Semester from "./Semester";
import Addsemester from "./Addsemester";
import Cgpa from "./Cgpa";
import Gradecounter from "./Gradecounter";
import { gradeCounter } from "../../util";
//animation
import { motion } from "framer-motion";
import { pageAnimation } from "../../animation";
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
import { loadUserGrade } from "../../store/gradeweights";
import {
  preloaderToggleTrue,
  preloaderToggleFalse,
} from "../../store/preloader";

const Dashboard = ({ gradeCountWindow }) => {
  //fetching data
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.entities.courses.list);
  const semestersTemp = useSelector((state) => state.entities.semesters.list);
  const semesters = [...semestersTemp].reverse();
  const gradeCount = courses && gradeCounter(courses);
  const userList = useSelector((state) => state.entities.users.list);
  const loader = useSelector((state) => state.loader.semesterWindow);
  const semesterWindowState = loader.length > 0 ? loader[0].state : "";

  //get current url
  const location = useLocation();
  const pathId = location.pathname.split("/")[3];
  const pathIdindex = semesters.findIndex(
    (semester) => semester.semester_id === parseInt(pathId)
  );

  //useEffects

  useEffect(() => {
    if (courses.length > 0 || semestersTemp.length > 0) {
      dispatch(cgpaCounted(courses));
      dispatch(creditCounted(courses));
      dispatch(preloaderToggleFalse());
    }
  }, [courses]);
  useEffect(() => {
    dispatch(preloaderToggleFalse());
  }, [semesters]);
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
      dispatch(loadUserGrade({ usernameInput }));
      console.log("called from allsemesters");
    }
  }, []);

  //handlers
  const semesterWindowHandler = () => {
    dispatch(semesterWindowToggle());
  };
  const onHeaderClick = (e) => {
    e.preventDefault();
    if (e.target.className === "addSemester") {
      dispatch(semesterWindowToggle());
    }
  };
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
          <Cgpa />
        </div>
        <div className={`gradeCountCards ${gradeCountWindow ? "active" : ""}`}>
          <Gradecounter gradeCount={gradeCount} />
        </div>
      </div>
      {pathId && (
        <Courses
          gradeCount={gradeCount}
          semesters={semesters}
          allCourses={courses}
          pathId={pathId}
          pathIdindex={pathIdindex}
        />
      )}
      {!pathId && (
        <div className="semestersContainer">
          <div className="topBar">
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
            <div>
              {semesterWindowState ? (
                <Addsemester username={userList[0].username} />
              ) : null}
            </div>
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
export default Dashboard;
