import { React, useState } from "react";
//router
import { Switch, Route, useLocation } from "react-router-dom";
//animation
import { AnimatePresence } from "framer-motion";

//components
import Nav from "./components/Nav";
import Home from "./components/Home";
import Dashboard from "./components/coursebank/Dashboard";

import Calculator from "./components/calculator/Calculator";
import Settings from "./components/Settings";

import Welcomepage from "./components/Welcomepage";
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
  const [renderCount, setRenderCount] = useState(["1", "", ""]);

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
          <Route path="/" exact>
            <Welcomepage />
          </Route>
          <Route path={["/login", "/signup", "/home"]}>
            <Home />
          </Route>
          <Route path={["/semesters/:name/:id", "/semesters"]}>
            <Dashboard
              gradeCountWindow={gradeCountWindow}
              setgradeCountWindow={setgradeCountWindow}
            />
          </Route>
          <Route path={["/calculator/result", "/calculator"]} exact>
            <Calculator
              renderCount={renderCount}
              setRenderCount={setRenderCount}
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
