import { React, useState, useEffect } from "react";
import "../../style/_class.scss";
import { v4 as uuid } from "uuid";
//redux
import { useSelector, useDispatch } from "react-redux";
//reducers
import { courseAdded, resultAdded } from "../../store/calculator";

const Class = ({ id, defaultGradeWeight }) => {
  const dispatch = useDispatch();
  //states
  let mapCheck = 1;
  let courseName = "Class" + id;
  const [checkLength, setCheckLength] = useState("");

  const [checkCourseInput, setCheckCourseInput] = useState("changed");
  const [checkGradeInput, setCheckGradeInput] = useState("false");
  const [checkCreditInput, setCheckCreditInput] = useState("false");

  const [course, setCourse] = useState(courseName);
  const [grade, setGrade] = useState("");
  const [gradeLetter, setGradeLetter] = useState("");
  const [credit, setCredit] = useState("");

  //handlers
  const selectHideHandler = (e) => {
    setGrade(e.target.value);
    setCheckGradeInput("changed");
  };
  const inputHideHandlerName = (e) => {
    setCourse(e.target.value);
  };
  const inputHideHandlerCredit = (e) => {
    setCredit(e.target.value);
    setCheckCreditInput("changed");
    setCheckLength("1");
  };
  //useEffect

  useEffect(() => {
    if (defaultGradeWeight) {
      defaultGradeWeight.map((gradeweight, i) => {
        if (gradeweight.grade_name === grade) {
          setGradeLetter(gradeweight.grade_point);
        }
      });
    }
  }, [grade]);
  useEffect(() => {
    if (
      checkCourseInput === "changed" &&
      checkGradeInput === "changed" &&
      checkCreditInput === "changed"
    )
      dispatch(
        courseAdded({
          id,
          grade,
          gradeLetter,
          courseName,
          credit,
        })
      );
  }, [course, credit, grade]);

  return (
    <div className="class-body">
      <input
        onChange={inputHideHandlerName}
        type="text"
        value={course}
        className="courseNameInput"
        placeholder="Course Name"
      />
      <select
        onChange={selectHideHandler}
        name=""
        value={grade}
        className={`select ${grade ? "active-select" : ""}`}
        placeholder="Grade"
      >
        <option
          className={`firstChild ${
            grade ? "active-firstChild" : "active-firstChild"
          }`}
          value=""
        >
          Grade
        </option>
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
      <input
        onChange={inputHideHandlerCredit}
        type="text"
        value={credit}
        placeholder="Credits"
      />
    </div>
  );
};
export default Class;
