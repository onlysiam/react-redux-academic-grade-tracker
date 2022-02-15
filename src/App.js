import { React, useState, useEffect } from "react";
//router
import { Switch, Route, useLocation } from "react-router-dom";
//animation
import { AnimatePresence } from "framer-motion";
//import util
import data from "./util";
//components
import Nav from "./components/Nav";
import Home from "./components/Home";
import AllSemester from "./components/coursebank/AllSemester";
import Courses from "./components/coursebank/Courses";
import Coursedetails from "./components/coursebank/Coursedetails";

import Calculator from "./components/calculator/Calculator";
import Result from "./components/calculator/Result";
import Settings from "./components/Settings";
import Login from "./components/Login";
import Signup from "./components/Signup";

import Welcomepage from "./components/Welcomepage";
import Grades from "./components/calculator/Grades";
//css import
import "./style/app.scss";
//redux
import { useSelector } from "react-redux";
import Preloader from "./components/Preloader";
function App() {
  const preloaderList = useSelector((state) => state.loader.preloader);
  const preloaderState = preloaderList[0].state;

  const location = useLocation();
  //states

  const [gradeWeight, setGradeWeight] = useState([]);
  const [defaultGradeWeight, setDefaultGradeWeight] = useState(data());

  const [calculatorInput, setCalculatorInput] = useState([]);
  const [renderCount, setRenderCount] = useState(["1", "", ""]);
  const [calculatorCgpaExists, setCalculatorCgpaExists] = useState(false);

  const [checkReload, setCheckReload] = useState(false);
  const [resultPublished, setResultPublished] = useState(false);

  const [gradeCountWindow, setgradeCountWindow] = useState(false);
  //useEffect

  //handlers
  const gradeWeightHandler = () => {};
  return (
    <div onLoad={gradeWeightHandler} className="App">
      {preloaderState ? <Preloader /> : ""}
      <Nav
        gradeCountWindow={gradeCountWindow}
        setgradeCountWindow={setgradeCountWindow}
      />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          {/* <Route path="/" exact>
            <Preloader />
          </Route> */}
          <Route path="/" exact>
            <Welcomepage />
          </Route>
          <Route path={["/login", "/signup", "/home"]}>
            <Home />
          </Route>
          <Route path={["/semesters/:name/:id", "/semesters"]}>
            <AllSemester
              gradeCountWindow={gradeCountWindow}
              setgradeCountWindow={setgradeCountWindow}
            />
          </Route>
          <Route path="/calculator" exact>
            <Calculator
              defaultGradeWeight={defaultGradeWeight}
              setDefaultGradeWeight={setDefaultGradeWeight}
              gradeWeight={gradeWeight}
              setGradeWeight={setGradeWeight}
              calculatorInput={calculatorInput}
              setCalculatorInput={setCalculatorInput}
              renderCount={renderCount}
              setRenderCount={setRenderCount}
              calculatorCgpaExists={calculatorCgpaExists}
              setCalculatorCgpaExists={setCalculatorCgpaExists}
              resultPublished={resultPublished}
              setResultPublished={setResultPublished}
              checkReload={checkReload}
              setCheckReload={setCheckReload}
            />
          </Route>
          <Route path="/calculator/result" exact>
            <Result
              calculatorInput={calculatorInput}
              setCalculatorInput={setCalculatorInput}
              renderCount={renderCount}
              setRenderCount={setRenderCount}
              calculatorCgpaExists={calculatorCgpaExists}
              resultPublished={resultPublished}
              setResultPublished={setResultPublished}
              checkReload={checkReload}
              setCheckReload={setCheckReload}
            />
          </Route>
          <Route path="/settings" exact>
            <Settings />
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
