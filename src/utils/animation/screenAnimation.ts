export const slideToScreen = {
  hidden: {
    x: "100vw"
  },
  visible: {
    x: "0",
    opacity: 1,

    transition: {
      duration: 0.35,
      type: "tween",
      anticipate: [0.17, 0.67, 0.83, 0.97]
    }
  },
  exit: {
    x: "-100vw",
    opacity: 0
  }
};
//make fade in animation
export const fadeIn = {
  hidden: {
    opacity: 0.65
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
      type: "tween",
      ease: "easeInOut"
    }
  },
  exit: {
    opacity: 0
  }
};
