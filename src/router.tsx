import { createBrowserRouter } from "react-router-dom";
import RootComponent from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Upload from "./routes/Upload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComponent />,
    errorElement: <NotFound />,
    children: [
      { path: ``, element: <Home /> },
      { path: `/upload`, element: <Upload /> },
    ],
  },
]);

export default router;
