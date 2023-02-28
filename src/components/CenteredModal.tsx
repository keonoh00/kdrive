import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

interface CenteredModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const CenteredModal: React.FC<CenteredModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
          <ModalHeader>{title}</ModalHeader>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CenteredModal;
