import { Grid } from "@chakra-ui/react";
import Folder, { FolderSkeleton } from "../components/Folder";

const DUMMY_ARRAY = [
  23, 34, 345, 4325, 234, 52, 345, 23, 452, 345, 234, 5, 2345, 23, 452, 345,
];

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
      {DUMMY_ARRAY.map((value) => (
        <Folder name={value + ""} to={`/${value}`} />
      ))}
    </Grid>
  );
};

export default Home;
