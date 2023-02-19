import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { FaGoogleDrive, FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import authHandler from "../api/auth/authHandler";
import { useUser } from "../api/useUser";
import { QUERY_KEYS } from "../constants/api";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const RootHeader = () => {
  // Queries
  const queryClient = useQueryClient();
  const { user, isLoggedIn, isLoadingUser } = useUser();

  // Chakra UI hooks
  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("red.400", "red.300");
  const ThemeToggleIcon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
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

  const onPressLogout = async () => {
    const toastId = toast({
      title: "Logging out",
      status: "loading",
      description: "We are logging you out...",
      position: "bottom-right",
    });

    await authHandler.logOut();
    queryClient.refetchQueries([QUERY_KEYS.USER_PROFILE]);

    toast.update(toastId, {
      title: "Logged out",
      status: "success",
      description: "You have been logged out successfully",
    });
  };

  return (
    <HStack
      px={20}
      py={5}
      borderBottomWidth={1}
      justifyContent={"space-between"}
    >
      <Link to="/">
        <HStack>
          <Box color={logoColor}>
            <FaGoogleDrive size={"28"} />
          </Box>
          <Text>Drive</Text>
        </HStack>
      </Link>

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
                showLoginModal={onOpenLoginModal}
              />
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar name={user.name} src={user.avatar} />
              </MenuButton>
              <MenuList>
                <MenuItem
                  bg={"red.400"}
                  textAlign={"center"}
                  justifyContent={"center"}
                  onClick={onPressLogout}
                >
                  Log Out
                </MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </HStack>
    </HStack>
  );
};

export default RootHeader;
