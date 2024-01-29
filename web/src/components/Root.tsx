import { Box } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router-dom";
import RootHeader from "./RootHeader";

const Root = () => {
  return (
    // Box is a Chakra UI the most basic component
    <Box>
      {/* Header */}
      <RootHeader />

      <Outlet />
      <ReactQueryDevtools />
    </Box>
  );
};

export default Root;
