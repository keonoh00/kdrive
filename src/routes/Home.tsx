import { Grid } from "@chakra-ui/react";
import Folder, { FolderSkeleton } from "../components/Folder";

const Home = () => {
  return (
    <Grid
      templateColumns="repeat(5, 3fr)"
      columnGap={4}
      rowGap={6}
      px={20}
      py={8}
      flexWrap="wrap"
    >
      <FolderSkeleton />
      <Folder name="1" />
      <Folder name="12" />
      <Folder name="14" />
      <Folder name="15" />
      <Folder name="16" />
      <Folder name="17" />
      <Folder name="1dfasdf sdfasd.fsa" />
      <Folder name="1 sdfasdfds   sdfasdfjisadjfds *" />
    </Grid>
  );
};

export default Home;
