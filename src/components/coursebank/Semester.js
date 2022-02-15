import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "../../style/_semester.scss";
import trash from "../../photos/trash.svg";
import { semesterGpa } from "../../util";
//redux
import { useSelector, useDispatch } from "react-redux";
import { removesemester, semesterRemovedState } from "../../store/semesters";
const Semester = ({ allCourses, semester }) => {
  const history = useHistory();
  //redux-data
  const dispatch = useDispatch();
  //state
  const semesterClickHandler = (e) => {
    if (e.target.className === "menu" || e.target.className === "menuImg") {
      dispatch(removesemester(semester.semester_id));
      dispatch(semesterRemovedState());
    } else {
      history.push(
        `semesters/${semester.semester_name}/${semester.semester_id}`
      );
    }
  };

  const semesterCourses =
    allCourses.length > 0
      ? allCourses.filter(
          (course) => course.semester_id === semester.semester_id
        )
      : "";

  //state
  return (
    <a
      className="link"
      // to={`semesters/${semester.semester_name}/${semester.semester_id}`}
    >
      <div onClick={semesterClickHandler} className="semester">
        <div className="semesterName">
          <h1>{semester.semester_name}</h1>
          <div className="courseName">
            {semesterCourses.length > 0
              ? semesterCourses.slice(0, 3).map((course, index) => (
                  <p key={course.course_id}>
                    {course.course_name}
                    {index < 2 && semesterCourses.length > 1
                      ? ", "
                      : index >= 2
                      ? "..."
                      : ""}
                  </p>
                ))
              : ""}
          </div>
        </div>
        <h2>{semesterGpa(semesterCourses)}</h2>

        <div className="menu">
          <img className="menuImg" src={trash} alt="" />
        </div>
      </div>
    </a>
  );
};
export default Semester;
