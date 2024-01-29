import { Button, VStack } from "@chakra-ui/react";
import React from "react";

interface ItemButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const ItemButton: React.FC<ItemButtonProps> = ({ onClick, children }) => {
  return (
    <Button onClick={onClick} h={"48"} w={"48"}>
      <VStack>{children}</VStack>
    </Button>
  );
};

export default ItemButton;
