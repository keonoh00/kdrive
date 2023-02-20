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
