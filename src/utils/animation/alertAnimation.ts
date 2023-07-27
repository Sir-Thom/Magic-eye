export const alertAnimation = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
      staggerDirection: 1,
      childrendDelay: 0,
      duration: 0.8,
      type: "tween",
      ease: "backInOut",
      times: [0, 0.2, 0.4, 0.6, 0.8]
    }
  },
  exit: {
    y: 20,
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
