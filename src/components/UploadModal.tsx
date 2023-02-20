import {
  AlertStatus,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  ModalBody,
  ModalFooter,
  ToastId,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";
import { createImage, getUploadURL, uploadImage } from "../api";
import {
  ICreateImageRequest,
  ICreateImageResponse,
  IGenerateUploadURLRequest,
  IGenerateUploadURLResponse,
  IUploadImageRequest,
  IUploadImageResponse,
} from "../api/types";
import CenteredModal from "./CenteredModal";

interface IUploadForm {
  file: FileList;
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IUploadForm>();
  const toast = useToast();
  const toastId = React.useRef<ToastId>();

  const createImageDBMutation = useMutation<
    ICreateImageResponse,
    AxiosError,
    ICreateImageRequest
  >(createImage, {
    onMutate: () => {
      const toastConfig = {
        title: "Running image classification in server",
        status: "loading" as AlertStatus,
        description: "We are running image classification in server",
      };
      if (toastId.current) {
        toast.update(toastId.current, toastConfig);
      } else {
        toast(toastConfig);
      }
    },
    onError: (error) => {
      const toastConfig = {
        title: "Image classification failed",
        status: "error" as AlertStatus,
        description: error?.message || JSON.stringify(error),
      };
      if (toastId.current) {
        toast.update(toastId.current, toastConfig);
      } else {
        toast(toastConfig);
      }
    },
    onSuccess: () => {
      const toastConfig = {
        title: "Image classification success",
        status: "success" as AlertStatus,
        description: "Image classification success",
      };
      if (toastId.current) {
        toast.update(toastId.current, toastConfig);
      } else {
        toast(toastConfig);
      }
    },
  });

  const uplaodImageMutation = useMutation<
    IUploadImageResponse,
    AxiosError,
    IUploadImageRequest
  >(uploadImage, {
    onMutate: () => {
      const toastConfig = {
        title: "Uploading image to cloud",
        status: "loading" as AlertStatus,
        description: "We are uploading your image",
      };
      if (toastId.current) {
        toast.update(toastId.current, toastConfig);
      } else {
        toast(toastConfig);
      }
    },
    onError: (error) => {
      const toastConfig = {
        title: "Upload failed",
        status: "error" as AlertStatus,
        description: error?.message || JSON.stringify(error),
      };
      if (toastId.current) {
        toast.update(toastId.current, toastConfig);
      } else {
        toast(toastConfig);
      }
    },
    onSuccess: (data) => {
      createImageDBMutation.mutate({
        name: watch("file")[0].name,
        imageURL: `https://upload.imagedelivery.net/dsQgSfWIsnrqGQ0-Ts_CRw/${data.id}/public`,
      });
    },
  });

  const urlGenerationMutation = useMutation<
    IGenerateUploadURLResponse,
    AxiosError,
    IGenerateUploadURLRequest
  >(getUploadURL, {
    onMutate: () => {
      toastId.current = toast({
        title: "Generating upload URL",
        status: "loading",
        description: "We are generating a spot for your image",
      });
    },
    onError: (error) => {
      const toastConfig = {
        title: "URL generation failed",
        status: "error" as AlertStatus,
        description: error?.message || JSON.stringify(error),
      };
      if (toastId.current) {
        toast.update(toastId.current, toastConfig);
      } else {
        toast(toastConfig);
      }
    },
    onSuccess: (data) => {
      uplaodImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("file"),
      });
    },
  });

  const onUpload = () => {
    urlGenerationMutation.mutate({});
  };

  return (
    <CenteredModal isOpen={isOpen} onClose={onClose} title="Upload a file">
      <ModalBody>
        <VStack as="form" onSubmit={handleSubmit(onUpload)}>
          <InputGroup>
            <InputLeftElement>
              <Box color="gray.500">
                <FaImage />
              </Box>
            </InputLeftElement>
            <Input
              isInvalid={Boolean(errors.file?.message)}
              {...register("file", {
                required: "Please upload a file",
              })}
              type="file"
              variant={"filled"}
            />
          </InputGroup>
        </VStack>
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={handleSubmit(onUpload)}
          type={"submit"}
          colorScheme={"green"}
        >
          Upload
        </Button>
      </ModalFooter>
    </CenteredModal>
  );
};

export default UploadModal;
