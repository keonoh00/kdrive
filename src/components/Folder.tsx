import { FC } from "react";
import { Skeleton, SkeletonText } from "@chakra-ui/react";
import { FaFolder } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { IFile } from "../api/useDirectoryItems";
import ItemButton from "./ItemButton";
import { ItemLabel } from "./ItemLabel";

const FOLDER_HEIGHT = 120;

export const FolderSkeleton = () => {
  return (
    <ItemButton>
      <Skeleton rounded={"xl"} height={FOLDER_HEIGHT} mb={3} />
      <SkeletonText noOfLines={2} />
    </ItemButton>
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
