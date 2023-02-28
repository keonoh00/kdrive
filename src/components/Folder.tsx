import { FC } from "react";
import { Skeleton, SkeletonText, VStack } from "@chakra-ui/react";
import { FaFolder } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { IFile } from "../api/useDirectoryItems";
import ItemButton from "./ItemButton";
import { ItemLabel } from "./ItemLabel";

const FolderSkeleton = () => {
  return (
    <VStack mb={1}>
      <Skeleton rounded={"xl"} h={32} w={48} />
      <SkeletonText w={48} noOfLines={2} />
    </VStack>
  );
};

export const FolderSkeletonList = () => {
  const dummyArray = new Array(40).fill("");
  return (
    <>
      {dummyArray.map((_, index) => (
        <FolderSkeleton key={index} />
      ))}
    </>
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
      onClick={() =>
        setSearchParams({ path: item.path + item.name.split("/")[1] })
      }
    >
      <FaFolder size={64} />
      <ItemLabel
        name={item.name}
        created_at={item.created_at}
        created_by={item.created_by}
      />
    </ItemButton>
  );
};

export default Folder;
