import { motion } from "framer-motion";
import { Titlebar } from "../components/titlebar/titlebar";
import { slideToScreen } from "../utils/animation/screenAnimation";
import { Link } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";

export default function ServerPage() {
  return (
    <>
      <Titlebar />

      <motion.div
        variants={slideToScreen}
        initial="hidden"
        animate="visible"
        exit={"exit"}
      >
        <div className={`h-screen `}>
          <div className="flex justify-start items-center">
            <Link
              className="flex justify-start items-center w-8 mt-12 dark:text-text-dark text-text-light  h-8 rounded-full hover:dark:bg-window-dark-600 hover:bg-window-light-600 "
              to="/"
            >
              <IconArrowLeft
                size={30}
                className="flex justify-center item-center dark:text-text-dark text-text-light "
              />
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}
