import { Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { IUser } from "../api/useUser";

interface ItemLabelProps {
  name: string;
  created_at: string;
  created_by: IUser;
}

export const ItemLabel: React.FC<ItemLabelProps> = ({
  name,
  created_at,
  created_by,
}) => {
  const dateString = new Date(created_at).toLocaleDateString();

  return (
    <VStack alignItems={"flex-start"}>
      <Heading fontSize={"sm"} textAlign={"center"} alignSelf={"center"}>
        {name.split("/")[1]}
      </Heading>
      <Heading fontSize={"sm"} textAlign={"center"}>
        {"Created at: " + dateString}
      </Heading>
      <Heading fontSize={"sm"} textAlign={"center"}>
        {created_by.name}
      </Heading>
    </VStack>
  );
};
