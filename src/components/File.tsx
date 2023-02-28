import { Grid, Heading, useDisclosure } from "@chakra-ui/react";
import React, { FC } from "react";
import { FaFile } from "react-icons/fa";
import { IFile } from "../api/useDirectoryItems";
import ItemButton from "./ItemButton";
import PreviewModal from "./PreviewModal";

interface IFileProps {
  item: IFile;
}

const File: FC<IFileProps> = ({ item }) => {
  const {
    isOpen: isOpenPreviewModal,
    onOpen: onOpenPreviewModal,
    onClose: onClosePreviewModal,
  } = useDisclosure();

  console.log(item);
  return (
    <>
      <ItemButton onClick={onOpenPreviewModal}>
        <FaFile size={64} />
        <Grid templateColumns="repeat(1, 3fr)">
          <Heading noOfLines={1} fontSize={"sm"} textAlign={"center"}>
            {item.name}
          </Heading>
        </Grid>
      </ItemButton>
      <PreviewModal
        isOpen={isOpenPreviewModal}
        onClose={onClosePreviewModal}
        content={item}
      />
    </>
  );
};

export default File;
