//framer motion

export const pageAnimation = {
  hidden: { opacity: 0, y: 150 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
  exit: {
    opacity: 0,
    y: 150,
  },
};
export const pageAnimationAlt = {
  hidden: { opacity: 1, y: 0 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
  exit: {
    opacity: 0,
    y: 150,
  },
};

export const welcomeExitAnimation = {
  hidden: { opacity: 1, y: 0 },
  show: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -1000,
    transition: {
      duration: 1,
    },
  },
};
export const iconWelcome = {
  hidden: {
    pathLength: 0,
    fill: "rgba(233, 194, 184, 0)",
  },
  visible: {
    pathLength: 1,
    fill: "rgb(233, 194, 184)",
  },
};
export const navAnimation = {
  hidden: { opacity: 0, x: 1000 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      delay: 1,
    },
  },
};
export const cgpaCircleAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
};
export const addCourseAnimation = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 150,
  },
  transition: {
    duration: 0.5,
  },
};

export const clickHoldAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
};
