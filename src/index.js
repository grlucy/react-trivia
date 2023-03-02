import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Root from "./routes/root"
import Home from "./routes/home"
import Scoreboard from "./routes/scoreboard"
import Play from "./routes/play"

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="scoreboard" element={<Scoreboard />} />
      <Route path="play" element={<Play />} />
    </Route>
    </>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)