import React from "react";
import { useLocation } from "react-router-dom";
import "../style/_home.scss";
//framer motion
import { motion } from "framer-motion";
import { pageAnimationAlt } from "../animation";
import Login from "./Login";
import Signup from "./Signup";
import cgpa101 from "../photos/cgpa101w.svg";
const Home = () => {
  //animation
  const animationSlide = {
    hidden: { x: 100 },
    show: { x: 0 },
  };
  //get current url
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];
  return (
    <motion.div
      exit="exit"
      variants={pageAnimationAlt}
      initial="hidden"
      animate="show"
      className="home"
    >
      <motion.div
        variants={animationSlide}
        initial="hidden"
        animate="show"
        className="homeHeader"
      >
        <img src={cgpa101} alt="" />
        <p>Keep Track of Your Academic Grades And Calculate Your GPA </p>
      </motion.div>
      <div className="partition"></div>
      <motion.div
        variants={animationSlide}
        initial="hidden"
        animate="show"
        className="login"
      >
        {pathname === "signup" ? <Signup /> : <Login />}
      </motion.div>
    </motion.div>
  );
};
export default Home;
