export const toastAnimationAppear = {
  hidden: {
    y: "100vh",

    transition: {
      opacity: 0,
      when: "beforeChildren",
      staggerChildren: 0.2,
      staggerDirection: 1,
      childrendDelay: 0,
      duration: 0.8,
      type: "tween",
      ease: "backOut",
      times: [0, 0.2, 0.4, 0.6, 0.8]
    }
  },
  visible: {
    y: "0",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
      staggerDirection: 1,
      childrendDelay: 0,
      duration: 0.8,
      type: "tween",
      ease: "backInOut",
      times: [0, 0.2, 0.4, 0.6, 0.8]
    },
    opacity: 1
  },
  exit: {
    y: "100vh",
    transition: {
      when: "afterChildren",
      staggerChildren: 0.2,
      staggerDirection: 1,
      childrendDelay: 0,
      duration: 0.8,
      type: "tween",
      ease: "backOut",
      times: [0, 0.2, 0.4, 0.6, 0.8]
    },
    opacity: 0
  }
};
