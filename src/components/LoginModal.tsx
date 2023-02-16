import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { FaLock, FaUser } from "react-icons/fa";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Log In
          <ModalCloseButton />
        </ModalHeader>

        <ModalBody>
          <VStack>
            <InputGroup>
              <InputLeftElement children={<FaUser />} />
              <Input variant={"filled"} placeholder="Username" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FaLock />} />
              <Input variant={"filled"} placeholder="Password" />
            </InputGroup>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button w={"full"} colorScheme={"messenger"}>
            Log In
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
