import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GameProvider } from "./context/gameContext.jsx";
import Leaderboard from "./components/leaderBoard.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
const router = createHashRouter([
  {
    path: "/Leaderboards",
    element: <Leaderboard />,
  },
  {
    path: "/",
    element: (
      <GameProvider>
        <App />
      </GameProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
