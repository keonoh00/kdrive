import {
  AlertStatus,
  Button,
  HStack,
  Image,
  ModalBody,
  ModalFooter,
  Text,
  ToastId,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { deleteFile, downloadFromUrl } from "../api";
import { IFile, useDirectoryItems } from "../api/useDirectoryItems";
import CenteredModal from "./CenteredModal";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: IFile;
  refetchFiles?: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  content,
}) => {
  const toast = useToast();
  // eslint-disable-next-line
  const [searchParams, _] = useSearchParams();
  const { refetch } = useDirectoryItems({
    directoryPath: searchParams.get("path") || "/",
  });
  const toastId = React.useRef<ToastId>();

  const isImageUrlSupported = content.image_url;

  const downloadMutation = useMutation<{}, AxiosError, { url: string | null }>(
    downloadFromUrl,
    {
      onMutate: () => {
        toastId.current = toast({
          title: "Downloading...",
          status: "loading",
          description: "Please wait...",
        });
      },
      onSuccess: () => {
        const toastConfig = {
          title: "Downloaded",
          status: "success" as AlertStatus,
          description: "Successfully Downloaded",
        };
        if (toastId.current) {
          toast.update(toastId.current, toastConfig);
        } else {
          toast(toastConfig);
        }
      },
      onError: (error) => {
        const toastConfig = {
          title: "Preview failed",
          status: "error" as AlertStatus,
          description: error.message,
        };
        if (toastId.current) {
          toast.update(toastId.current, toastConfig);
        } else {
          toast(toastConfig);
        }
      },
    }
  );

  const deleteMutation = useMutation<{}, AxiosError, { id: number }>(
    deleteFile,
    {
      onMutate: () => {
        toastId.current = toast({
          title: "Deleting...",
          status: "loading",
          description: "Please wait...",
        });
      },
      onError: (error) => {
        const toastConfig = {
          title: "Preview failed",
          status: "error" as AlertStatus,
          description: error.message,
        };
        if (toastId.current) {
          toast.update(toastId.current, toastConfig);
        } else {
          toast(toastConfig);
        }
      },
      onSuccess: () => {
        const toastConfig = {
          title: "Deleted",
          status: "success" as AlertStatus,
          description: "Successfully deleted the file",
        };
        if (toastId.current) {
          toast.update(toastId.current, toastConfig);
        } else {
          toast(toastConfig);
        }
        refetch();
        onClose();
      },
    }
  );

  const onDownloadPress = () => {
    downloadMutation.mutate({ url: content.image_url });
  };

  const onDeletePress = () => {
    deleteMutation.mutate({ id: content.id });
  };

  return (
    <CenteredModal isOpen={isOpen} onClose={onClose} title="File Preview">
      <ModalBody>
        {isImageUrlSupported ? (
          <>
            <Image src={content.image_url || ""} alt={content.name} />
            <Text>File Name: {content.name}</Text>
            <Text>File ID: {content.id}</Text>
            <Text>File URL: {content.image_url || "Missing url"}</Text>
            <Text>File Created At: {content.created_at}</Text>
            <Text>File Updated At: {content.updated_at}</Text>
            <Text>File Updated At: {JSON.stringify(content.created_by)}</Text>
          </>
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
