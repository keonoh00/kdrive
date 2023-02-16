import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const RootComponent = () => {
  return (
    // Box is a Chakra UI the most basic component
    <Box>
      {/* Header */}
      <Outlet />
      {/* Footer */}
    </Box>
  );
};

export default RootComponent;
