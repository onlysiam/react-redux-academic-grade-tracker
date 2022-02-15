import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
//animation
import { motion } from "framer-motion";
import { cgpaCircleAnimation, addCourseAnimation } from "../../animation";
import "../../style/_courses.scss";
import Course from "./Course";
//redux
import { useSelector, useDispatch } from "react-redux";
import { courseWindowToggle } from "../../store/courseWindow";
import { gpaCounted, semesterCreditCounted } from "../../store/semesters";

//components
import Addcourse from "./Addcourse";

const Courses = ({
  semesters,
  allCourses,
  pathId,
  pathIdindex,
  isLoading,
  gradeCount,
}) => {
  //redux-data
  const dispatch = useDispatch();

  //fetching data
  const semestersList = useSelector((state) => state.entities.semesters.list);
  const loader = useSelector((state) => state.loader.courseWindow);
  const semesterGpa =
    semestersList.length > 0 ? semestersList[pathIdindex].semester_gpa : 0;
  const semesterCredits =
    semestersList.length > 0 ? semestersList[pathIdindex].semester_credit : 0;
  const courseWindowState = loader.length > 0 ? loader[0].state : "";

  const courses =
    allCourses &&
    allCourses.filter((course) => course.semester_id === parseInt(pathId));

  const semester =
    semesters &&
    semesters.filter((semester) => semester.semester_id === parseInt(pathId));

  //useEffects
  useEffect(() => {
    if (!allCourses) {
      dispatch(courseWindowToggle());
    }
    if (semestersList.length > 0) {
      dispatch(gpaCounted({ courses, pathId: pathIdindex }));
      dispatch(semesterCreditCounted({ courses, pathId: pathIdindex }));
    }
  }, []);
  useEffect(() => {
    if (semestersList.length > 0) {
      dispatch(gpaCounted({ courses, pathId: pathIdindex }));
      dispatch(semesterCreditCounted({ courses, pathId: pathIdindex }));
    }
  }, [courses]);
  //handlers
  const backBtnHandler = () => {};
  const addCourseWindowHandler = (e) => {
    e.preventDefault();
    dispatch(courseWindowToggle());
  };
  const onHeaderClick = (e) => {
    e.preventDefault();
    if (e.target.className === "addCourse") {
      dispatch(courseWindowToggle());
    }
  };
  return (
    <div className="coursesContainer">
      <div className="courseTopBar">
        <Link to={`/semesters`} className="topBarNav">
          <div className="firstPart">
            <FontAwesomeIcon
              onCanPlay={backBtnHandler}
              className="backBtn"
              size="1x"
              icon={faChevronLeft}
            />
            <h1>{semester.length > 0 ? semester[0].semester_name : ""}</h1>
          </div>
          <div
            className={`addCourseBtnContainer ${
              courseWindowState
                ? "active-addCourseBtnContainer"
                : "addCourseBtnContainer"
            }`}
          >
            <button onClick={addCourseWindowHandler} className="addCourseBtn">
              Add Course
            </button>
          </div>
        </Link>
        <div
          data-value="parent"
          onClick={onHeaderClick}
          className={`addCourseOverlay ${
            courseWindowState ? "addCourseOverlay" : "active-addCourseOverlay"
          }`}
        >
          <div>
            {courseWindowState ? (
              <Addcourse semester={semester[0].semester_id} />
            ) : null}
          </div>
        </div>

        <div className="semesterInformations">
          <div className="prediction semesterInformations-card">
            <input type="text" placeholder="Desired Cgpa" />
            <button>Predict</button>
          </div>
          <div className="credit semesterInformations-card">
            <h1>Credit Hours</h1>
            <p>{semesterCredits}</p>
          </div>
          <div className="gpa semesterInformations-card">
            <h1>GPA</h1>
            <p>{semesterGpa}</p>
          </div>
        </div>
        <div className="courses">
          {courses.length > 0
            ? courses.map((course) => (
                <Course
                  key={course.course_id}
                  course={course}
                  gradeCount={gradeCount}
                />
              ))
            : ""}
        </div>
      </div>
      {/* <div
        className={`addCourseBtnContainer ${
          courseWindowState
            ? "active-addCourseBtnContainer"
            : "addCourseBtnContainer"
        }`}
      >
        <button onClick={addCourseWindowHandler} className="addCourseBtn">
          <div className="bar1"></div>
          <div className="bar2"></div>
        </button>
      </div> */}
    </div>
  );
};
export default Courses;
