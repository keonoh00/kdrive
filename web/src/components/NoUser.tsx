import { Button, Heading, Text, useDisclosure, VStack } from "@chakra-ui/react";
import React from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const NoUser = () => {
  const {
    isOpen: isOpenLoginModal,
    onClose: onCloseLoginModal,
    onOpen: onOpenLoginModal,
  } = useDisclosure();
  const {
    isOpen: isOpenSignupModal,
    onClose: onCloseSignupModal,
    onOpen: onOpenSignupModal,
  } = useDisclosure();

  return (
    <>
      <VStack
        bg={"gray.100"}
        justifyContent={"center"}
        minH={"92vh"}
        spacing={"10"}
      >
        <VStack spacing={"4"}>
          <Heading>Sign In Required</Heading>
          <Text>{"You need to sign in to access"}</Text>
          <Button onClick={onOpenSignupModal} colorScheme={"red"}>
            Sign Up &rarr;
          </Button>
        </VStack>
        <Button onClick={onOpenLoginModal} colorScheme={"facebook"} size={"sm"}>
          Login &rarr;
        </Button>
      </VStack>
      <SignupModal
        isOpen={isOpenSignupModal}
        onClose={onCloseSignupModal}
        showLoginModal={onOpenLoginModal}
      />
      <LoginModal isOpen={isOpenLoginModal} onClose={onCloseLoginModal} />
    </>
  );
};

export default NoUser;
