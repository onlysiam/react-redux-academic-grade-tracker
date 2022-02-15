import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "../style/_signup.scss";
//framer motion
import { motion } from "framer-motion";
import { pageAnimationAlt } from "../animation";

//redux
import { useSelector, useDispatch } from "react-redux";
import { register } from "../store/auth";

const Signup = () => {
  const dispatch = useDispatch();
  //useState
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const usernameInputHandler = (e) => {
    setUsernameInput(e.target.value);
  };
  const passwordInputHandler = (e) => {
    setPasswordInput(e.target.value);
  };
  const fnameInputHandler = (e) => {
    setFname(e.target.value);
  };
  const lnameInputHandler = (e) => {
    setLname(e.target.value);
  };

  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(register({ fname, lname, usernameInput, passwordInput }));
  };

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
        className="signup"
      >
        <motion.form
          variants={animation}
          initial="hidden"
          animate="show"
          onSubmit={register}
        >
          <p>Name</p>
          <div className="name">
            <input
              placeholder="First Name"
              type="text"
              value={fname}
              onChange={fnameInputHandler}
              required
            />
            <input
              placeholder="Last Name"
              id="lastName"
              type="text"
              value={lname}
              onChange={lnameInputHandler}
              required
            />
          </div>

          <p>Email</p>
          <input
            type="text"
            placeholder="Email"
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
          <button onClick={registerHandler}>Signup</button>
          <div className="atags">
            <Link to="/home">Already Have An Account? Sign In</Link>
          </div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};
export default Signup;
