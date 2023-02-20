import {
  Button,
  HStack,
  Image,
  ModalBody,
  ModalFooter,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { deleteFile, downloadFromUrl } from "../api";
import { IFile } from "../api/useDirectoryItems";
import CenteredModal from "./CenteredModal";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: IFile;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  content,
}) => {
  const toast = useToast();

  const isImageUrlSupported = content.image_url;

  const downloadMutation = useMutation<{}, AxiosError, { url: string | null }>(
    downloadFromUrl,
    {
      onMutate: () => {
        toast({
          title: "Downloading...",
          status: "loading",
          description: "Please wait...",
        });
      },
      onSuccess: () => {
        toast({
          title: "Downloaded",
          status: "success",
          description: "Successfully Downloaded",
        });
      },
      onError: (error) => {
        toast({
          title: "Preview failed",
          status: "error",
          description: error.message,
        });
      },
    }
  );

  const deleteMutation = useMutation<{}, AxiosError, { id: number }>(
    deleteFile,
    {
      onMutate: () => {
        toast({
          title: "Downloading...",
          status: "loading",
          description: "Please wait...",
        });
      },
      onSuccess: () => {
        toast({
          title: "Downloaded",
          status: "success",
          description: "Successfully Downloaded",
        });
      },
      onError: (error) => {
        toast({
          title: "Preview failed",
          status: "error",
          description: error.message,
        });
      },
    }
  );

  const onDownloadPress = () => {
    downloadMutation.mutate({ url: content.image_url });
  };

  const onDeletePress = () => {
    deleteMutation.mutate({ id: content.id });
    console.log("Delete Pressed");
  };

  return (
    <CenteredModal isOpen={isOpen} onClose={onClose} title="File Preview">
      <ModalBody>
        {isImageUrlSupported ? (
          <Image src={content.image_url || ""} alt={content.name} />
        ) : (
          <>
            <Text textAlign={"center"} mb={"10"}>
              This file is corrupted, please check and delete
            </Text>
            <Text>File Name: {content.name}</Text>
            <Text>File ID: {content.id}</Text>
            <Text>File URL: {content.image_url || "Missing url"}</Text>
            <Text>File Created At: {content.created_at}</Text>
            <Text>File Updated At: {content.updated_at}</Text>
            <Text>File Updated At: {JSON.stringify(content.created_by)}</Text>
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <HStack>
          {isImageUrlSupported ? (
            <Button
              isLoading={downloadMutation.isLoading}
              type="button"
              colorScheme={"messenger"}
              onClick={onDownloadPress}
            >
              Download
            </Button>
          ) : null}
          <Button
            isLoading={deleteMutation.isLoading}
            type="button"
            colorScheme={"red"}
            onClick={onDeletePress}
          >
            Delete
          </Button>
        </HStack>
      </ModalFooter>
    </CenteredModal>
  );
};

export default PreviewModal;
