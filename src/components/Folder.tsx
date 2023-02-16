import {
  Box,
  Grid,
  Heading,
  Skeleton,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";
import { FaFolder } from "react-icons/fa";

const FOLDER_HEIGHT = 120;

export const FolderSkeleton = () => {
  return (
    <Box>
      <Skeleton rounded={"xl"} height={FOLDER_HEIGHT} mb={3} />
      <SkeletonText noOfLines={2} />
    </Box>
  );
};

const Folder = () => {
  return (
    <VStack borderWidth={1} rounded={"xl"} mb={2} py={3} height={FOLDER_HEIGHT}>
      <FaFolder size={64} />
      <Grid templateColumns="repeat(1, 3fr)">
        <Heading noOfLines={1} fontSize={"sm"} textAlign={"center"}>
          {"Folder name"}
        </Heading>
      </Grid>
    </VStack>
  );
};

export default Folder;
