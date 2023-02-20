import { Grid } from "@chakra-ui/react";
import React from "react";
import { useFiles } from "../api/useFiles";
import Folder, { FolderSkeleton } from "../components/Folder";

const FolderSkeletonList = () => {
  const dummyArray = new Array(20).fill("");
  return (
    <>
      {dummyArray.map((value, index) => (
        <FolderSkeleton key={index} />
      ))}
    </>
  );
};

const Home = () => {
  const { data, isLoading } = useFiles({ directoryPath: "/" });

  const folders = data?.folders || [];

  return (
    <Grid
      templateColumns="repeat(5, 3fr)"
      columnGap={4}
      rowGap={6}
      px={20}
      py={8}
      flexWrap="wrap"
    >
      {isLoading ? (
        <FolderSkeletonList />
      ) : (
        folders.map((value, index) => (
          <Folder key={index} name={value + ""} to={`/${value}`} />
        ))
      )}
    </Grid>
  );
};

export default Home;
