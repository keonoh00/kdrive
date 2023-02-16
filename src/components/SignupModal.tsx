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
import { FaEnvelope, FaLock, FaTag, FaUser } from "react-icons/fa";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: FC<SignupModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Sign up
          <ModalCloseButton />
        </ModalHeader>

        <ModalBody>
          <VStack>
            <InputGroup>
              <InputLeftElement children={<FaTag />} />
              <Input variant={"filled"} placeholder="Name" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FaUser />} />
              <Input variant={"filled"} placeholder="Username" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FaEnvelope />} />
              <Input variant={"filled"} placeholder="Email" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FaLock />} />
              <Input variant={"filled"} placeholder="Password" />
            </InputGroup>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button w={"full"} colorScheme={"messenger"}>
            Create account
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SignupModal;
