import { Outlet } from "react-router-dom";

const RootComponent = () => {
  return (
    <div>
      <h1>Root Component</h1>
      <Outlet />
    </div>
  );
};

export default RootComponent;
