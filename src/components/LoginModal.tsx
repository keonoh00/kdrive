import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaLock, FaUser } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authHandler from "../api/auth/authHandler";
import {
  ILogInFailResponse,
  ILogInRequest,
  ILogInSuccessResponse,
} from "../api/auth/type";
import { QUERY_KEYS } from "../constants/api";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  username: string;
  password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const toast = useToast();

  const queryClient = useQueryClient();
  const mutation = useMutation<
    ILogInSuccessResponse,
    ILogInFailResponse,
    ILogInRequest
  >(authHandler.logIn, {
    onSuccess: () => {
      toast({
        title: "Logged in",
        status: "success",
        description: "Welcome back!",
      });
      queryClient.refetchQueries([QUERY_KEYS.USER_PROFILE]);
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        status: "error",
        description: error.error,
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit = ({ username, password }: IForm) => {
    mutation.mutate({ username, password });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup size={"md"}>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUser />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.username?.message)}
                {...register("username", {
                  required: "Please write a username",
                })}
                variant={"filled"}
                placeholder="Username"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register("password", {
                  required: "Please write a password",
                })}
                type="password"
                variant={"filled"}
                placeholder="Password"
              />
            </InputGroup>
          </VStack>
          <Button
            isLoading={mutation.isLoading}
            type="submit"
            mt={4}
            colorScheme={"messenger"}
            w="100%"
          >
            Log in
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
