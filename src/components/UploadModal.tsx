import {
  AlertStatus,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  ModalBody,
  ModalFooter,
  Text,
  ToastId,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { createImage, getUploadURL, uploadImage } from "../api";
import {
  ICreateImageRequest,
  ICreateImageResponse,
  IGenerateUploadURLRequest,
  IGenerateUploadURLResponse,
  IUploadImageRequest,
  IUploadImageResponse,
} from "../api/types";
import { IFile, useDirectoryItems } from "../api/useDirectoryItems";
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
    reset,
  } = useForm<IUploadForm>();
  const toast = useToast();
  const toastId = React.useRef<ToastId>();
  const [fileUploadResult, setFileUploadResult] = React.useState<IFile>();

  const onCloseModal = () => {
    setFileUploadResult(undefined);
    onClose();
  };

  // eslint-disable-next-line
  const [searchParams, _] = useSearchParams();
  const { refetch } = useDirectoryItems({
    directoryPath: searchParams.get("path") || "/",
  });

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
        duration: 99999999999,
      };
      if (toastId.current) {
        toast.update(toastId.current, toastConfig);
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
      }
    },
    onSuccess: (res) => {
      const toastConfig = {
        title: "Image classification success",
        status: "success" as AlertStatus,
        description: "Image classification success",
        duration: 1000,
      };
      if (toastId.current) {
        toast.update(toastId.current, toastConfig);
      }
      reset();
      setFileUploadResult(res.data);
      refetch();
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
      }
    },
    onSuccess: ({ result }: any) => {
      if (!result.id || !watch("file")[0].name) {
        throw new Error("Invalid response from uploadImage");
      }

      createImageDBMutation.mutate({
        name: watch("file")[0].name,
        imageURL: `https://imagedelivery.net/dsQgSfWIsnrqGQ0-Ts_CRw/${result.id}/public`,
        imageId: result.id,
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
    <CenteredModal isOpen={isOpen} onClose={onCloseModal} title="Upload a file">
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

        {fileUploadResult ? (
          <VStack alignItems={"flex-start"} mt={"4"}>
            <Text fontWeight={"bold"}>
              {fileUploadResult.name}
              <Text color={"green.400"}>uploaded successfully</Text>
            </Text>

            <Text>
              Classification:
              <Text color={"green.400"}>
                {fileUploadResult.path.split("/")[1]}
              </Text>
            </Text>
          </VStack>
        ) : null}
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
