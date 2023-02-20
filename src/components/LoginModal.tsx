import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  ModalBody,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaUser } from "react-icons/fa";
import authHandler from "../api/auth/authHandler";
import { ILogInRequest, ILogInSuccessResponse } from "../api/auth/type";
import { QUERY_KEYS } from "../constants/api";
import { getErrorStringFromAxiosError } from "../utils";
import CenteredModal from "./CenteredModal";

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
    AxiosError,
    ILogInRequest
  >(authHandler.logIn, {
    onSuccess: () => {
      toast({
        title: "Logged in",
        status: "success",
        description: "Welcome back!",
      });
      queryClient.refetchQueries([QUERY_KEYS.USER_PROFILE]);
      reset();
      onClose();
    },
    onError: (error) => {
      const errorTitle = getErrorStringFromAxiosError(error);
      console.log(Object.keys(errorTitle));
      toast({
        title: "Login failed",
        status: "error",
        description: errorTitle,
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();

  const onSubmit = ({ username, password }: IForm) => {
    mutation.mutate({ username, password });
  };
  return (
    <CenteredModal isOpen={isOpen} onClose={onClose} title="Login">
      <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
        <VStack>
          <InputGroup size={"md"}>
            <InputLeftElement>
              <Box color="gray.500">
                <FaUser />
              </Box>
            </InputLeftElement>
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
            <InputLeftElement>
              <Box color="gray.500">
                <FaLock />
              </Box>
            </InputLeftElement>
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
    </CenteredModal>
  );
}
