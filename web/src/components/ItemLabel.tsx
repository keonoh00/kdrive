import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { IUser } from "../api/useUser";
import { getDisplayDate } from "../utils";

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
  const displayDate = getDisplayDate(created_at);
  const displayFileName =
    name.split("/").length > 1 ? name.split("/")[1] : name;

  return (
    <VStack overflow={"hidden"}>
      <Text
        fontSize={"m"}
        fontWeight={"bold"}
        align={"center"}
        whiteSpace={"normal"}
      >
        {displayFileName}
      </Text>

      <Box
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        alignSelf={"flex-start"}
      >
        <Text fontSize={"xs"} textAlign={"left"}>
          {"Created at: " + displayDate}
        </Text>
        <Text fontSize={"xs"} textAlign={"left"}>
          {"by: " + created_by.name}
        </Text>
      </Box>
    </VStack>
  );
};
