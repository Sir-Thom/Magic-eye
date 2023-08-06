import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { router } from "./router";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AnimatePresence initial={true} onExitComplete={() => null} mode={"wait"}>
      <RouterProvider router={router} />
    </AnimatePresence>
  </React.StrictMode>
);
