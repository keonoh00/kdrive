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
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock, FaUser, FaUserCircle } from 'react-icons/fa';
import authHandler from '../api/auth/authHandler';
import { ISignUpRequest, ISignUpSuccessResponse } from '../api/auth/type';
import { QUERY_KEYS } from '../constants/api';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  showLoginModal: () => void;
}

export default function SignupModal({ isOpen, onClose, showLoginModal }: SignupModalProps) {
  const toast = useToast();

  const queryClient = useQueryClient();
  const mutation = useMutation<ISignUpSuccessResponse, AxiosError, ISignUpRequest>(
    authHandler.signUp,
    {
      onSuccess: () => {
        toast({
          title: 'Welcome!',
          status: 'success',
          description: 'You have successfully created your account',
        });
        queryClient.refetchQueries([QUERY_KEYS.USER_PROFILE]);
        onClose();
        showLoginModal();
      },
      onError: (error) => {
        let errorTitle = 'Something went wrong';
        if (error.response?.data) {
          errorTitle = Object.values(error.response.data).join(' ');
        }

        toast({
          title: errorTitle,
          status: 'error',
        });
      },
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpRequest>();

  const onSubmit = async ({ username, password, email, name }: ISignUpRequest) => {
    mutation.mutate({ username, password, email, name });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as='form' onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            {/* Name */}
            <InputGroup>
              <InputLeftElement>
                <Box color='gray.500'>
                  <FaUser />
                </Box>
              </InputLeftElement>
              <Input
                isInvalid={Boolean(errors.name?.message)}
                {...register('name', {
                  required: 'Please write a name',
                })}
                type='name'
                variant={'filled'}
                placeholder='Name'
              />
            </InputGroup>

            {/* username */}
            <InputGroup size={'md'}>
              <InputLeftElement>
                <Box color='gray.500'>
                  <FaUserCircle />
                </Box>
              </InputLeftElement>
              <Input
                isInvalid={Boolean(errors.username?.message)}
                {...register('username', {
                  required: 'Please write a username',
                })}
                variant={'filled'}
                placeholder='Username'
              />
            </InputGroup>

            {/* Password */}
            <InputGroup>
              <InputLeftElement>
                <Box color='gray.500'>
                  <FaLock />
                </Box>
              </InputLeftElement>
              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register('password', {
                  required: 'Please write a password',
                })}
                type='password'
                variant={'filled'}
                placeholder='Password'
              />
            </InputGroup>

            {/* Email */}
            <InputGroup>
              <InputLeftElement>
                <Box color='gray.500'>
                  <FaEnvelope />
                </Box>
              </InputLeftElement>
              <Input
                isInvalid={Boolean(errors.email?.message)}
                {...register('email', {
                  required: 'Please write a email',
                })}
                type='email'
                variant={'filled'}
                placeholder='Email'
              />
            </InputGroup>
          </VStack>
          <Button
            isLoading={mutation.isLoading}
            type='submit'
            mt={4}
            colorScheme={'messenger'}
            w='100%'
          >
            Log in
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
