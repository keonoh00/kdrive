import {
  useDisclosure,
  Button,
  HStack,
  IconButton,
  Text,
  Box,
} from "@chakra-ui/react";
import { FaGoogleDrive, FaMoon } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const RootHeader = () => {
  const isLoggedIn = false;
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
      px={8}
      py={5}
      borderBottomWidth={1}
      justifyContent={"space-between"}
    >
      <HStack>
        <Box color={"red.700"}>
          <FaGoogleDrive size={"28"} />
        </Box>
        <Text>Google Drive</Text>
      </HStack>

      <HStack spacing={1}>
        <IconButton
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<FaMoon />}
        />
        {isLoggedIn ? (
          <Button bg={"red.400"} size={"sm"}>
            Log Out
          </Button>
        ) : (
          <>
            <Button onClick={onOpenLoginModal} size={"sm"}>
              Log In
            </Button>
            <LoginModal isOpen={isOpenLoginModal} onClose={onCloseLoginModal} />
          </>
        )}
        <Button onClick={onOpenSignupModal} size={"sm"}>
          Sign Up
        </Button>
        <SignupModal isOpen={isOpenSignupModal} onClose={onCloseSignupModal} />
      </HStack>
    </HStack>
  );
};

export default RootHeader;
