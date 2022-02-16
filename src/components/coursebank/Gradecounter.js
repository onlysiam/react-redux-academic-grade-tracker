import React from "react";
//styles
import "../../style/_gradecounter.scss";
//components
import Gradecard from "./Gradecard";

const Gradecounter = ({ gradeCount }) => {
  //fetching data
  return (
    <div className="gradeCards">
      {gradeCount &&
        gradeCount.map((grade) => <Gradecard key={grade.id} grade={grade} />)}
    </div>
  );
};

export default Gradecounter;
