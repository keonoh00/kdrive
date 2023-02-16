import { Box, Grid, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Folder from "../components/Folder";

const Directory = () => {
  const params = useParams();
  const currentPath = params.path;

  return (
    <>
      <Box>
        <Heading>hello from directory with path:"{currentPath}"</Heading>
      </Box>
      <Grid
        templateColumns="repeat(5, 3fr)"
        columnGap={4}
        rowGap={6}
        px={20}
        py={8}
        flexWrap="wrap"
      >
        <Folder name={currentPath + "rndskddd"} />
        <Folder name={currentPath + "rndfasfdsk"} />
        <Folder name={currentPath + "rnsssdsk"} />
        <Folder name={currentPath + "rndsk"} />
        <Folder name={currentPath + "rndzzxcvxcsk"} />
        <Folder name={currentPath + "rndsk"} />
        <Folder name={currentPath + "rndszxcvzxk"} />
        <Folder name={currentPath + "rndzxcvzxcvsk"} />
      </Grid>
    </>
  );
};

export default Directory;
