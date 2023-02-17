import { createBrowserRouter } from "react-router-dom";
import RootComponent from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComponent />,
    errorElement: <NotFound />,
    children: [{ path: ``, element: <Home /> }],
  },
]);

export default router;
