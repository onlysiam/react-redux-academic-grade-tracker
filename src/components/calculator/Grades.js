import React from "react";
import "../../style/_settings.scss";
//animation
import { motion } from "framer-motion";
import { pageAnimation } from "../../animation";
const Grades = ({ gradeWeight, setGradeWeight }) => {
  const gradeWeightHandler = () => {
    console.log("yo");
  };
  return (
    <motion.div
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      className="settings"
      onLoad={gradeWeightHandler}
    >
      <h1>Grade Weight</h1>
    </motion.div>
  );
};
export default Grades;
