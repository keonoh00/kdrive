import { Button, VStack } from "@chakra-ui/react";
import React from "react";

interface ItemButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ItemButton: React.FC<ItemButtonProps> = ({ onClick, children }) => {
  return (
    <Button onClick={onClick}>
      <VStack borderWidth={1} rounded={"xl"}>
        {children}
      </VStack>
    </Button>
  );
};

export default ItemButton;
