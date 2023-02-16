import { createBrowserRouter } from "react-router-dom";
import RootComponent from "./components/Root";
import Directory from "./routes/Directory";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComponent />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <Home /> },
      { path: "/:path", element: <Directory /> },
    ],
  },
]);

export default router;
