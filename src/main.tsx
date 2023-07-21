import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import Settings from './views/Settings';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
const router = createBrowserRouter([
  {
    path: 'settings',
    element: <Settings />
  },
  {
    path: '/',
    element: <App />
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AnimatePresence initial={true} onExitComplete={() => null} mode={'wait'}>
      <RouterProvider router={router} />
    </AnimatePresence>
  </React.StrictMode>
);
