import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "../style/_login.scss";
//framer motion
import { motion } from "framer-motion";
import { pageAnimationAlt } from "../animation";
//redux
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/auth";
//reducer
import { semesterWindow } from "../store/semesterWindow";
import { courseWindow } from "../store/courseWindow";
import { loadcourses } from "../store/courses";
import { loadsemesters } from "../store/semesters";
import { loadUserGrade } from "../store/gradeweights";
import { preloaderToggleTrue, preloaderToggleFalse } from "../store/preloader";
const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const authenticated = useSelector(
    (state) => state.entities.users.authenticated
  );
  //states
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const usernameInputHandler = (e) => {
    setUsernameInput(e.target.value);
  };
  const passwordInputHandler = (e) => {
    setPasswordInput(e.target.value);
  };

  const loginHandler = (e) => {
    dispatch(preloaderToggleTrue());
    e.preventDefault();
    dispatch(login({ usernameInput, passwordInput }));
  };
  //useEffect
  useEffect(() => {
    if (!authenticated) {
      dispatch(preloaderToggleFalse());
      if (localStorage.getItem("cgpa101Username")) {
        dispatch(preloaderToggleTrue());
        const usernameInput = localStorage.getItem("cgpa101Username");
        const passwordInput = localStorage.getItem("cgpa101Password");
        dispatch(login({ usernameInput, passwordInput }));
        setUsernameInput(usernameInput);
        setPasswordInput(passwordInput);
      }
    }
  }, []);
  useEffect(() => {
    if (authenticated) {
      if (usernameInput) {
        dispatch(preloaderToggleTrue());
        dispatch(semesterWindow());
        dispatch(courseWindow());
        dispatch(loadcourses({ usernameInput }));
        dispatch(loadsemesters({ usernameInput }));
        dispatch(loadUserGrade({ usernameInput }));
      }
      console.log("called");
      setTimeout(() => {
        history.push("semesters");

        dispatch(preloaderToggleFalse());
      }, 500);
    }
  }, [authenticated]);

  //animation
  const animation = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  };
  const animationSlide = {
    hidden: { x: 100 },
    show: { x: 0 },
  };
  return (
    <motion.div
      exit="exit"
      variants={pageAnimationAlt}
      initial="hidden"
      animate="show"
      className="authentication"
    >
      <motion.div
        variants={animationSlide}
        initial="hidden"
        animate="show"
        className="login"
      >
        <motion.form
          variants={animation}
          initial="hidden"
          animate="show"
          onSubmit={login}
        >
          <p>Username</p>
          <input
            type="text"
            placeholder="Username"
            value={usernameInput}
            onChange={usernameInputHandler}
            required
          />
          <p>Password</p>
          <input
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={passwordInputHandler}
            required
          />
          <button onClick={loginHandler}>Login</button>
          <div className="atags">
            <Link to="">Forgot Password?</Link>
            <Link to="/signup">Don't Have An Account?</Link>
          </div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};
export default Login;
