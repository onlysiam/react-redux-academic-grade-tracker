function gradeWeight() {
  return [
    {
      name: "A+",
      value: "4.00",
    },
    {
      name: "A",
      value: "4.00",
    },
    {
      name: "A-",
      value: "3.70",
    },
    {
      name: "B+",
      value: "3.30",
    },
    {
      name: "B",
      value: "3.00",
    },
    {
      name: "B-",
      value: "2.70",
    },
    {
      name: "C+",
      value: "2.30",
    },
    {
      name: "C",
      value: "2.00",
    },
    {
      name: "C-",
      value: "1.70",
    },
    {
      name: "D+",
      value: "1.30",
    },
    {
      name: "D",
      value: "1.00",
    },
    {
      name: "F",
      value: "0.00",
    },
  ];
}

export function gradeCounter(courses) {
  let Amiddle = 0,
    Aminus = 0,
    Bplus = 0,
    Bmiddle = 0,
    Bminus = 0,
    Cplus = 0,
    Cmiddle = 0,
    Cminus = 0,
    Dplus = 0,
    Dmiddle = 0;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].active) {
      if (courses[i].grade_letter === "A") Amiddle++;
      else if (courses[i].grade_letter === "A-") Aminus++;
      else if (courses[i].grade_letter === "B+") Bplus++;
      else if (courses[i].grade_letter === "B") Bmiddle++;
      else if (courses[i].grade_letter === "B-") Bminus++;
      else if (courses[i].grade_letter === "C+") Cplus++;
      else if (courses[i].grade_letter === "C") Cmiddle++;
      else if (courses[i].grade_letter === "C-") Cminus++;
      else if (courses[i].grade_letter === "D+") Dplus++;
      else if (courses[i].grade_letter === "D") Dmiddle++;
    }
  }
  return [
    {
      id: 1,
      name: "A",
      count: Amiddle,
    },
    {
      id: 2,
      name: "A-",
      count: Aminus,
    },
    {
      id: 3,
      name: "B+",
      count: Bplus,
    },
    {
      id: 4,
      name: "B",
      count: Bmiddle,
    },
    {
      id: 5,
      name: "B-",
      count: Bminus,
    },
    {
      id: 6,
      name: "C+",
      count: Cplus,
    },
    {
      id: 7,
      name: "C",
      count: Cmiddle,
    },
    {
      id: 8,
      name: "C-",
      count: Cminus,
    },
    {
      id: 9,
      name: "D+",
      count: Dplus,
    },
    {
      id: 10,
      name: "D",
      count: Dmiddle,
    },
  ];
}
export function creditCounter(courses) {
  let totalCredit = 0;
  for (let i = 0; i < courses.length; i++) {
    totalCredit = totalCredit + parseFloat(courses[i].credit_hour);
  }
  return totalCredit.toFixed(1);
}

export function strokeWidth(cgpa) {
  let width = 52.5;

  let strokeValue = width * cgpa;
  if (!cgpa) return 90;
  if (strokeValue < 90) return 90;
  return width * cgpa;
}
export function semesterGpa(courses) {
  let totalCredit = 0;
  let totalGradePoint = 0;
  for (let i = 0; i < courses.length; i++) {
    totalCredit = totalCredit + parseInt(courses[i].credit_hour);
    totalGradePoint =
      totalGradePoint +
      parseInt(courses[i].credit_hour) * parseFloat(courses[i].grade_point);
  }

  return (totalGradePoint / totalCredit).toFixed(4);
}
export const gradeCount = (courses) => {
  return gradeCounter(courses);
};

export default gradeWeight;
