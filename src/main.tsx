import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import "./styles.css";
import { AnimatePresence } from "framer-motion";
import Router from "./router";

const rootDomNode = document.getElementById("root");
const root = createRoot(rootDomNode);
root.render(
    <BrowserRouter basename="/">
        <React.StrictMode>
            <AnimatePresence
                initial={true}
                onExitComplete={() => null}
                mode={"sync"}
            >
                <Router></Router>
            </AnimatePresence>
        </React.StrictMode>
    </BrowserRouter>
);
