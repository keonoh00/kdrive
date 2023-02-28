import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Upload from "./routes/Upload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { path: ``, element: <Home /> },
      { path: `/upload`, element: <Upload /> },
    ],
  },
]);

export default router;
