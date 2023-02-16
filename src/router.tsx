import { createBrowserRouter } from "react-router-dom";
import RootComponent from "./components/Root";
import Home from "./routes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComponent />,
    children: [{ path: "", element: <Home /> }],
  },
]);

export default router;
