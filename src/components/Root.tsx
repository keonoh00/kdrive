import { Box, Grid } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useUser } from "../api/useUser";
import Folder, { FolderSkeleton } from "./Folder";
import RootHeader from "./RootHeader";

const Root = () => {
  const { data } = useUser();

  console.log(data);

  return (
    // Box is a Chakra UI the most basic component
    <Box>
      {/* Header */}
      <RootHeader />

      <Grid
        templateColumns="repeat(5, 3fr)"
        columnGap={4}
        rowGap={6}
        px={20}
        py={8}
        flexWrap="wrap"
      >
        <FolderSkeleton />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
      </Grid>
      <Outlet />
    </Box>
  );
};

export default Root;
