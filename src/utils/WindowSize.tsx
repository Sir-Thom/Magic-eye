import { useState, useEffect } from "react";
import { currentMonitor, getCurrent } from "@tauri-apps/api/window";
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
export function resizeWindow() {
  if (window.__TAURI__ !== undefined) {
    useEffect(() => {
      async function HandleResize() {
        const physicalSize = await getCurrent().innerSize();
        const monitor = await currentMonitor();
        const scaleFactor = monitor.scaleFactor;
        const logicalSize = physicalSize.toLogical(scaleFactor);
        const minWidth: number = 1000;
        const minHeight: number = 600;
        if (logicalSize.width < minWidth) {
          logicalSize.width = minWidth;

          await getCurrent().setSize(logicalSize);
        }
      }
      HandleResize().catch(console.error);
    }, []);
  }
}
