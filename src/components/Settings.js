import React, { useEffect } from "react";
import "../style/_settings.scss";
//animation
import { motion } from "framer-motion";
import { pageAnimation } from "../animation";
const Settings = ({ setCalculatorInput }) => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <motion.div
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      className="settings"
    >
      <h1>Settings</h1>
    </motion.div>
  );
};
export default Settings;
