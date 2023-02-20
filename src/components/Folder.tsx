import { Box, Grid, Heading, Skeleton, SkeletonText } from "@chakra-ui/react";
import React, { FC } from "react";
import { FaFolder } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { IFile } from "../api/useDirectoryItems";
import ItemButton from "./ItemButton";

const FOLDER_HEIGHT = 120;

export const FolderSkeleton = () => {
  return (
    <Box>
      <Skeleton rounded={"xl"} height={FOLDER_HEIGHT} mb={3} />
      <SkeletonText noOfLines={2} />
    </Box>
  );
};

interface IFolderProps {
  item: IFile;
}

const Folder: FC<IFolderProps> = ({ item }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();

  return (
    <ItemButton
      onClick={() => setSearchParams({ path: item.path + item.name })}
    >
      <FaFolder size={64} />
      <Grid templateColumns="repeat(1, 3fr)">
        <Heading noOfLines={1} fontSize={"sm"} textAlign={"center"}>
          {item.name.split("/")[0]}
        </Heading>
      </Grid>
    </ItemButton>
  );
};

export default Folder;
