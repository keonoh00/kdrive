import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import RootHeader from "./RootHeader";

const Root = () => {
  return (
    // Box is a Chakra UI the most basic component
    <Box>
      {/* Header */}
      <RootHeader />

      <Outlet />
    </Box>
  );
};

export default Root;