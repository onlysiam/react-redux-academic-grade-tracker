import { React, useState, useEffect } from "react";
import "../../style/_class.scss";
import { v4 as uuid } from "uuid";
const Class = ({
  calculatorInput,
  setCalculatorInput,
  id,
  defaultGradeWeight,
  calculatorCgpaExists,
  setCalculatorCgpaExists,
  resultPublished,
  setResultPublished,
  checkReload,
  setCheckReload,
}) => {
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
    const gradeInputLS = localStorage.getItem("gradeInput" + id);
    const creditInputLS = localStorage.getItem("creditInput" + id);
    const courseLS = localStorage.getItem("course" + id);
    const gradeLS = localStorage.getItem("grade" + id);
    const gradeLetterLS = localStorage.getItem("gradeLetter" + id);
    const creditLS = localStorage.getItem("credit" + id);
    if (courseLS) {
      setCourse(JSON.parse(courseLS));
      setGrade(JSON.parse(gradeLS));
      setGradeLetter(JSON.parse(gradeLetterLS));
      setCredit(JSON.parse(creditLS));

      setCheckGradeInput(JSON.parse(gradeInputLS));
      setCheckCreditInput(JSON.parse(creditInputLS));
    }
    // if (calculatorInfo) {
    //   const calculatorInfo = localStorage.getItem("calculatorInfo");
    //   if (!calculatorCgpaExists || resultPublished) {
    //     setCalculatorInput(JSON.parse(calculatorInfo));
    //     setCheckCalculatorInput(true);
    //     setResultPublished(false);
    //   }
    // }
  }, []);

  useEffect(() => {
    localStorage.setItem("gradeInput" + id, JSON.stringify(checkGradeInput));
    localStorage.setItem("creditInput" + id, JSON.stringify(checkCreditInput));

    localStorage.setItem("course" + id, JSON.stringify(course));
    localStorage.setItem("grade" + id, JSON.stringify(grade));
    localStorage.setItem("gradeLetter" + id, JSON.stringify(gradeLetter));
    localStorage.setItem("credit" + id, JSON.stringify(credit));
    if (checkReload) {
      calculatorInput.map((count, i) => {
        if (count.id === id) {
          count.id = id;
          count.grade = grade;
          count.gradeLetter = gradeLetter;
          count.course = course;
          count.credit = credit;
        }
      });
    }
  });
  useEffect(() => {
    defaultGradeWeight.map((gradeweight, i) => {
      if (gradeweight.name === grade) {
        setGradeLetter(gradeweight.value);
      }
    });
  }, [grade]);
  useEffect(() => {
    if (
      checkCourseInput === "changed" &&
      checkGradeInput === "changed" &&
      checkCreditInput === "changed" &&
      !checkReload
    ) {
      setCalculatorCgpaExists(false);
      if (calculatorInput.length === 0) {
        if (course.length === 0) {
          setCalculatorInput([
            {
              id: id,
              grade: grade,
              gradeLetter: gradeLetter,
              course: courseName,
              credit: credit,
            },
          ]);
        } else {
          setCalculatorInput([
            {
              id: id,
              grade: grade,
              gradeLetter: gradeLetter,
              course: course,
              credit: credit,
            },
          ]);
        }
      }
      if (calculatorInput.length !== 0) {
        if (course.length === 0) {
          // setCalculatorInput(calculatorInput.filter((state) => state.id !== id));
          setCalculatorInput([
            ...calculatorInput,
            {
              id: id,
              grade: grade,
              gradeLetter: gradeLetter,
              course: courseName,
              credit: credit,
            },
          ]);
        } else {
          calculatorInput.map((count, i) => {
            if (count.id === id) {
              count.id = id;
              count.grade = grade;
              count.gradeLetter = gradeLetter;
              count.course = course;
              count.credit = credit;
              mapCheck = 0;
            }
          });

          if (mapCheck === 1) {
            setCalculatorInput([
              ...calculatorInput,
              {
                id: id,
                grade: grade,
                gradeLetter: gradeLetter,
                course: course,
                credit: credit,
              },
            ]);
            mapCheck = 0;
          } else {
            return;
          }
          // setCalculatorInput(calculatorInput.filter((state) => state.id !== id));
        }
      }
    }
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
