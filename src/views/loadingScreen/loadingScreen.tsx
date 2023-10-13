import { RiLoader4Line } from "react-icons/ri";

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen dark:bg-window-dark-900">
      <div className="text-3xl bg-accent-color1-700">
        <RiLoader4Line className="animate-spin" />
      </div>
    </div>
  );
}

export default LoadingScreen;
