import { IFile } from "./useDirectoryItems";

export interface IGenerateUploadURLRequest {}

export interface IGenerateUploadURLResponse {
  uploadURL: string;
  id: string;
}

export interface IUploadImageRequest {
  uploadURL: string;
  file: FileList;
}

export interface IUploadImageResponse {
  id: string;
  uploadURL: string;
}

export interface ICreateImageRequest {
  name: string;
  imageURL: string;
}

export interface ICreateImageResponse {
  ok: boolean;
  data: IFile;
}
