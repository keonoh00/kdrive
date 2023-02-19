import useProtectedPage from "../hooks/useProtectedPage";

const Upload = () => {
  useProtectedPage();
  return <div>Upload</div>;
};

export default Upload;
