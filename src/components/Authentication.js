import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { Switch, Route, useLocation } from "react-router-dom";
//animation
import { motion, AnimatePresence } from "framer-motion";
import { pageAnimationAlt } from "../animation";
const Authentication = ({
  usernameInput,
  setUsernameInput,
  passwordInput,
  setPasswordInput,
}) => {
  const location = useLocation();

  return (
    <motion.div
      exit="exit"
      variants={pageAnimationAlt}
      initial="hidden"
      animate="show"
      className="authentication"
    >
      <AnimatePresence exitBeforeEnter>
        <Switch>
          <Route path="/" exact>
            <Login
              usernameInput={usernameInput}
              setUsernameInput={setUsernameInput}
              passwordInput={passwordInput}
              setPasswordInput={setPasswordInput}
            />
          </Route>
        </Switch>
      </AnimatePresence>
    </motion.div>
  );
};
