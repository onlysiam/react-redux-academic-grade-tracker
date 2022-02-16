import React from "react";
//components
import { strokeWidth } from "../../util";
//styles
import "../../style/_cgpa.scss";
//animation
import { motion } from "framer-motion";
import { cgpaCircleAnimation } from "../../animation";
//redux
import { useSelector } from "react-redux";
const Cgpa = () => {
  //fetching data
  const userList = useSelector((state) => state.entities.users.list);
  const cgpa = userList.length > 0 ? userList[0].cgpa : "";
  const totalCredit = userList.length > 0 ? userList[0].credit_completed : "";
  //states & vars
  const strokeValue = strokeWidth(cgpa);
  return (
    <div className="cgpa">
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
    </div>
  );
};

export default Cgpa;
