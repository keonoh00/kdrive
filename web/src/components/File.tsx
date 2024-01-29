import { useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import { FaFile } from "react-icons/fa";
import { IFile } from "../api/useDirectoryItems";
import ItemButton from "./ItemButton";
import { ItemLabel } from "./ItemLabel";
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

  return (
    <>
      <ItemButton onClick={onOpenPreviewModal}>
        <FaFile size={64} />
        <ItemLabel
          name={item.name}
          created_at={item.created_at}
          created_by={item.created_by}
        />
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
