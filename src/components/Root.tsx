import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import RootHeader from "./RootHeader";

const RootComponent = () => {
  return (
    // Box is a Chakra UI the most basic component
    <Box>
      {/* Header */}
      <RootHeader />
      <Outlet />
    </Box>
  );
};

export default RootComponent;
