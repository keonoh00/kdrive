import {
  useDisclosure,
  Button,
  HStack,
  IconButton,
  Text,
  Box,
  useColorMode,
  LightMode,
  useColorModeValue,
  Avatar,
} from "@chakra-ui/react";
import { FaGoogleDrive, FaMoon, FaSun } from "react-icons/fa";

import { useUser } from "../api/useUser";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const RootHeader = () => {
  const { isLoggedIn, isLoadingUser } = useUser();
  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("red.400", "red.300");
  const ThemeToggleIcon = useColorModeValue(FaMoon, FaSun);

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
    <HStack
      px={20}
      py={5}
      borderBottomWidth={1}
      justifyContent={"space-between"}
    >
      <HStack>
        <Box color={logoColor}>
          <FaGoogleDrive size={"28"} />
        </Box>
        <Text>Drive</Text>
      </HStack>

      <HStack spacing={1}>
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<ThemeToggleIcon />}
        />
        {!isLoadingUser ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onOpenLoginModal} size={"sm"}>
                Log In
              </Button>
              <LightMode>
                <Button
                  onClick={onOpenSignupModal}
                  size={"sm"}
                  colorScheme="red"
                >
                  Sign Up
                </Button>
              </LightMode>
              <LoginModal
                isOpen={isOpenLoginModal}
                onClose={onCloseLoginModal}
              />
              <SignupModal
                isOpen={isOpenSignupModal}
                onClose={onCloseSignupModal}
              />
            </>
          ) : (
            <>
              <Avatar />
              <Button bg={"red.400"} size={"sm"}>
                Log Out
              </Button>
            </>
          )
        ) : null}
      </HStack>
    </HStack>
  );
};

export default RootHeader;